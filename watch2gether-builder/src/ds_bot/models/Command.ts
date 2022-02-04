import {CommandInteraction} from "discord.js";

export class Command {

    constructor(private interaction: CommandInteraction, private runnable: Function, private callback?: Function) {
        this.execute()
    }

    protected async execute() {
        await this.runnable()
        if (this.callback) this.callback()
    }
}