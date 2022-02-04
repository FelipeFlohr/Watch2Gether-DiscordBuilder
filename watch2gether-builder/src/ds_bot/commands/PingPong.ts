import {SlashCommand} from "../models/SlashCommand";
import {CommandInteraction} from "discord.js";

export class PingPong extends SlashCommand {

    constructor(interaction: CommandInteraction) {
        super(interaction, () => {
            interaction.reply({
                content: "Pong!"
            })
        }, () => console.log("Pong command called and executed"));
    }
}