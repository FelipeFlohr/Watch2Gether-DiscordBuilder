package com.felipeflohr.seleniumw2g.model;

public class Builder {

	private String[] nonWorkingVideos;
	private String url;
	
	public Builder() {}

	public Builder(String[] nonWorkingVideos, String url) {
		this.nonWorkingVideos = nonWorkingVideos;
		this.url = url;
	}

	public String[] getNonWorkingVideos() {
		return nonWorkingVideos;
	}

	public void setNonWorkingVideos(String[] nonWorkingVideos) {
		this.nonWorkingVideos = nonWorkingVideos;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
