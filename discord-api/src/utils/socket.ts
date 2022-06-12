import { Server } from "socket.io"
import EnvironmentSettings from "../env/envConfig"
import { VideoOpenerData } from "../types/VideoOpener"

export default class Socket {
    private static instance: Socket
    public readonly server: Server

    private constructor() {
        this.server = new Server(EnvironmentSettings.getInstance().app.socket, {
            cors: {
                origin: [`http://localhost:${EnvironmentSettings.getInstance().frontend.port}`, "http://127.0.0.1:5500/"],
                methods: ["GET", "POST"],
                allowedHeaders: ["Access-Control-Allow-Origin"],
                credentials: true
            }
        })
        console.log(`INFO | Socket.IO Server up and running at http://localhost:${EnvironmentSettings.getInstance().app.socket}`)
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Socket()
        }

        return this.instance
    }

    public emitVideoOpenerData(data: VideoOpenerData) {
        this.server.emit("postData", data)
    }
}