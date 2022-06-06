import DiscordService from "../src/services/discord"

test("Amount of messages is correct", async () => {
    const roomId = "714008887501783060"
    const discord = await DiscordService.getInstance()

    const messages = await discord.getW2GMessages(roomId)
    const amount = messages.working.length

    discord.close()

    expect(amount).toBe(6) // By the time I'm doing this, I expect to be 6
})