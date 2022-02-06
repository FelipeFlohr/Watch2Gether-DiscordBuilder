package com.felipeflohr.seleniumw2g.services;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import com.felipeflohr.seleniumw2g.model.Builder;

import io.github.bonigarcia.wdm.WebDriverManager;

// FIXME: This whole implementation is broken. Needs to move to an interface.
public abstract class BuilderService {

	protected WebDriver driver = null;
	protected List<String> nonWorkingVideos = new ArrayList<>();
	private ChromeOptions chromeOptions;
	
	public BuilderService() {
		chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("--mute-audio");
		WebDriverManager.chromedriver().setup();
	}

	public void createDriver() {
		if (driver == null) {
			driver = new ChromeDriver(chromeOptions);
		}
	}

	protected WebDriver getDriver() {
		return this.driver;
	}

	protected void close() {
		this.driver.close();
	}

	public abstract Builder build(String[] videos);
	protected abstract String createRoomGetUrl();
	protected abstract String[] getNonWorkingVideos();
	protected abstract void addVideo(String url);
	protected abstract void addVideos(String[] urls);
}
