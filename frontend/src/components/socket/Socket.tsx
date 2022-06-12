import React, { useEffect } from "react"
import io from "socket.io-client"
import { VideosData } from "../../types/VideosData"

export default function Socket(props: SocketProps) {
    useEffect(() => {
        const socket = io("http://localhost:3031", {
            withCredentials: true,
            extraHeaders: {
                "Access-Control-Allow-Origin": "*"
            }
        })

        socket.on("postData", data => {
            console.log("Data received:")
            console.log(data)
            props.onDataReceived(data)
        })
    }, [])

    return (
        <>
            {props.children}
        </>
    )
}

type SocketProps = {
    children: any
    onDataReceived: (data: VideosData) => void
}