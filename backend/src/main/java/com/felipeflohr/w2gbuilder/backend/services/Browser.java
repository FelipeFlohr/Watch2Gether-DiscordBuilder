package com.felipeflohr.w2gbuilder.backend.services;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxDriverLogLevel;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class Browser {
    private FirefoxDriver driver;

    public Browser() {
        WebDriverManager.firefoxdriver().setup();

        FirefoxOptions options = new FirefoxOptions();
        options.setLogLevel(FirefoxDriverLogLevel.FATAL);

        this.driver = new FirefoxDriver();
        this.driver.manage().window().setSize(new Dimension(1600, 900));
    }

    public void createRoom() {
        // Enters the URL
        final String W2G_URL = "https://w2g.tv/";
        this.driver.get(W2G_URL);

        // Creates the room
        final String createRoomSelector = "#create_room_button";
        WebElement createRoomElement = new WebDriverWait(this.driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector(createRoomSelector)));
        createRoomElement.click();

        // Set the nickname and joins the room
        final String nicknameInputSelector = "#intro-nickname";
        final String joinRoomSelector = ".ui.fluid.green.cancel.button";

        WebElement nicknameInput = new WebDriverWait(this.driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector(nicknameInputSelector)));
        WebElement joinRoom = this.driver.findElement(By.cssSelector(joinRoomSelector));

        nicknameInput.clear();
        nicknameInput.sendKeys("builder");
        joinRoom.click();

        // Wait until the playlist is available
        final String playlistSelectSelector = ".playlist-menu.mod-pl > div.ui.fluid.input > select > option";
        new WebDriverWait(this.driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(playlistSelectSelector)));
    }

    public List<String> insertVideos(String[] urls) {
        final List<String> nonWorking = new ArrayList<>();
        Arrays.stream(urls).forEach(url -> {
            final boolean insertedVideo = this.insertVideo(url);
            if (!insertedVideo) nonWorking.add(url);
        });
        return nonWorking;
    }

    public String getUrl() {
        final String pageUrlInputSelector = "#w2g-top-inviteurl > input";

        WebElement pageUrlInput = this.driver.findElement(By.cssSelector(pageUrlInputSelector));
        return pageUrlInput.getAttribute("value");
    }

    private boolean insertVideo(String url) {
        final String searchVideoBarSelector = "#search-bar-input";
        final String searchVideoButtonSelector = ".ui.fluid.icon.action.input.w2g-intro-search > button.ui.icon.button";
        final String addVideoButtonSelector = "button.ui.mini.button.mod-pl.mod_pl_interaction.w2g-until-mobile";

        try {
            // Types the URL on the search bar
            WebElement searchVideoBar = new WebDriverWait(this.driver, Duration.ofSeconds(4))
                    .until(ExpectedConditions.elementToBeClickable(By.cssSelector(searchVideoBarSelector)));
            searchVideoBar.clear();
            searchVideoBar.sendKeys(url);

            // Clicks to search the video
            this.clickElement(searchVideoButtonSelector);

            // Clicks to add video button
            this.clickElement(addVideoButtonSelector);

            return true;
        } catch (TimeoutException err) {
            return false;
        }
    }

    private void clickElement(String cssLocator) {
        WebElement element = new WebDriverWait(this.driver, Duration.ofSeconds(5))
                .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(cssLocator)));
        this.driver.executeScript("document.querySelector(\"" + cssLocator + "\").click();");
    }
}