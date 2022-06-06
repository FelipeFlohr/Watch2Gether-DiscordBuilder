import { Application } from "express";
import discord from "./discord";

export default (app: Application) => {
    discord(app)

    console.log("INFO | Controllers ready")
}