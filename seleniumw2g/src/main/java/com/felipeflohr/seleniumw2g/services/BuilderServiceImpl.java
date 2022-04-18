package com.felipeflohr.seleniumw2g.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import io.github.bonigarcia.wdm.WebDriverManager;

import com.felipeflohr.seleniumw2g.exception.ElementNotFoundException;
import com.felipeflohr.seleniumw2g.exception.EmptyVideoArrayException;
import com.felipeflohr.seleniumw2g.model.Builder;

@Service
class BuilderServiceImpl implements BuilderService {

	private WebDriver driver;
	private final List<String> nonWorkingVideos;
	private final FirefoxOptions browserOptions;

	public BuilderServiceImpl() {
		this.browserOptions = new FirefoxOptions();
		browserOptions.addArguments("--headless");
		WebDriverManager.firefoxdriver().setup();
		
		this.nonWorkingVideos = new ArrayList<>();
	}

	@Override
	public Builder build(String[] videos) {
		this.createDriver();
		System.out.println("Driver created.");

		final String[] nonWorkingVideos;
		final String url = this.createRoomGetUrl();

		addVideos(videos);
		nonWorkingVideos = getNonWorkingVideos();

		close();
		System.out.println("Driver closed.");

		return new Builder(nonWorkingVideos, url);
	}
	
	@Override
	public void createDriver() {
		if (driver == null) {
			driver = new FirefoxDriver(this.browserOptions);
		}
	}

	@Override
	public void close() {
		driver.close();
		driver = null;
	}

	@Override
	public String createRoomGetUrl() {
		// Elements
		final var createRoomBtn = By.id("create_room_button");
		final var nicknameInput = By.id("intro-nickname");
		final var enterRoomBtn = By.cssSelector("div.actions > div.ui.fluid.green.cancel.button");
		final WebElement roomInput;

		// Gets to the page
		driver.get("https://www.w2g.tv/");
		driver.manage().window().setSize(new Dimension(1920, 1080));

		// Click to create the room
		driver.findElement(createRoomBtn).click();

		// Enters the nickname
		final WebElement nicknameInputElement = driver.findElement(nicknameInput);
		nicknameInputElement.clear();
		nicknameInputElement.sendKeys("builder");

		// Clicks the "Enter room" button
		driver.findElement(enterRoomBtn).click();

		// Waits 3s
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		// Will try to get the room input element
		try {
			roomInput = new WebDriverWait(driver, 5).until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"w2g-top-inviteurl\"]/input")));
		} catch (TimeoutException e) {
			throw new ElementNotFoundException("The room URL element was not found. Did you create the room?.", e);
		}

		return roomInput.getAttribute("value");
	}

	@Override
	public void addVideo(String url) {
		// Elements
		final String searchBarId = "search-bar-input";
		final String addVideoBtnSelector = "button.ui.mini.button.mod-pl.mod_pl_interaction.w2g-until-mobile";

		// Clears the search bar
		final WebElement searchBarElement = driver.findElement(By.id(searchBarId));
		searchBarElement.clear();

		// Inserts the URL
		searchBarElement.sendKeys(url);

		// Press enter on the search bar
		searchBarElement.sendKeys("\uE007");

		// Clicks to add the video
		try {
			final WebDriverWait wait = new WebDriverWait(this.driver, 5, 1000);
			final WebElement addVideoBtn = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(addVideoBtnSelector)));

			((JavascriptExecutor) this.driver).executeScript("arguments[0].click();", addVideoBtn);
		} catch (TimeoutException e) {
			System.out.println("Video " + url + " was ignored. Moving forward...");
			nonWorkingVideos.add(url);
		}
	}

	@Override
	public void addVideos(String[] urls) {
		if (urls == null) {
			throw new EmptyVideoArrayException("Array is null");
		}
		
		if (urls.length == 0) {
			throw new EmptyVideoArrayException("Array is empty");
		}

		Arrays.asList(urls).forEach(this::addVideo);
	}

	@Override
	public String[] getNonWorkingVideos() {
		return nonWorkingVideos.toArray(new String[nonWorkingVideos.size()]);
	}
}
