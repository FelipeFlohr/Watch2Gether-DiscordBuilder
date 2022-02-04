import {token} from "../../../token.json"
import {Client} from "discord.js";
import {ActivityTypes} from "discord.js/typings/enums";

export class Bot extends Client {

    constructor() {
        super({ intents: 515 });
    }

    public start() {
        this.login(token)
            .then(() => {
                console.log("Bot online")
                this.setCommands()
            })
            .catch((err) => console.log(`Bot failed to start. ${err}`))
    }

    private async setCommands() {
        this.on("ready", () => {
            this.user.setActivity("fodeta", {type: ActivityTypes.WATCHING})
        })
    }
}

let bot = new Bot()
bot.start()