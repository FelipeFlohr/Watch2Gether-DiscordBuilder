import DiscordJS, {Intents, Message, TextBasedChannel} from "discord.js";
import {token, guildId} from "../../../token.json"
import {PingPong} from "../commands/PingPong";

export const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

client.on("ready", () => {
    console.log("Bot is ready")

    const guild = client.guilds.cache.get(guildId)
    let commands

    commands = guild ? guild.commands : client.application?.commands

    commands?.create({
        name: "ping",
        description: "Reply with Pong!"
    })

    commands?.create({
        name: "buildw2g",
        description: "Will build the Watch2Gether using the specified date"
    })
})

// Routing commands
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction

    if (commandName === "ping") {
        new PingPong(interaction)
    } else if (commandName === "buildw2g") {
        console.log("W2G Builder executed")

        let channel: TextBasedChannel = interaction.channel
        console.log("Going to find W2G Link")

        // WIll try to find a W2G link within a range of 500 messages
        let msgArray: Message[] = []
        let lastMsgId: string = channel.lastMessageId;
        let counter = 0
        let w2gLinkFound = false
        let w2gLink: Message
        const counterLimit = 5

        while (counter < counterLimit && !w2gLinkFound) {
            console.log("Counter: " + counter)
            await channel.messages.fetch({limit: 100, before: lastMsgId})
                .then(messages => {
                    // Will add the messages to the array
                    messages.forEach(msg => msgArray.push(msg))

                    // Will set the last message ID
                    lastMsgId = msgArray.at(msgArray.length - 1).id

                    // Will try to find any Watch2Gether link
                    let w2gArray = msgArray.filter(msg => {
                        return msg.content.startsWith("https://w2g.tv") || msg.content.startsWith("https://www.watch2gether.com")
                    })

                    console.log(`Total of Watch2Gether links: ${w2gArray.length}`)
                    // If array > 1, then a link was found
                    if (w2gArray.length > 0) {
                        w2gLinkFound = true
                        w2gLink = w2gArray.at(0)
                        console.log("Watch2Gether link was found\n")
                    }

                    counter++
                })
        }

        // Now it will get all videos after the last W2G Link
        let afterW2GMessages: Message[] = []

        await channel.messages.fetch({after: w2gLink.id})
            .then(messages => {
                messages.forEach(msg => afterW2GMessages.push(msg))
            })

        // If there is 100 messages, then it will try to find more
        if (afterW2GMessages.length == 100) {
            let messagesAfterHundred: Message[] = []
            let lastMessage = afterW2GMessages.at(afterW2GMessages.length - 1)
            let limitReached = false

            while (!limitReached) {
                await channel.messages.fetch({after: lastMessage.id})
                    .then(messages => {
                        let iterationArray: Message[] = []

                        messages.forEach(msg => {
                            iterationArray.push(msg)
                        })

                        if (iterationArray.length < 100) {
                            limitReached = true
                        }

                        lastMessage = iterationArray.at(iterationArray.length - 1)
                        iterationArray.forEach(msg => messagesAfterHundred.push(msg))
                    })
            }

            messagesAfterHundred.forEach(msg => afterW2GMessages.push(msg))
        }

        // Now it will try to parse the messages
        let w2gVideos: string[] = []
        let nonW2GVideos: string[] = []

        afterW2GMessages.forEach(msg => {
            let msgSplit = msg.content.split(" ")
            msgSplit.forEach(m => {
                if (m.startsWith("https://twitter")
                || m.startsWith("https://www.twitter")
                || m.startsWith("https://www.youtube")
                || m.startsWith("https://youtu.be")) {
                    w2gVideos.push(m)
                } else if (m.startsWith("https://m.facebook")) {
                    nonW2GVideos.push(m.replace("m.facebook", "facebook"))
                } else if (m.startsWith("https://")) {
                    nonW2GVideos.push(m)
                }
            })
        })

        console.log(w2gVideos)

        await interaction.reply({
            content: "Watch2Gether built!"
        })
    }
})

client.login(token)