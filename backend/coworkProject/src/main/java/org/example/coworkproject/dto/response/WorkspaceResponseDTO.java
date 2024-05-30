package org.example.coworkproject.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class WorkspaceResponseDTO {

    private Long id_workspace;
    private List<String> days;
    private String startTime;
    private String endTime;
    private String workspaceName;
    private String address;
    private Float pricePerHour;
    private String description;

}
