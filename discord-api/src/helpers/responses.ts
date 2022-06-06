import { Response } from "express";
import { DataResponse, ErrorResponse, MessageResponse } from "../types/Responses";

export function error(res: Response, code: number, msg: string) {
    const error: ErrorResponse = {
        code: code,
        msg: msg
    }

    if (code >= 500) console.log(`${new Date()} | A Server-side error occurred. Message is: ${msg}`)

    res.status(code).send(error)
}

export function data(res: Response, data: any, message = "SUCCESS", code = 200) {
    const content: DataResponse = {
        code: code,
        data: data,
        msg: message
    }

    res.status(code).send(content)
}

export function message(res: Response, code: number, message: string) {
    const msg: MessageResponse = {
        code: code,
        msg: message
    }

    res.status(code).send(msg)
}