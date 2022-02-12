import {port} from "../../bot.json"

// Class for instantiate a Socket.IO connection
export class SocketConnection {
    private io

    constructor() {
        console.log("Creating Socket.io connection on port " + port)

        this.io = require("socket.io")(port, {
            cors: { // <- CORS settings
                origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
                methods: ["GET", "POST"],
                allowedHeaders: ["Access-Control-Allow-Origin"],
                credentials: true
            }
        })

        this.io.on("connection", socket => {
            socket.on("urls", data => {
                console.log(`ID ${socket.id} send a URL request. Going to parse and send it`)
                this.io.emit("parsedUrls", data)
            })
        })
    }
}