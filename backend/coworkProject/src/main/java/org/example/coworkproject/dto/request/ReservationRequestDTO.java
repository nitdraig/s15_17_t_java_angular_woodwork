package org.example.coworkproject.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ReservationRequestDTO {

    private LocalDateTime initDate;
    private LocalDateTime endDate;
    private String initHour;
    private String endHour;
    private Float price;
    private Integer amountOfPeople;

}
