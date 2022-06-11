import express from "express"
import EnvironmentSettings from "../env/envConfig"
import middlewares from "../middlewares"
import routes from "../routes"
import DiscordService from "../services/discord"

const PORT = EnvironmentSettings.getInstance().app.port

export default function () {
    const app = express()

    // MIDDLEWARES
    middlewares(app)

    // ROUTES
    routes(app)

    // DISCORD SERVICE
    DiscordService.getInstance()
        .then(() => {
            // START
            app.listen(PORT, () => {
                console.log(`INFO | Application up and running at http://localhost:${PORT}\n==========================================================`)
            })
        })
        .catch(console.log)
}