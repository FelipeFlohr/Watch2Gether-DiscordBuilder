import bodyParser from "body-parser";
import { Application } from "express";

export default (app: Application) => {
    app.use(bodyParser.json())
}