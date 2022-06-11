package com.felipeflohr.w2gbuilder.backend.models.response;

import java.util.List;

public class Watch2GetherResponse {
    private String url;
    private List<String> nonWorkingVideos;

    public Watch2GetherResponse(String url, List<String> nonWorkingVideos) {
        this.url = url;
        this.nonWorkingVideos = nonWorkingVideos;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getNonWorkingVideos() {
        return nonWorkingVideos;
    }

    public void setNonWorkingVideos(List<String> nonWorkingVideos) {
        this.nonWorkingVideos = nonWorkingVideos;
    }
}
