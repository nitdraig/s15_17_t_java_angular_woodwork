package org.example.coworkproject.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QualitiesResponseDTO {

    private Long id_quality;
    private String QualityName;
    private boolean isActive;

}
