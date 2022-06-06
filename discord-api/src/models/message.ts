import { Collection, Message } from "discord.js"
import { MessageAbstraction } from "../types/Message"
import { w2g, allowed, nonAllowed, mobile } from "../services/platforms.json"

export default class MessageHandler {
    public readonly content: MessageAbstraction[]

    public constructor(messages: MessageAbstraction[] | Collection<string, Message<boolean>>) {
        if (messages instanceof Collection<string, Message<boolean>>) {
            this.content = messages.map(v => {
                return {
                    id: v.id,
                    content: v.content,
                    date: v.createdAt,
                    user: v.member?.nickname
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
                    user: v.member?.nickname
                }
            })

            this.content.concat(messagesParsed)
        } else {
            this.content.concat(messages)
        }
    }

    public getWatch2GetherLinks() {
        const sorted = this.content.sort((a, b) => b.date.getTime() - a.date.getTime())
        const linkIndex = sorted.findIndex(v => v.content.startsWith(w2g))

        const working: string[] = sorted
            .slice(0, linkIndex)
            .map(v => v.content)
            .map(v => {
                const split = v.split(" ")
                return split.find(s => s.startsWith("https://")) != undefined ? split.find(s => s.startsWith("https://")) as string : split[0]
            })
            .filter(v => {
                return allowed.some(a => v.startsWith(a))
            })

        const nonWorking: string[] = sorted
            .slice(0, linkIndex)
            .map(v => v.content)
            .map(v => {
                const split = v.split(" ")
                return split.find(s => s.startsWith("https://")) != undefined ? split.find(s => s.startsWith("https://")) as string : split[0]
            })
            .map(v => {
                if (mobile.some(m => v.startsWith(m))) return v.replace("https://m.", "https://")
                return v
            })
            .filter(v => {
                return nonAllowed.some(a => v.startsWith(a))
            })

            return {
                working: working,
                nonWorking: nonWorking
            }
    }

    public collectionToAbstraction(collection: Collection<string, Message<boolean>>): MessageAbstraction[] {
        return collection.map(v => {
            return {
                content: v.content,
                date: v.createdAt,
                id: v.id,
                user: v.member?.nickname
            }
        })
    }

    public hasWatch2GetherLink() {
        return this.content.some(v => v.content.startsWith(w2g))
    }
}