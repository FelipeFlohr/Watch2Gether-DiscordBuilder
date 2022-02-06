package com.felipeflohr.seleniumw2g.services;

import com.felipeflohr.seleniumw2g.model.Builder;

public interface BuilderService {

	public abstract Builder build(String[] videos);
	public abstract void createDriver();
	public abstract void close();
	public abstract String createRoomGetUrl();
	public abstract void addVideo(String url);
	public abstract void addVideos(String[] urls);
	public abstract String[] getNonWorkingVideos();
}
