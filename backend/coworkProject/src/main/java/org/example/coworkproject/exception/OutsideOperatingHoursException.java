package org.example.coworkproject.exception;

public class OutsideOperatingHoursException extends RuntimeException{

    public OutsideOperatingHoursException(String message) {
        super(message);
    }
}