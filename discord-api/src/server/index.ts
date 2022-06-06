import express from "express"
import controllers from "../controllers"
import EnvironmentSettings from "../env/envConfig"

const PORT = EnvironmentSettings.getInstance().app.port

export default function () {
    const app = express()

    // MIDDLEWARES

    // CONTROLLERS
    controllers(app)

    // START
    app.listen(PORT, () => {
        console.log(`INFO | Application up and running at http://localhost:${PORT}\n`)
    })
}