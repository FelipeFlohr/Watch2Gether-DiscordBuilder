// Elements in the page
const statusElement = document.getElementById("w2g-current-status")
const totalAmountVideos = document.getElementById("w2g-total-amount-vids")
const prevVideoBtn = document.getElementById("prev-video-btn")
const currentVideoBtn = document.getElementById("current-video-btn")
const nextVideoBtn = document.getElementById("next-video-btn")

var arrayVideos = []
var currentVideo = 0

// Attaching the functions to the buttons
prevVideoBtn.onclick = prevBtn
currentVideoBtn.onclick = currentBtn
nextVideoBtn.onclick = nextBtn

// Functions
export function loadData(data) {
    if (!data || data.length == 0) {
        statusElement.innerText = "The array of videos is null or empty. Please try to send again..."
    } else {
        arrayVideos = data.reverse()
        updatePage()
    }
}

function updatePage() {
    updateStatus()
    updateButtons()
}

function updateStatus() {
    statusElement.className = ""
    statusElement.innerText = `Current video: ${currentVideo + 1}`

    totalAmountVideos.className = "italic"
    totalAmountVideos.hidden = false
    totalAmountVideos.innerText = `Total amount of videos: ${arrayVideos.length}`
}

function updateButtons() {
    const amountVideos = arrayVideos.length
    currentVideoBtn.disabled = false

    if (currentVideo - 1 < 0) {
        prevVideoBtn.disabled = true
    } else {
        prevVideoBtn.disabled = false
    }

    if (currentVideo + 1 >= amountVideos) {
        nextVideoBtn.disabled = true
    } else {
        nextVideoBtn.disabled = false
    }
}

function prevBtn() {
    currentVideo -= 1
    updatePage()
}

function currentBtn() {
    window.open(arrayVideos[currentVideo])
    updatePage()
}

function nextBtn() {
    currentVideo += 1
    updatePage()
}