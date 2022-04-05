package com.felipeflohr.seleniumw2g.model;

/**
 * Class that represents a fully set Watch2Gether. When the BuilderService builds a Watch2Gether, returns this class
 * @author Felipe Matheus Flohr
 */
public class Builder {

	private String[] nonWorkingVideos;
	private String url;
	
	public Builder() {}

	/**
	 * The main constructor for the Builder class.
	 * @param nonWorkingVideos a String array containing the videos that, for some reason, was not possible to add in the Watch2Gether room.
	 * @param url The URL of the Watch2Gether room.
	 */
	public Builder(String[] nonWorkingVideos, String url) {
		this.nonWorkingVideos = nonWorkingVideos;
		this.url = url;
	}

	/**
	 * Getter for the non-working videos
	 * @return a String array containing the non-working videos
	 * @see com.felipeflohr.seleniumw2g.model.Builder#Builder()
	 */
	public String[] getNonWorkingVideos() {
		return nonWorkingVideos;
	}

	/**
	 * Setter for the non-working videos
	 * @param nonWorkingVideos an Array containing non-working videos
	 * @see com.felipeflohr.seleniumw2g.model.Builder#Builder(String[], String)
	 */
	public void setNonWorkingVideos(String[] nonWorkingVideos) {
		this.nonWorkingVideos = nonWorkingVideos;
	}

	/**
	 * Getter for the Watch2Gether room URL
	 * @return the URL of the Watch2Gether room
	 * @see com.felipeflohr.seleniumw2g.model.Builder#Builder()
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * Setter for the Watch2Gether room URL
	 * @param url the URL of the Watch2Gether room
	 * @see com.felipeflohr.seleniumw2g.model.Builder#Builder()
	 */
	public void setUrl(String url) {
		this.url = url;
	}
}
