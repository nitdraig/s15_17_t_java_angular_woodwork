package org.example.coworkproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class QualitiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_quality;

    private String QualityName;
    private boolean isActive;

    @JoinTable(
            name = "workspaces_qualities",
            joinColumns = @JoinColumn(name = "idQuality", nullable = false),
            inverseJoinColumns = @JoinColumn(name="idWorkspace", nullable = false)
    )
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<WorkspaceEntity> workspaces;

}
