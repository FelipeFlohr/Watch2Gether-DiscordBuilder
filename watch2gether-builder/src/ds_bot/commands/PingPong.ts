import {Command} from "../models/Command";
import {CommandInteraction} from "discord.js";

export class PingPong extends Command {

    constructor(interaction: CommandInteraction) {
        super(interaction, () => {
            interaction.reply({
                content: "Pong!"
            })
        }, () => console.log("Pong command called and executed"));
    }
}