import express from "express";
import cors from "cors";
import { data } from "../data/subdivision.js";
import { filterAndSort } from "./dataFormatting.js";

const app = express();
app.use(express.json())
app.use(cors());

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/subdivisions", (req, res, next) => {
    res.json(data);
});

app.post("/subdivisions", (req, res, next) => {
    const statusCodesToFilter = req.body.statusCode;
    const fieldToSortBy = req.body.sortBy;

    res.json(filterAndSort(JSON.parse(JSON.stringify(data)), statusCodesToFilter, fieldToSortBy));
});