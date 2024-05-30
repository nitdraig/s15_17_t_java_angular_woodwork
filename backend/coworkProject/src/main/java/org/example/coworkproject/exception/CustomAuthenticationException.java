package org.example.coworkproject.exception;

public class CustomAuthenticationException extends RuntimeException{

    public CustomAuthenticationException(String message) {
        super(message);
    }

}
