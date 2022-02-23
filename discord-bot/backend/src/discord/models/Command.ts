import {CommandInteraction, TextBasedChannel} from "discord.js";

export interface Command {
    interaction?: CommandInteraction
    channel: TextBasedChannel

    execute()
}