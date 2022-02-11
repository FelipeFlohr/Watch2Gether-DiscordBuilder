import { loadData } from "./updatepage.js"

let socket = io("http://localhost:3000", {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }
});
socket.on("parsedUrls", data => {
    loadData(data)
})