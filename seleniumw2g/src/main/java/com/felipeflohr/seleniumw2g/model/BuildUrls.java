package com.felipeflohr.seleniumw2g.model;

import java.util.Arrays;

public class BuildUrls {

	private String[] urls;
	
	public BuildUrls() {}

	public BuildUrls(String[] urls) {
		this.urls = urls;
	}

	public String[] getUrls() {
		return urls;
	}

	@Override
	public String toString() {
		return "BuildUrls [urls=" + Arrays.toString(urls) + "]";
	}
}
