import { Application } from "express";
import bodyParser from "./bodyParser";

export default (app: Application) => {
    bodyParser(app)
}