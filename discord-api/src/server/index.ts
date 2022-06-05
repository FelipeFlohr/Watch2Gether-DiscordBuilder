import express from "express"
import EnvironmentSettings from "../env/envConfig"

const PORT = EnvironmentSettings.getInstance().app.port

export default function() {
    const app = express()

    // MIDDLEWARES

    // ROUTES

    // START
    app.listen(PORT, () => {
        console.log(`Application up and running at http://localhost:${PORT}`)
    })
}