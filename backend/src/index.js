import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());


app.use("/api/v1/auth", )





app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

