package com.felipeflohr.seleniumw2g.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.felipeflohr.seleniumw2g.model.BuildUrls;
import com.felipeflohr.seleniumw2g.model.Builder;
import com.felipeflohr.seleniumw2g.services.BuilderService;

@RestController
@RequestMapping(path = "/w2g")
public class BuilderController {

	@Autowired
	BuilderService builderService;

	@GetMapping(path = "/helloworld")
	public String helloWorld() {
		return "Hello, World!";
	}
	
	@PostMapping(path = "/build")
	public ResponseEntity<Object> buildW2G(@RequestBody BuildUrls urls) {
		System.out.println("RECEIVED: " + urls);

		if (urls == null) {
			return new ResponseEntity<>("The video array is null", HttpStatus.BAD_REQUEST);
		} else if (urls.getUrls() == null) {
			return new ResponseEntity<>("The video array is null", HttpStatus.BAD_REQUEST);
		} else if (urls.getUrls().length == 0) {
			return new ResponseEntity<>("The video array is empty", HttpStatus.BAD_REQUEST);
		} else {

			var build = builderService.build(urls.getUrls());
			Builder builder = new Builder(build.getNonWorkingVideos(), build.getUrl());
			return new ResponseEntity<>(builder, HttpStatus.OK);
		}
	}
}
