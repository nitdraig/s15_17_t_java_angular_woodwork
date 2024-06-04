package org.example.coworkproject.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ReservationRequestDTO {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int numberOfPeople;

}
