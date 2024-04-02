import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from "./db/db.js"
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
})