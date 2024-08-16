import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

//error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});

//default routing
app.get("/", async (req, res) => {
  res.send("Hello World its me welcom");
});

//connecting to mongodb
const connectDb = () => {
  const dbName = process.env.MONGO_DB_NAME;
  const dbUrl = `${process.env.MONGODB_URL}/${dbName}`;
  
  mongoose.set("strictQuery", true);
  mongoose.connect(dbUrl)
    .then(() => console.log(`Connected to MongoDB database: ${dbName}`))
    .catch((err) => console.log(err));
}

//start the server

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
