import {Express} from "express";

const express = require("express")

class Server {
    private readonly _app = express()

    constructor(port: number = 3000) {
        this._app.listen(3000, () => {
            console.log("Web page server listening on " + port)
        })
    }

    get app(): Express {
        return this._app;
    }
}

export const webpageServer = new Server()