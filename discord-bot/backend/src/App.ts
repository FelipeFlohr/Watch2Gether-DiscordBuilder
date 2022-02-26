import {Bot} from "./discord/client/Client"
import {SocketConnection} from "./utils/Socket";

const bot = new Bot() // Instantiates the Bot
bot.run()

new SocketConnection() // Instantiates the Socket.IO connection