package com.felipeflohr.seleniumw2g.services;

import java.util.Arrays;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import com.felipeflohr.seleniumw2g.exception.ElementNotFoundException;
import com.felipeflohr.seleniumw2g.exception.EmptyVideoArrayException;
import com.felipeflohr.seleniumw2g.model.Builder;

@Service
public class BuilderServiceImpl extends BuilderService {

	@Override
	public Builder build(String[] videos) {
		this.createDriver();
		System.out.println("Driver created.");

		final String[] nonWorkingVideos;
		final String url = this.createRoomGetUrl();

		addVideos(videos);
		nonWorkingVideos = getNonWorkingVideos();

		this.driver.close();
		System.out.println("Driver closed.");

		return new Builder(nonWorkingVideos, url);
	}

	@Override
	public String createRoomGetUrl() {
		// Elements
		final var createRoomBtn = By.id("create_room_button");
		final var nicknameInput = By.id("intro-nickname");
		final var enterRoomBtn = By.xpath("//*[@id=\"intro-modal\"]/div[2]/div");
		final WebElement roomInput;

		// Gets to the page
		driver.get("https://www.w2g.tv/");
		driver.manage().window().maximize();

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
	public String[] getNonWorkingVideos() {
		return nonWorkingVideos.toArray(new String[nonWorkingVideos.size()]);
	}

	@Override
	public void addVideo(String url) {
		// Elements
		final var searchBar = By.id("search-bar-input");
		final var playlist = By.xpath("/html/body/div[4]/div[2]/div[2]/div[2]/div[3]/div[1]/div/select/option");
		final var addVideoBtn = By.xpath("//*[@id=\"w2g-search-results\"]/div[4]/div/div[3]/div[2]");

		// Waits until the playlist be available
		try {
			new WebDriverWait(driver, 15).until(ExpectedConditions.presenceOfElementLocated(playlist));
		} catch (TimeoutException e) {
			throw new ElementNotFoundException("The playlist element was not found. Was the room created?", e);
		}

		// Clears the search bar
		final WebElement searchBarElement = driver.findElement(searchBar);
		searchBarElement.clear();

		// Inserts the URL
		searchBarElement.sendKeys(url);

		// Press enter in the search bar
		searchBarElement.sendKeys("\uE007");

		// Clicks to add the video
		try {
			final WebElement addVideoBtnElement = new WebDriverWait(driver, 5)
					.until(ExpectedConditions.elementToBeClickable(addVideoBtn));
			addVideoBtnElement.click();
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

		Arrays.asList(urls).forEach(url -> {
			addVideo(url);
		});
	}

}
