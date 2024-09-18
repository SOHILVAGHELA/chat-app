import express from "express";
import { server, app } from "./socket/socket.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import UserRoute from "./routes/userRoute.js";
import MessageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
// const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
//routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/message", MessageRoute);

server.listen(PORT, () => {
  connectDB();

  console.log(`server is runnig on server ${PORT} `);
});
