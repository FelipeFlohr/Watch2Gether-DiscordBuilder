import {Client, Intents} from "discord.js";
import {token, guildId} from "../../../bot.json"
import {Build} from "../commands/BuildW2G";

export class Bot extends Client {

    buildW2G: boolean = false

    constructor() {
        super({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

        this.on("ready", () => {
            console.log("Bot is ready")

            const guild = this.guilds.cache.get(guildId)
            let commands

            commands = guild ? guild.commands : this.application?.commands

            // Creates the following commands if they do not exist
            commands?.create({
                name: "ping",
                description: "Replies with Pong!"
            })

            commands?.create({
                name: "build",
                description: "Will build the Watch2Gether"
            })

            this.user.setActivity("Building W2Gs!", {
                type: "COMPETING",
                url: "http://localhost:5500/"
            })
        })

        // Routing commands. Since this is a small application, the commands' instructions will all be inside this file
        // instead of a separated one
        this.on("interactionCreate", async interaction => {
            if (!interaction.isCommand()) return;

            const {commandName} = interaction

            if (commandName === "ping") {
                await interaction.reply({content: "Pong!"})
            } else if (commandName === "build") {
                if (!this.buildW2G) {
                    this.buildW2G = true

                    let builder = new Build(interaction)
                    await builder.execute()

                    this.buildW2G = false
                } else {
                    await interaction.reply({
                        content: "A Watch2Gether is already being build"
                    })
                }
            }
        })
    }

    public run() {
        this.login(token).then(() => console.log("Bot online")).catch(err => console.log("Error. " + err))
    }
}