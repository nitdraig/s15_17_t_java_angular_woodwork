package org.example.coworkproject.service.impl;

import org.example.coworkproject.dto.request.ReservationRequestDTO;
import org.example.coworkproject.entity.ReservationsEntity;
import org.example.coworkproject.entity.UserEntity;
import org.example.coworkproject.repository.ReservationsRepository;
import org.example.coworkproject.repository.UserRepository;
import org.example.coworkproject.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationsServiceImpl implements ReservationsService {

    @Autowired
    private ReservationsRepository reservationsRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ReservationsEntity> getAllReservations() {
        return reservationsRepository.findAll();
    }

    public ReservationsEntity createReservation(ReservationRequestDTO reservation, Long idUser){
        ReservationsEntity newReservation = new ReservationsEntity();
        UserEntity user = userRepository.findById(idUser).orElse(null);

        newReservation.setInitDate(reservation.getInitDate());
        newReservation.setEndDate(reservation.getEndDate());
        newReservation.setInitHour(reservation.getInitHour());
        newReservation.setEndHour(reservation.getEndHour());
        newReservation.setAmountOfPeople(reservation.getAmountOfPeople());
        newReservation.setPrice(reservation.getPrice());
        newReservation.setUser(user);

        return reservationsRepository.save(newReservation);
    }

}
