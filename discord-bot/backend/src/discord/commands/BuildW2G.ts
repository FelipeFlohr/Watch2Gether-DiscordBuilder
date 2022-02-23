import {Command} from "../models/Command";
import {io} from "socket.io-client"
import {workingSites} from "../../../links.json"
import {CommandInteraction, Message, TextBasedChannel} from "discord.js";
import {Watch2GetherLinks} from "../models/W2GLinks";
import {Poster} from "../../utils/Poster";

const socket = io("http://localhost:3000") // Socket.IO address

export class Build implements Command{
    channel: TextBasedChannel;
    interaction: CommandInteraction;

    constructor(interaction?: CommandInteraction) {
        this.interaction = interaction
        this.channel = interaction.channel
    }

    async execute() {
        const messages = await this.getMessagesAfterW2GLink()
        const parsedMessages = this.parseMessageArrayToVideoLinks(messages)

        await this.interaction.reply({
            content: `Starting to build the Watch2Gether room. Working videos: ${parsedMessages.workingVideos.length} | Non working videos: ${parsedMessages.nonWorkingVideos.length} | Total: ${parsedMessages.nonWorkingVideos.length + parsedMessages.workingVideos.length}`
        })

        // Going to post the W2G data to Selenium
        await Poster.postToBuildW2G({
            "urls": parsedMessages.workingVideos
        }).then(w2gData => {
            const allNonWorkingVideos = parsedMessages.nonWorkingVideos.concat(w2gData.nonWorkingVideos)
            socket.emit("urls", allNonWorkingVideos)
            this.channel.send(`Watch2Gether room has been built. Link: ${w2gData.url}`)
        }, rej => {
            this.channel.send("An error occurred during the building process. Please check to see if the building utils is running\nRejection: " + rej)
        }).catch(err => {
            this.channel.send("An error occurred during the building process. Please check to see if the building utils is running\nError: " + err)
        })
    }

    private parseMessageArrayToVideoLinks(msgArray: Message[]): Watch2GetherLinks {
        const links = new Watch2GetherLinks()

        msgArray.forEach(msg => {
            msg.content.trim().split(" ").forEach(splitMsg => {
                const urlIsWorkingWebsite = function() {
                    let anyMatch = false

                    workingSites.forEach(website => {
                        if (splitMsg.startsWith(website)) anyMatch = true
                    })

                    return anyMatch
                }

                if (urlIsWorkingWebsite()) {
                    links.workingVideos.push(splitMsg)
                } else if (splitMsg.startsWith("https://m.facebook")) {
                    links.nonWorkingVideos.push(splitMsg)
                } else if (splitMsg.startsWith("https://")) {
                    links.nonWorkingVideos.push(splitMsg)
                } else {
                    console.log("Ignoring message: " + splitMsg)
                }
            })
        })

        return links
    }

    private async getMessagesAfterW2GLink(): Promise<Message[]> {
        const messages = await this.getMessagesBefore(await this.getLastChannelMessage())
        let anyLink: boolean = Build.getW2GLinkIndexWithinArray(messages) != -1

        if (anyLink) {
            console.log("There's a link within the first 100 messages!")

            const afterLinkArray = Build.getArrayAfterW2GLink(messages)
            afterLinkArray.push(await this.getLastChannelMessage())

            return afterLinkArray
        } else {
            console.log("No W2G link was found within the first 100 messages. Trying the first 200...")
            let lastMessages: Message[] = await this.getMessagesBefore(messages.at(0))

            const concatArray = messages.reverse().concat(lastMessages.reverse())

            const afterLinkArray = Build.getArrayAfterW2GLink(concatArray)
            afterLinkArray.push(await this.getLastChannelMessage())
            return afterLinkArray
        }
    }

    private async getMessagesBefore(msg: Message): Promise<Message[]> {
        const msgs: Message[] = []
        await this.channel.messages.fetch({ limit: 100, before: msg.id })
            .then(messages => {
                messages.forEach(msg => msgs.push(msg))
            })

        return msgs.reverse()
    }

    private async getLastChannelMessage() : Promise<Message> {
        let message: Message

        await this.channel.messages.fetch({limit: 1}).then(msgCollection => {
            message = msgCollection.at(0)
        })

        return message
    }

    // Gets the first Watch2Gether link inside the array. If it returns -1, then no link was available
    private static getW2GLinkIndexWithinArray(array: Message[]): number {
        return array.findIndex(msg => {
            const msgFormatted = msg.content.trim().split(" ")
            let linkFound = false

            msgFormatted.forEach(msgSplit => {
                if (!linkFound) {
                    linkFound = this.isW2GLink(msgSplit)
                }
            })

            return linkFound
        })
    }

    private static getArrayAfterW2GLink(array: Message[]): Message[] {
        const messages: Message[] = []
        const index: number = this.getW2GLinkIndexWithinArray(array)

        if (index == -1) return null

        for (let i = 0; i < index; i++) {
            messages.push(array.at(i))
        }

        return messages
    }

    private static isW2GLink(link: string): boolean {
        return link.startsWith("https://w2g.tv") || link.startsWith("https://www.watch2gether.com")
    }
}