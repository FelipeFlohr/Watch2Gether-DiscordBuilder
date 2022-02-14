import { loadData } from "./updatepage.js"

const hostname = window && window.location && window.location.hostname;
const ADDRESS = hostname === "dsbot-frontend" ? "http://dsbot-backend:3000" : "http://localhost:3000"

let socket = io(ADDRESS, {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }
});
socket.on("parsedUrls", data => {
    loadData(data)
})