import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
import userRouter from './routes/user.routes.js';
import feedbackLinkRouter from './routes/feedbackLink.routes.js';
import responseRouter from './routes/feedbackResponse.routes.js';
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/form",feedbackLinkRouter);
app.use("/api/v1/response",responseRouter);
export{app};