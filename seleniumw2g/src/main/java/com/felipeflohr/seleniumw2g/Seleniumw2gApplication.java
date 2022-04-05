package com.felipeflohr.seleniumw2g;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the application.
 * @author Felipe Matheus Flohr
 */
@SpringBootApplication
public class Seleniumw2gApplication {

	public static void main(String[] args) {
		// new ConsoleGUI(); // <- Turn off the commentaries to enable a Swing Console GUI
		SpringApplication.run(Seleniumw2gApplication.class, args);
	}

}