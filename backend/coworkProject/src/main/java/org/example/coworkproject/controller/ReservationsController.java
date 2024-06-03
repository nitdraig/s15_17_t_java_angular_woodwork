package org.example.coworkproject.controller;

import org.example.coworkproject.dto.request.ReservationRequestDTO;
import org.example.coworkproject.entity.ReservationsEntity;
import org.example.coworkproject.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/reservations")
public class ReservationsController {

    @Autowired
    private ReservationsService reservationsService;

    @GetMapping("/listOfReservations")
    public ResponseEntity<List<ReservationsEntity>> getAllReservations() {

        List<ReservationsEntity> reservations = reservationsService.getAllReservations();

        if (reservations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(reservations);
        }
    }

    @PostMapping("/createReservation/{idUser}")
    public ResponseEntity<ReservationsEntity> create(@RequestBody ReservationRequestDTO reservation, @PathVariable Long idUser) {

        ReservationsEntity reservationCreated = reservationsService.createReservation(reservation, idUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationCreated);
    }

}
