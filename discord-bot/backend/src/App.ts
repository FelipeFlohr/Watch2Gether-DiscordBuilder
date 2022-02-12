import {Bot} from "./discord/client/Client"
import {SocketConnection} from "./utils/Socket";

const bot = new Bot() // Instanciates the Bot
bot.run()

const socketConnection = new SocketConnection() // Instanciates the Socket.IO connection