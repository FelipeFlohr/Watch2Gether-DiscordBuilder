import express from "express"
import EnvironmentSettings from "../env/envConfig"
import middlewares from "../middlewares"
import routes from "../routes"
import DiscordService from "../services/discord"
import Socket from "../utils/socket"

const PORT = EnvironmentSettings.getInstance().app.port

export const app = express()

export default function () {
    // MIDDLEWARES
    middlewares(app)

    // ROUTES
    routes(app)

    // DISCORD SERVICE
    DiscordService.getInstance()
        .then(() => {
            // START
            app.listen(PORT, () => {
                Socket.getInstance()
                console.log(`INFO | Application up and running at http://localhost:${PORT}\n==========================================================`)
            })
        })
        .catch(console.log)
}