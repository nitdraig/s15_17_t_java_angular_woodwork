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
@Table(name = "qualities")
public class QualitiesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_quality")
    private Long idQuality;

    @Column(name = "nombre")
    private String nombre;

    @JoinTable(
            name = "workspaces_qualities",
            joinColumns = @JoinColumn(name = "idQuality", nullable = false),
            inverseJoinColumns = @JoinColumn(name="idWorkspace", nullable = false)
    )
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    private List<WorkspaceEntity> workspaces;

}
