package com.felipeflohr.seleniumw2g.services;

import com.felipeflohr.seleniumw2g.model.Builder;

/**
 * Service for building the Watch2Gether
 * @author Felipe Matheus Flohr
 */
public interface BuilderService {

	/**
	 * Builds the Watch2Gether using the methods available in this interface
	 * @param videos A string array containing URLs to be added in the Watch2Gether
	 * @return a Builder class
	 * @see com.felipeflohr.seleniumw2g.model.Builder
	 */
	Builder build(String[] videos);

	/**
	 * Creates the Web Driver
	 */
	void createDriver();

	/**
	 * Closes the Web Driver
	 */
	void close();

	/**
	 * Creates the Watch2Gether and returns the URLs
	 * @return The Watch2Gether room's URL
	 */
	String createRoomGetUrl();

	/**
	 * Add a video to the current Watch2Gether room
	 * @param url URL of the video
	 */
	void addVideo(String url);

	/**
	 * Add videos to the current Watch2Gether room
	 * @param urls An array of strings containing the URLs
	 */
	void addVideos(String[] urls);

	/**
	 * Get the non-working videos
	 * @return An array of containing the non-working videos
	 */
	String[] getNonWorkingVideos();
}
