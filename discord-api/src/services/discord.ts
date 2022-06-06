import { Client, Guild, Intents, TextChannel } from "discord.js"
import EnvironmentSettings from "../env/envConfig"
import MessageHandler from "../models/message"

export default class DiscordService {
    public buildingRoom: boolean

    private static instance: DiscordService
    private client: Client

    private constructor() {
        this.buildingRoom = false

        this.client = new Client({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
        })
    }

    public static async getInstance() {
        if (!this.instance) {
            this.instance = new DiscordService()

            const token = EnvironmentSettings.getInstance().discord.token
            await this.instance.client.login(token)

            await this.instance.instantiateCommands()
            this.instance.handleInteraction()

            console.log("INFO | Discord bot logged in")
        }

        return this.instance
    }

    public async runSetup() {
        return "Hello, World!"
    }

    public async getW2GMessages(channelId: string) {
        const guildId = EnvironmentSettings.getInstance().discord.guild
        const guild = await this.client.guilds.fetch(guildId)

        const channelRaw = await guild.channels.fetch(channelId)
        if (!channelRaw) throw `CHANNEL_DOES_NOT_EXISTS`

        const channel = await channelRaw.fetch()
        if (channel instanceof TextChannel) {
            const rawMessages = await channel.messages.fetch({ limit: 100 })
            const messages = new MessageHandler(rawMessages)

            while (!messages.hasWatch2GetherLink()) {
                const newMessages = await channel.messages.fetch({ limit: 100, before: messages.getLastMessage().id })
                messages.concat(newMessages)
            }

            return messages.getWatch2GetherLinks()
        } else {
            throw `CHANNEL_IS_NOT_TEXT_CHANNEL`
        }
    }

    public close() {
        this.client.destroy()
    }

    private instantiateCommands() {
        return new Promise<void>((res, rej) => {
            this.client.on("ready", async client => {
                try {
                    const guildId = EnvironmentSettings.getInstance().discord.guild
                    const guild = client.guilds.cache.get(guildId) as Guild

                    const commands = guild.commands

                    // Creates the following command
                    await commands.create({
                        name: "build",
                        description: "Builds a Watch2Gether room fetching room data"
                    })

                    client.user.setActivity({
                        type: "WATCHING",
                        url: "http://localhost:5500",
                        name: "Watch2Gether building."
                    })

                    console.log("INFO | Commands instantiated")
                    res()
                } catch (err) {
                    rej(err)
                }
            })
        })
    }

    private handleInteraction() {
        this.client.on("interactionCreate", async interaction => {
            if (!interaction.isCommand()) return

            const { commandName } = interaction

            switch (commandName) {
                case "build":
                    this.buildingRoom = true
                    const messages = await this.getW2GMessages(interaction.channelId)

                    break
            }
        })

        console.log("INFO | Interaction handler loaded")
    }
}