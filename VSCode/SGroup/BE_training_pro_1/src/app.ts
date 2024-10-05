import express,{Express} from "express"
import {Routes}  from "../src/routes/Routes";

const app : Express = express();
const port = 3000;

app.use("/my-web", Routes );

app.listen(port, () => {`Server is running on port ${port}`});