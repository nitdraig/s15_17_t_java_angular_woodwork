package org.example.coworkproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class ReservationsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime initDate;

    private LocalDateTime endDate;

    private String initHour;

    private String endHour;

    private Float price;

    private Integer amountOfPeople;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
