<h1 align="center">Watch2Gether Builder + Discord Bot</h1>

A Discord Bot which automatically generates a [Watch2Gether](https://w2g.tv/) room and add videos to it. Uses [Discord.JS](https://discord.js.org/) to interact with the Discord API, [Spring](https://spring.io/) to "build" the Watch2Gether room and [Socket.IO](https://socket.io/) for real time bidirectional communication between the Frontend and Backend

**Sections**:
- [1 Requirements](#1-requirements)
  - [1.0 Requirements using Docker](#10-requirements-using-docker)
  - [1.1 Requirements without Docker](#11-requirements-without-docker)
- [2 Setting Up](#2-setting-up)
- [3 Usage](#3-usage)
  - [3.0 The non working videos/"Alternative videos"](#30-the-non-working-videos%22alternative-videos%22)
- [4 Dependencies](#4-dependencies)
  - [4.0 "seleniumw2g" dependencies](#40-%22seleniumw2g%22-dependencies)
  - [4.1 "discord-bot/backend" dependencies](#41-%22discord-botbackend%22-dependencies)
  - [4.2 "discord-bot/frontend" dependencies](#42-%22discord-botfrontend%22-dependencies)
- [5 FAQ](#5-faq)
- [6 License](#6-license)

## 1 Requirements

- [A Discord Bot](https://discord.com/developers/) which will serve as your Watch2Gether builder

### 1.0 Requirements using Docker

- [Docker](https://www.docker.com/) for running the images.

### 1.1 Requirements without Docker

You may also run the applications without Docker, but I trully recommend you to run with Docker.

- [Java Development Kit 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) and [Maven](https://maven.apache.org/) for compiling the "seleniumw2g" application
- [Node.js](https://nodejs.org/en/) to run the Discord Bot
- Some Web Server to host the Frontend (I usually use the [Live Server extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))

## 2 Setting up

The first thing you should do is to create a file called "***bot.json***" inside "*/discord-bot/backend/*" containing the following parameters:
```json
{
  "token": "Your Token ID", // DO NOT EVER SEND YOUR BOT TOKEN ID TO ANYONE. NEVER. NEVER.
  "guildId": "Your Guild ID"
}
```
The bot will only work within the selected guild because doing it for every guild would be extremely memory-consuming.

By default, the Watch2Gether Bot will only add *Twitter* and *YouTube* links to the Watch2Gether room. If you want to add one more platform, feel free to change it on "***links.json***" inside "*/discord-bot/backend/*", just be aware that some video players may not work well.

## 3 Usage

At the root of this repository, execute the following command into your Terminal:
```
docker-compose up -d
```

**Obs.: to run without Docker** you will need to execute each individual application (Selenium App, Backend and Frontend) on your local machine.

Then, if no mistakes were made, the Discord Bot will be online and the command **/build** will be available, as you can see below:
<p align="center">
  <img src=".readme-files\buildscreenshot.png"></img>
</p>

Before using the command, it's very important to open the **Video Opener** at your Web Browser. The address is "**http://localhost:5500/**". The reason why is explained [here](#30-the-non-working-videos%22alternative-videos%22).

Now you may be able to use the **/build** command. On its usage, the Bot will try to find the last Watch2Gether link within the last 500 messages at the command's channel. Any link after the last Watch2Gether link will be parsed within the Bot and only the URLs which start with any link provided on "*/discord-bot/backend/links.json*" are going to be added to the room. If no Watch2Gether link was found, any link within the last 500 messages is going to be parsed. 

### 3.0 The *non working videos*/"*Alternative videos*"

Every URL within the command's channel which does not start with any link provided on "*/discord-bot/backend/links.json*" will not be added to the Watch2Gether room. Instead, it's going to be added to the "***Alterinative videos***". Also, some videos may failed to be added to the Watch2Gether room, which in this case are going to be added the "***Non Working Videos***". Therefore, these videos are available in the **Video Opener** which its address is, by default **http://localhost:5500/**. When the Bot finishes building the Watch2Gether room, the **Video Opener** webpage should look like this:
<p align="center">
  <img src=".readme-files\webpagescreenshot.png"></img>
</p>

## 4 Dependencies

Dependencies of this repository:

### 4.0 "**seleniumw2g**" dependencies:

- [Spring Boot Starter Web](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web)
- [Spring Boot DevTools](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-devtools)
- [Spring Boot Starter Test](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test)
- [Selenium](https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java)
- [WebDriverManager](https://mvnrepository.com/artifact/io.github.bonigarcia/webdrivermanager)
- [Bean Validation API](https://mvnrepository.com/artifact/javax.validation/validation-api)

### 4.1 "**discord-bot/backend**" dependencies:

- [Axios](https://www.npmjs.com/package/axios)
- [Discord.js](https://www.npmjs.com/package/discord.js)
- [Socket.IO](https://www.npmjs.com/package/socket.io)
- [Socket.IO Client](https://www.npmjs.com/package/socket.io-client)
- [Typescript](https://www.npmjs.com/package/typescript)

### 4.2 "**discord-bot/frontend**" dependencies:

- [Socket.IO](https://socket.io/)

## 5 FAQ

Q: Why you didn't you use Node.js' Selenium instead of doing it using Java + Spring
- A: For some weird reason, Selenium on Node.js didn't work well, so I opted for the Java version.

Q: I found some bug, how can I report?
- A: Feel free to open a issue ticket or contact me on my e-mail: felipeflohrlol@gmail.com

## 6 License

Feel free to do whatever you want with this code, but I would be extremely happy if you credit me :)