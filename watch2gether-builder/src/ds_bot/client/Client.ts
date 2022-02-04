import DiscordJS, { Intents } from "discord.js";
import {token, guildId} from "../../../token.json"
import {PingPong} from "../commands/PingPong";

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

client.on("ready", () => {
    console.log("Bot is ready")

    const guild = client.guilds.cache.get(guildId)
    let commands

    commands = guild ? guild.commands : client.application?.commands

    commands?.create({
        name: "ping",
        description: "Responde com pong!"
    })
})

// Routing commands
client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction

    if (commandName === "ping") {
        new PingPong(interaction)
    } else if (commandName === "buildw2g") {

    }
})

client.login(token)