import { Collection, Message } from "discord.js"
import { MessageAbstraction, Watch2GetherMessages } from "../types/Message"
import { w2g, allowed, nonAllowed, mobile } from "../services/platforms.json"
import { User } from "../types/VideoOpener"

export default class MessageHandler {
    public readonly content: MessageAbstraction[]

    public constructor(messages: MessageAbstraction[] | Collection<string, Message<boolean>>) {
        if (messages instanceof Collection<string, Message<boolean>>) {
            this.content = messages.map(v => {
                return {
                    id: v.id,
                    content: v.content,
                    date: v.createdAt,
                    user: v.author.username
                }
            })
        } else {
            this.content = messages
        }
    }

    public getLastMessage() {
        return this.content
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            [0]
    }

    public getFirstMessage() {
        return this.content
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            [0]
    }

    public concat(messages: MessageAbstraction[] | Collection<string, Message<boolean>>) {
        if (messages instanceof Collection<string, Message<boolean>>) {
            const messagesParsed: MessageAbstraction[] = messages.map(v => {
                return {
                    id: v.id,
                    content: v.content,
                    date: v.createdAt,
                    user: v.author.username
                }
            })

            this.content.concat(messagesParsed)
        } else {
            this.content.concat(messages)
        }
    }

    public getWatch2GetherLinks(): Watch2GetherMessages {
        const sorted = this.content.sort((a, b) => b.date.getTime() - a.date.getTime())
        const linkIndex = sorted.findIndex(v => v.content.startsWith(w2g))

        const workingVideos: MessageAbstraction[] = sorted
            .slice(0, linkIndex)
            .map(v => {
                const split = v.content.split(" ")
                const content = split.find(s => s.startsWith("https://"))
                return {
                    content: content != undefined ? content : split[0],
                    date: v.date,
                    id: v.id,
                    user: v.user
                }
            })
            .filter(v => {
                return allowed.some(a => v.content.startsWith(a))
            })

        const nonWorkingVideos: MessageAbstraction[] = sorted
            .slice(0, linkIndex)
            .map(v => {
                const split = v.content.split(" ")
                let content = split.find(s => s.startsWith("https://"))
                content = mobile.some(m => content?.startsWith(m)) ? content?.replace("https://m.", "https://") : content
                return {
                    content: content != undefined ? content : split[0],
                    date: v.date,
                    id: v.id,
                    user: v.user
                }
            })
            .filter(v => {
                return nonAllowed.some(n => v.content.startsWith(n))
            })

            return {
                working: workingVideos,
                nonWorking: nonWorkingVideos
            }
    }

    public collectionToAbstraction(collection: Collection<string, Message<boolean>>): MessageAbstraction[] {
        return collection.map(v => {
            return {
                content: v.content,
                date: v.createdAt,
                id: v.id,
                user: v.author.username
            }
        })
    }

    public hasWatch2GetherLink() {
        return this.content.some(v => v.content.startsWith(w2g))
    }

    public static getUsersAmountOfVideos(msgs: MessageAbstraction[]): User[] {
        const users = new Set<string>()
        msgs.forEach(msg => {
            if (msg.user) {
                users.add(msg.user)
            }
        })

        return Array.from(users).map(u => {
            return {
                [u.trim()]: msgs.filter(m => m.user === u).length
            }
        })
    }
}