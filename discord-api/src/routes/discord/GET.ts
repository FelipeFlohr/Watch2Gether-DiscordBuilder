import { Application } from "express";
import { DISCORD } from "../endpoints.json";
import { param } from "express-validator"
import discord from "../../controllers/discord";

export default (app: Application) => {
    app.get(
        DISCORD.MESSAGES,
        param("channel").isString().notEmpty(),
        discord.GET.getMessages
    )
}