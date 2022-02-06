import {By, until, WebDriver} from "selenium-webdriver";

const webdriver = require("selenium-webdriver")
const chrome = require('selenium-webdriver/chrome');
const chromeDriver = require("chromedriver")

export class Watch2GetherBuilder {
    path: string
    driver: WebDriver
    videos: string[]
    nonWorkingVideos: string[] = []

    constructor() {
        this.path = chromeDriver.path
    }

    public async build(videos: string[]) {
        this.videos = videos
        chromeDriver.start()

        const options = new chrome.Options()
            .addArguments("--mute-audio")

        this.driver = new webdriver.Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build()

        await this.generateRoom()
        await this.addAllVideos()
        return await this.getRoomUrl()
    }

    private async generateRoom() {
        await this.driver.get("https://w2g.tv/")
        await this.driver.manage().window().maximize()

        // Will click the button to create the room
        const createRoomBtn = this.driver.findElement(By.id("create_room_button"))
        await createRoomBtn.click()

        // Inserts the nickname and joins the room
        const nicknameInput = await this.driver.findElement(By.id("intro-nickname"))
        const joinRoomBtn = await this.driver.findElement(By.xpath("//*[@id=\"intro-modal\"]/div[2]/div"))

        await nicknameInput.clear()
        await nicknameInput.sendKeys("builder")

        await joinRoomBtn.click()
    }

    private async addAllVideos() {
        await console.log(this.videos)
        await this.videos.forEach(v => this.addVideo(v))
    }

    private async addVideo(url: string) {
        const searchBar = await this.driver.findElement(By.id("search-bar-input"))
        const searchBtn = await this.driver.findElement(By.xpath("//*[@id=\"search-bar-form\"]/div/button"))
        await searchBar.clear()
        await searchBar.sendKeys(url)
        await searchBtn.click()

        // Waits until the playlist be available
        await this.driver.wait(until.elementLocated(By.xpath("/html/body/div[4]/div[2]/div[2]/div[2]/div[3]/div[1]/div/select/option")), 5000)
            .then(async () => {
                await this.driver.wait(until.elementLocated(By.xpath("//*[@id=\"w2g-search-results\"]/div[4]/div/div[3]/div[2]")), 2000)
                    .then(async () => await this.driver.findElement(By.xpath("//*[@id=\"w2g-search-results\"]/div[4]/div/div[3]/div[2]")).click())
                    .catch(async () => {
                        console.log(`Video ${url} didn't work. Ignoring and moving forward`)
                        this.nonWorkingVideos.push(url)
                    })
            })
    }

    public async getRoomUrl() {
        const roomUrl = await this.driver.findElement(By.xpath("//*[@id=\"w2g-top-inviteurl\"]/input"))

        roomUrl.getAttribute("value").then(link => {
            console.log(link)
        })
    }
}

let builder = new Watch2GetherBuilder()
const teste = ["https://twitter.com/shadibrabus/status/1488082027115069440?t=ucSoLjYF-1cvbrzn2p-0BA&s=09", "https://www.youtube.com/watch?v=0m8tHPg32Kw", "https://youtu.be/VtpyTZwsnzQ", "https://twitter.com/Cockson_Boy/status/1488968583216467973"]
builder.build(teste)