package com.felipeflohr.seleniumw2g.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.felipeflohr.seleniumw2g.model.BuildUrls;
import com.felipeflohr.seleniumw2g.model.Builder;
import com.felipeflohr.seleniumw2g.services.BuilderService;


/**
 * Controller for the Builder class. The default path is "/w2g"
 * @author Felipe Matheus Flohr
 */
@RestController
@RequestMapping(path = "/w2g")
public class BuilderController {

	@Autowired
	BuilderService builderService;

	/**
	 * Builds a Watch2Gether room using the provided URLs.
	 * @param urls The URLs which will be added on the Watch2Gether room. Needs to be in comply with the BuildUrls.
	 * @return a ResponseEntity. If the received BuildUrls are not empty, then it will return a Builder with OK status, else it will return a Bad Request Status
	 * @see com.felipeflohr.seleniumw2g.model.BuildUrls
	 * @see com.felipeflohr.seleniumw2g.model.Builder
	 */
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
			Builder build = builderService.build(urls.getUrls());
			Builder builder = new Builder(build.getNonWorkingVideos(), build.getUrl());

			return new ResponseEntity<>(builder, HttpStatus.OK);
		}
	}
}
