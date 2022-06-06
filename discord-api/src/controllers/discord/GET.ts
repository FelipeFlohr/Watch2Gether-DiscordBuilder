import { Request, Response } from "express"
import { data, error } from "../../helpers/responses"
import DiscordService from "../../services/discord"

export async function getMessages(req: Request, res: Response) {
    const discord = await DiscordService.getInstance()
    const channelId = req.params.channel

    discord.getW2GMessages(channelId)
        .then(msg => {
            data(res, msg)
        })
        .catch(err => {
            error(res, 500, `${err}`)
        })
}