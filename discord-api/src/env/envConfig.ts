import dotenv from "dotenv"
dotenv.config()

export default class EnvironmentSettings {
    public app: AppConfig

    private static instance: EnvironmentSettings

    private constructor() {
        this.app = {
            port: this.handleInteger(process.env.APP_PORT as string)
        }
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