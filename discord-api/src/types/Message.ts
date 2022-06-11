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