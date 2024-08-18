// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import { Configuration, OpenAIApi } from "openai";

// dotenv.config();

// // Setting up the GenAI API
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const openai = new OpenAIApi(configuration);

// export const getGenAI = async (req, res, next) => {
//     try {
//         const { prompt } = req.body;
//         const response = await openai.createImage({
//             n: 1,
//             size: "1024x1024",
//             response_format: "b64_json",
//             prompt: prompt,
//         });
//         const generateImage = response.data.data[0].b64_json;
//         return res.status(200).json({
//             success: true,
//             photo: generateImage
//         });
//     } catch (error) {
//         next(createError(error.status, error?.response?.data?.error?.message || error.message));
//     }
// };


import * as dotenv from "dotenv";
import axios from "axios";
import { createError } from "../error.js";

dotenv.config();

const apiUrls = [
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1"
];

export const getGenAI = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        // console.log("Received prompt:", prompt); // Log the received prompt

        for (let i = 0; i < apiUrls.length; i++) {
            try {
                const response = await axios.post(
                    apiUrls[i],
                    { inputs: prompt },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                        },
                        responseType: 'arraybuffer'
                    }
                );

                console.log(`API response status from model ${i + 1}:`, response.status); 

                if (response.status === 200) {
                    const imageBuffer = Buffer.from(response.data, 'binary');
                    const imageBase64 = imageBuffer.toString('base64');
                    return res.status(200).json({
                        success: true,
                        photo: imageBase64,
                        message: `Successfully generated image using model ${i + 1}`
                    });
                } else {
                    console.error(`Failed to generate image using model ${i + 1}. Status:`, response.status); 
                    console.error("Response data:", response.data); 
                    res.write(`Trying different model ${i + 2}...\n`);
                }
            } catch (error) {
                console.error(`Error occurred with model ${i + 1}:`, error.message); 
                if (error.response) {
                    console.error("Error response status:", error.response.status); 
                    console.error("Error response data:", error.response.data);
                }
                if (error.response?.status === 503) {
                    return res.status(503).json({
                        success: false,
                        message: "The model is currently loading. Please try again in a few moments.",
                    });
                }
            }
        }

        return res.status(500).json({
            success: false,
            message: "Failed to generate image using all available models. Please try again.",
        });
    } catch (error) {
        console.error("Error occurred:", error.message); 
        next(createError(error.response?.status || 500, error.response?.data?.error || error.message));
    }
};