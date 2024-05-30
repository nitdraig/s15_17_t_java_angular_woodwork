package org.example.coworkproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class WorkspaceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_workspace;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable
    private List<String> days;

    private String startTime;
    private String endTime;
    private String workspaceName;
    private String address;
    private Float pricePerHour;
    private String description;

    @ManyToMany(mappedBy = "workspaces")
    @JsonIgnoreProperties("workspaces")
    private List<QualitiesEntity> qualities;
}
