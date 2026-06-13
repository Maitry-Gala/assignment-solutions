import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToMongoDB } from "./db";
import { userRouter } from "./routes/user";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("api/v1/user",userRouter);

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});