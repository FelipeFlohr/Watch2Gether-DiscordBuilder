import dotenv from "dotenv"
dotenv.config()

export default class EnvironmentSettings {
    public app: AppConfig
    public discord: DiscordConfig

    private static instance: EnvironmentSettings

    private constructor() {
        this.app = {
            port: this.handleInteger(process.env.APP_PORT as string)
        }
        this.discord = {
            token: process.env.DISCORD_TOKEN as string,
            guild: process.env.DISCORD_GUILD as string
        }

        console.log("INFO | Loaded environment variables")
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new EnvironmentSettings()
        }

        return this.instance
    }

    private handleInteger(val: string) {
        return parseInt(val)
    }
}

type AppConfig = {
    port: number
}

type DiscordConfig = {
    token: string
    guild: string
}