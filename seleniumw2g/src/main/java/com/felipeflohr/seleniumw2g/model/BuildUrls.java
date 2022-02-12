package com.felipeflohr.seleniumw2g.model;

import java.util.Arrays;

/**
 * Represents the RequestBody of the "Build Watch2Gether method"
 * @author Felipe Matheus Flohr
 * @see com.felipeflohr.seleniumw2g.controller.BuilderController#buildW2G(BuildUrls)
 */
public class BuildUrls {

	private String[] urls;
	
	public BuildUrls() {}

	/**
	 * The main constructor
	 * @param urls An array of Strings containing URLs of videos to be added to the Watch2Gether room
	 */
	public BuildUrls(String[] urls) {
		this.urls = urls;
	}

	/**
	 * Getter for the URLs
	 * @return return an array of strings containing the URLs
	 * @see com.felipeflohr.seleniumw2g.model.BuildUrls#BuildUrls(String[])
	 */
	public String[] getUrls() {
		return urls;
	}

	@Override
	public String toString() {
		return "BuildUrls [urls=" + Arrays.toString(urls) + "]";
	}
}
