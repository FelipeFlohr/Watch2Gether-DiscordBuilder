import { Application } from "express"
import { data, error } from "../../helpers/responses"
import DiscordService from "../../services/discord"
import { DISCORD } from "../routes.json"

export default (app: Application) => {
    app.get(DISCORD.MESSAGES, (req, res) => {
        DiscordService.getInstance()
            .then(discord => {
                data(res, discord.runSetup())
            })
            .catch(err => {
                console.log("error")
                console.log(err)
            })
    })
}