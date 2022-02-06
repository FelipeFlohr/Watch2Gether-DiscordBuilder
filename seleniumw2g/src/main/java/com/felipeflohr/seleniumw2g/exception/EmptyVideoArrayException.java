package com.felipeflohr.seleniumw2g.exception;

public class EmptyVideoArrayException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public EmptyVideoArrayException() {}
	
	public EmptyVideoArrayException(String message) {
		super(message);
	}
	
	public EmptyVideoArrayException(Throwable cause) {
		super(cause);
	}
	
	public EmptyVideoArrayException(String message, Throwable cause) {
		super(message, cause);
	}
}
