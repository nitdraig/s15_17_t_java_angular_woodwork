package org.example.coworkproject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reservation;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    @JsonBackReference
    private WorkspaceEntity workspace;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private UserEntity user;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double price;
    private int numberOfPeople;

    public ReservationEntity(WorkspaceEntity workspace, LocalDateTime startTime, LocalDateTime endTime, UserEntity user, int numberOfPeople) {
        this.workspace = workspace;
        this.startTime = startTime;
        this.endTime = endTime;
        this.user = user;
        this.numberOfPeople = numberOfPeople;
    }

    public ReservationEntity() {

    }
}
