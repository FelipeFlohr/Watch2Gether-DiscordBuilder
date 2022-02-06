package com.felipeflohr.seleniumw2g;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.felipeflohr.seleniumw2g.view.ConsoleGUI;

@SpringBootApplication
public class Seleniumw2gApplication {

	public static void main(String[] args) {
		new ConsoleGUI();
		SpringApplication.run(Seleniumw2gApplication.class, args);
	}

}
