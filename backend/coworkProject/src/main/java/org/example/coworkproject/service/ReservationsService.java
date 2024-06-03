package org.example.coworkproject.service;

import org.example.coworkproject.dto.request.ReservationRequestDTO;
import org.example.coworkproject.entity.ReservationsEntity;

import java.util.List;

public interface ReservationsService {

    List<ReservationsEntity> getAllReservations();

    ReservationsEntity createReservation(ReservationRequestDTO reservation, Long idUser);

}
