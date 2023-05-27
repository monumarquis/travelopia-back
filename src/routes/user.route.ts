import express, { IRouter } from "express";
import { postUser, getAllUser } from "../controllers/userController";

const app: IRouter = express.Router();

// first endpoint will receive data from the front-end Travel Form
app.post("/", postUser);

// The second endpoint will retrieve existing form submissions from the data base.
app.get("/", getAllUser);



export default app;
