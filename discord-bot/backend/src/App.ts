import {Bot} from "./discord/client/Client"
import {SocketConnection} from "./utils/Socket";

const bot = new Bot()
bot.run()

const socketConnection = new SocketConnection()