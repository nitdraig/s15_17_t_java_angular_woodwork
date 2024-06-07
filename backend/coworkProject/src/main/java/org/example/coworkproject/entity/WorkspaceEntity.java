package org.example.coworkproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.example.coworkproject.controller.ReservationController;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Entity
@Getter
@Setter
@ToString
public class WorkspaceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_workspace;

    private String workspaceName;
    private String address;
    private double pricePerHour;
    private String description;
    private int capacity;
    private String mainImage;

    @ElementCollection
    private List<String> workspaceImages;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<DayOfWeek> openDays;

    private LocalTime openingTime;
    private LocalTime closingTime;

    @OneToMany(mappedBy = "workspace")
    @JsonManagedReference
    private List<ReservationEntity> reservations;

    @ManyToMany(mappedBy = "workspaces")
    @JsonIgnoreProperties("workspaces")
    private List<QualitiesEntity> qualities;
}
