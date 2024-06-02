package org.example.coworkproject.service;

import org.example.coworkproject.entity.ReservationEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.exception.MyException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public interface ReservationService {

    boolean isAvailable(Long id_workspace, LocalDateTime startTime, LocalDateTime endTime);

    ReservationEntity createReservation(Long id_workspace, Long id_user, LocalDateTime startTime, LocalDateTime endTime, int numberOfPeople);

    double calculatePrice(WorkspaceEntity workspace, LocalDateTime startTime, LocalDateTime endTime);

    boolean isWithinOperatingHours(WorkspaceEntity workspace, LocalDateTime startTime, LocalDateTime endTime);

    List<ReservationEntity> getReservationsByUser(Long id_user);

    List<ReservationEntity> getAllReservations();

    ReservationEntity deleteReservation(Long id_reservation);

    ReservationEntity findReservationById(Long id_reservation);


}
