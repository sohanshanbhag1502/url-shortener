import express from "express";
import shortenRouter from "./shorten";
import connectRedis from "./db/redis";

const app = express();
const PORT = process.env.PORT || 3000;

connectRedis();

app.use(express.json());
app.use("/api", shortenRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});