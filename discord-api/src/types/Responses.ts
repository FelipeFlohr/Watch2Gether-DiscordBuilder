export type ErrorResponse = {
    code: number
    msg: string
}

export type DataResponse = {
    code: number
    msg: string
    data: any
}

export type MessageResponse = ErrorResponse