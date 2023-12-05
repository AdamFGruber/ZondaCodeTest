import express from "express";
import cors from "cors";
import { data } from "../data/subdivision.js";
import { smallData } from "../data/subdivisionSmall.js";

const app = express();
app.use(cors());

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/subdivisions", (req, res, next) => {
    res.json(data);
});