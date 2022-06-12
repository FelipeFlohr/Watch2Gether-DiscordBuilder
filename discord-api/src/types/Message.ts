export type MessageAbstraction = {
    id: string
    content: string
    date: Date
    user: string | null | undefined
}

export type VideoBuilderResponse = {
    url: string
    nonWorkingVideos: string[]
}

export type Watch2GetherMessages = {
    working: MessageAbstraction[]
    nonWorking: MessageAbstraction[]
}