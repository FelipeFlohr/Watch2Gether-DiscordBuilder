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

    /*
    - Main function
    - Creates a Watch2Gether room and sends the link to a Discord channel.
    - The "non-working videos" are going to be sent to "localhost:3000" via Socket.IO
     */
    async execute() {
        const messages = await this.getMessagesAfterW2GLink() // Gets all the messages after the last Watch2Gether link
        const parsedMessages = this.parseMessageArrayToVideoLinks(messages) // Will parse the messages

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

    /*
    - Will parse an array of Message type to a Watch2GetherLinks type (src/discord/models/W2GLinks.ts).
    - Every message of the array is going to be iterated through a loop. If the message matches a link described in
    links.json (./links.json), then it is considered a "working video", if not then it is considered a "non-working video"
     */
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
                    links.nonWorkingVideos.push(splitMsg.replace("m.facebook", "facebook"))
                } else if (splitMsg.startsWith("https://")) {
                    links.nonWorkingVideos.push(splitMsg)
                } else {
                    console.log("Ignoring message: " + splitMsg)
                }
            })
        })

        return links
    }

    /*
    - Searches this.channel to get all the messages after the last Watch2Gether link.
    - Returns a Message array containing all the messages after the last Watch2Gether link sent on the channel which the
    command has been summoned.
     */
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

    /*
    - Gets messages before the argument passed. Limit is one hundred.
     */
    private async getMessagesBefore(msg: Message): Promise<Message[]> {
        const msgs: Message[] = []
        await this.channel.messages.fetch({ limit: 100, before: msg.id })
            .then(messages => {
                messages.forEach(msg => msgs.push(msg))
            })

        return msgs.reverse()
    }

    /*
    - Return the last channel message as a Message type. For some reason, this was needed because this.channel.lastMessage
    was not working.
     */
    private async getLastChannelMessage() : Promise<Message> {
        let message: Message

        await this.channel.messages.fetch({limit: 1}).then(msgCollection => {
            message = msgCollection.at(0)
        })

        return message
    }

    /*
    - Gets the index of the first Watch2Gether link inside an array of Message type
    - Returns the index
     */
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

    /*
    - Gets an array of Message type containing only the messages sent after the last Watch2Gether link on the channel
    which the command has been summoned.
     */
    private static getArrayAfterW2GLink(array: Message[]): Message[] {
        const messages: Message[] = []
        const index: number = this.getW2GLinkIndexWithinArray(array.reverse())

        if (index == -1) return null

        for (let i = 0; i < index; i++) {
            messages.push(array.at(i))
        }

        return messages
    }

    /*
    - Determines if a string is a "Watch2Gether link" or not.
     */
    private static isW2GLink(link: string): boolean {
        return link.startsWith("https://w2g.tv") || link.startsWith("https://www.watch2gether.com")
    }
}