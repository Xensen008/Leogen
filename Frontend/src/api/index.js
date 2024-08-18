import axios from "axios"

const API = axios.create({
    baseURL: "https://leogen.onrender.com/api",
});

export const GetPosts = async ()=> await API.get("/post/" )
export const createPost = async (data)=> await API.post("/post/",data )
export const generateImage = async (data)=> await API.post("/generateImage/",data )