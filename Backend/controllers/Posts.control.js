import Post from "../models/posts.model.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary} from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

//GET ALL POST
export const getAllPosts = async(req,res,next) =>{
    try {
        const posts = await Post.find({});
        return res.status(200).json({
            success:true,
            data:posts
        });
    } catch (error) {
        next(createError(error.status, error?.res?.data?.error?.message || error.message));
    }
}

//CREATE POST
export const createPost = async(req,res,next) =>{
    try {
        const {name,prompt,photo} = req.body;
        const photoUrl= cloudinary.uploader.upload(photo)
        const newPost = await Post.create({
            name,prompt,photo : (await photoUrl).secure_url
        })

        return res.status(201).json({
            success:true,
            data:newPost
        });
        
    
    } catch (error) {
        next(createError(error.status, error?.res?.data?.error?.message || error.message));
    }
}