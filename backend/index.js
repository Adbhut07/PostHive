import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from "./db/db.js"
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "client","dist","index.html"))
});

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
})