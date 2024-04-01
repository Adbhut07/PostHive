import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectToMongoDB from "./db/db.js"

dotenv.config();
const PORT = process.env.PORT || 3000;


const app = express();

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
})