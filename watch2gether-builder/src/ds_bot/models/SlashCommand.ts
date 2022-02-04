import {CommandInteraction} from "discord.js";

export class SlashCommand {

    constructor(protected interaction: CommandInteraction, private runnable?: Function, private callback?: Function, private autoExecute?: boolean) {
        if (autoExecute) this.execute()
    }

    public async execute(customRunnable?: Function, customCallback?: Function) {
        if (customRunnable) {
            await customRunnable()
        } else {
            await this.runnable()
        }

        if (customCallback) {
            await customCallback()
        } else {
            await this.callback()
        }
    }

    public async getInteractionAsync() {
        console.log(this.interaction == undefined)
        return this.interaction
    }
}