package com.felipeflohr.w2gbuilder.backend.controllers;

import com.felipeflohr.w2gbuilder.backend.models.body.VideosBody;
import com.felipeflohr.w2gbuilder.backend.models.response.Watch2GetherResponse;
import com.felipeflohr.w2gbuilder.backend.services.Browser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/build")
public class VideosController {

    @Autowired
    Browser browser;

    @GetMapping(path = "test/{name}")
    public ResponseEntity<String> test(@PathVariable String name) {
        return new ResponseEntity<>("Hello, " + name, HttpStatus.OK);
    }

    @PostMapping(path = "/videos")
    public ResponseEntity<Object> postVideos(@RequestBody(required = true) VideosBody videos) {
        if (videos.getVideos().length == 0) {
            return new ResponseEntity<>("INVALID_ARRAY", HttpStatus.BAD_REQUEST);
        }

        browser.createRoom();
        final Watch2GetherResponse result =
                new Watch2GetherResponse(browser.getUrl(), browser.insertVideos(videos.getVideos()));

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
