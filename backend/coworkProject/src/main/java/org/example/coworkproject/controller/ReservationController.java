package org.example.coworkproject.controller;

import org.example.coworkproject.dto.request.ReservationRequestDTO;
import org.example.coworkproject.entity.ReservationEntity;
import org.example.coworkproject.exception.*;
import org.example.coworkproject.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/listOfReservations")
    public ResponseEntity<List<ReservationEntity>> getReservations() {

        List<ReservationEntity> reservations = reservationService.getAllReservations();

        if (reservations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(reservations);
        }
    }

    @GetMapping("/getReservationByid/{id_reservation}")
    public ResponseEntity<ReservationEntity> findReservationById(@PathVariable Long id_reservation) {

        ReservationEntity reservation = reservationService.findReservationById(id_reservation);

        if (reservation != null) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteReservation/{id_reservation}")
    public ResponseEntity<ReservationEntity> deleteReservation(@PathVariable Long id_reservation) {

        ReservationEntity reservation = reservationService.findReservationById(id_reservation);

        if (reservation != null) {
            reservationService.deleteReservation(id_reservation);
            return ResponseEntity.status(HttpStatus.OK).body(reservation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/createReservation/{id_workspace}/{id_user}")
    public ResponseEntity<?> createReservation(@PathVariable Long id_workspace, @PathVariable Long id_user, @RequestBody ReservationRequestDTO reservationRequestDTO) {

        try {
            ReservationEntity reservation = reservationService.createReservation(
                    id_workspace, id_user, reservationRequestDTO.getStartTime(), reservationRequestDTO.getEndTime(),
                    reservationRequestDTO.getNumberOfPeople());
            return new ResponseEntity<>(reservation, HttpStatus.CREATED);

        } catch (InvalidTimeException | OutsideOperatingHoursException e) {
            return new ResponseEntity<>(new MyException(e.getMessage()), HttpStatus.BAD_REQUEST);
//        } catch (OverlappingReservationException e) {
//            return new ResponseEntity<>(new MyException(e.getMessage()), HttpStatus.CONFLICT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new MyException(e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (CapacityException e) {
            return new ResponseEntity<>(new MyException(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(new MyException(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getReservationsByUser/{id_user}")
    public ResponseEntity<List<ReservationEntity>> getReservationsByUser(@PathVariable Long id_user) {

        List<ReservationEntity> reservations = reservationService.getReservationsByUser(id_user);

        if (reservations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(reservations);
        }
    }

//    @GetMapping("/availability")
//    public boolean checkAvailability(@RequestParam Long id_workspace, @RequestParam String startTime, @RequestParam String endTime) {
//
//        LocalDateTime start = LocalDateTime.parse(startTime);
//        LocalDateTime end = LocalDateTime.parse(endTime);
//
//        return reservationService.isAvailable(id_workspace, start, end);
//    }
}