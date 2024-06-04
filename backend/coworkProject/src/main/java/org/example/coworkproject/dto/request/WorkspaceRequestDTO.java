package org.example.coworkproject.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@ToString
public class WorkspaceRequestDTO {

    private Set<DayOfWeek> openDays;
    private String workspaceName;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private String address;
    private double pricePerHour;
    private String description;
    private int capacity;
}
