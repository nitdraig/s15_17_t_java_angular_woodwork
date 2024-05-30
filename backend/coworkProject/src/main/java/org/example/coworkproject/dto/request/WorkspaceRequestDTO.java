package org.example.coworkproject.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class WorkspaceRequestDTO {

    private List<String> days;
    private String workspaceName;
    private String startTime;
    private String endTime;
    private String address;
    private Float pricePerHour;
    private String description;
}
