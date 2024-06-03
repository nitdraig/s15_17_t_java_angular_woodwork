package org.example.coworkproject.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@ToString
public class WorkspaceResponseDTO {

    private Long id_workspace;
    private Set<DayOfWeek> openDays;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private String workspaceName;
    private String address;
    private double pricePerHour;
    private String description;
    private int capacity;

}
