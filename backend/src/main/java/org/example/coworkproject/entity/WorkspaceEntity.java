package org.example.coworkproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Table(name = "workspaces")
public class WorkspaceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_workspace")
    private Long idWorkspace;

    @Column(name = "city")
    private Integer city;

    @Column(name = "country")
    private Integer country;

    @Column(name = "is_public")
    private Boolean isPublic;

    @Column(name = "address")
    private String address;

    @Column(name = "price")
    private Float price;

    @ManyToMany(mappedBy = "workspaces")
    @JsonIgnoreProperties("workspaces")
    private List<QualitiesEntity> qualities;
}
