import { createError } from "../error.js";

export const getGenAI = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
        
        return res.status(200).json({
            success: true,
            photo: imageUrl
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};