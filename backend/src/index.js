import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import problemRouter from "./routes/problems.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/problems", problemRouter)




app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

