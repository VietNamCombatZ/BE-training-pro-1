import express, { Express } from "express";
import Routes from "./routes/Routes"; // Default import for router

const app: Express = express();
const port = 3000;


app.use(express.urlencoded());
app.use(express.json());


app.use("/my-web", Routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//v1 - use with route - V1
// import express, { Express } from "express";

// import { Routes } from "../src/routes/Routes";

// const app: Express = express();
// const port = 3000;

// app.use(express.urlencoded());
// app.use(express.json());

// // app.use("/my-web", Routes );
// Routes(app);

// app.listen(port, () => {
//   `Server is running on port ${port}`;
// });