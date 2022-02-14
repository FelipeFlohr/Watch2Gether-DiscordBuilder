const PORT = process.env.PORT || 3000
const NWV_ADDRESS = process.env.NWV_ADDRESS || "http://localhost:5500"

// Class for instantiate a Socket.IO connection
export class SocketConnection {
    private io

    constructor() {
        console.log("Creating Socket.io connection on port " + PORT)

        this.io = require("socket.io")(PORT, {
            cors: { // <- CORS settings
                origin: [NWV_ADDRESS, "http://localhost:5500"],
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