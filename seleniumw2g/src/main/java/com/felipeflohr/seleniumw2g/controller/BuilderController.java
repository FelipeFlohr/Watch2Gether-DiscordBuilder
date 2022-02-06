package com.felipeflohr.seleniumw2g.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.felipeflohr.seleniumw2g.model.BuildUrls;
import com.felipeflohr.seleniumw2g.model.Builder;
import com.felipeflohr.seleniumw2g.services.BuilderServiceImpl;

@RestController
@RequestMapping(path = "/w2g")
public class BuilderController {

	@GetMapping(path = "/helloworld")
	public String helloWorld() {
		return "Hello, World!";
	}
	
	@GetMapping(path = "/test")
	public Builder test() {
		String[] videos = {"https://twitter.com/shadibrabus/status/1488082027115069440?t=ucSoLjYF-1cvbrzn2p-0BA&s=09", 
			"https://www.youtube.com/watch?v=0m8tHPg32Kw", 
			"https://youtu.be/VtpyTZwsnzQ", 
			"https://twitter.com/Cockson_Boy/status/1488968583216467973",
			"https://twitter.com/Cockson_Boy/status/148896858321646797384723987423",
			"https://twitter.com/Cockson_Boy/status/14889685832164679738429048239048234",
			"https://twitter.com/Cockson_Boy/status/1488968583216467973789234"};

		return new BuilderServiceImpl().build(videos);
	}
	
	@PostMapping(path = "/build")
	public ResponseEntity<Object> buildW2G(@Valid BuildUrls urls) {
		if (urls == null) {
			return new ResponseEntity<>("The video array is null", HttpStatus.BAD_REQUEST);
		} else if (urls.getUrls() == null) {
			return new ResponseEntity<>("The video array is null", HttpStatus.BAD_REQUEST);
		} else if (urls.getUrls().length == 0) {
			return new ResponseEntity<>("The video array is empty", HttpStatus.BAD_REQUEST);
		} else {
			System.out.println("RECEIVED: " + urls);
			
			var build = new BuilderServiceImpl().build(urls.getUrls());
			Builder builder = new Builder(build.getNonWorkingVideos(), build.getUrl());
			return new ResponseEntity<>(builder, HttpStatus.OK);
		}
	}
}
