package com.felipeflohr.w2gbuilder.backend.models.body;

public class VideosBody {
    private String[] videos;

    public VideosBody() {}

    public VideosBody(String[] videos) {
        this.videos = videos;
    }

    public String[] getVideos() {
        return videos;
    }

    public void setVideos(String[] videos) {
        this.videos = videos;
    }
}
