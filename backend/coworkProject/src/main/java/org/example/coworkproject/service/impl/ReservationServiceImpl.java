package org.example.coworkproject.service.impl;

import org.example.coworkproject.entity.ReservationEntity;
import org.example.coworkproject.entity.UserEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.exception.CapacityException;
import org.example.coworkproject.exception.InvalidTimeException;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.exception.OutsideOperatingHoursException;
import org.example.coworkproject.repository.ReservationRepository;
import org.example.coworkproject.repository.UserRepository;
import org.example.coworkproject.repository.WorkspaceRepository;
import org.example.coworkproject.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean isAvailable(Long id_workspace, LocalDateTime startTime, LocalDateTime endTime) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace)
                        .orElseThrow(() -> new IllegalArgumentException("It wasn't possible to find a workspace with the ID: " + id_workspace));

        List<ReservationEntity> overlappingReservations = reservationRepository.findByWorkspaceAndEndTimeAfterAndStartTimeBefore(workspace, startTime, endTime);
        return overlappingReservations.isEmpty();
    }

    @Override
    public ReservationEntity createReservation(Long id_workspace, Long id_user, LocalDateTime startTime, LocalDateTime endTime, int numberOfPeople) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace)
                .orElseThrow(() -> new IllegalArgumentException("It wasn't possible to find a workspace with the ID: " + id_workspace));

        UserEntity user = userRepository.findById(id_user)
                .orElseThrow(() -> new IllegalArgumentException("It wasn't possible to find a user with the ID: " + id_user));

        List<ReservationEntity> existingReservations = reservationRepository.findByWorkspaceAndEndTimeAfterAndStartTimeBefore(
                workspace, startTime, endTime);

        int totalPeople = existingReservations.stream().mapToInt(ReservationEntity::getNumberOfPeople).sum();

        if (totalPeople + numberOfPeople > workspace.getCapacity()) {
            throw new CapacityException("Not enough capacity for the requested number of people");
        }

        if (startTime.isAfter(endTime) || startTime.isEqual(endTime)) {
            throw new InvalidTimeException("Start time must be before end time");
        }

        if (!isWithinOperatingHours(workspace, startTime, endTime)) {
            throw new OutsideOperatingHoursException("The reservation time is outside the workspace operating hours");
        }

//        if (!isAvailable(id_workspace, startTime, endTime)) {
//            throw new OverlappingReservationException("The workspace is not available on the requested date");
//        }

        ReservationEntity reservation = new ReservationEntity(workspace, startTime, endTime, user, numberOfPeople);
        reservation.setPrice(calculatePrice(workspace, startTime, endTime));

        return reservationRepository.save(reservation);
    }

    @Override
    public double calculatePrice(WorkspaceEntity workspace, LocalDateTime startTime, LocalDateTime endTime) {
        Duration duration = Duration.between(startTime, endTime);
        long hours = duration.toHours();
        return hours * workspace.getPricePerHour();
    }

    @Override
    public boolean isWithinOperatingHours(WorkspaceEntity workspace, LocalDateTime startTime, LocalDateTime endTime) {

        Set<DayOfWeek> openDays = workspace.getOpenDays();
        LocalTime openingTime = workspace.getOpeningTime();
        LocalTime closingTime = workspace.getClosingTime();

        DayOfWeek startDay = startTime.getDayOfWeek();
        DayOfWeek endDay = endTime.getDayOfWeek();
        LocalTime startTimeOfDay = startTime.toLocalTime();
        LocalTime endTimeOfDay = endTime.toLocalTime();

        if (!openDays.contains(startDay) || !openDays.contains(endDay)) {
            return false;
        }

        if (startTimeOfDay.isBefore(openingTime) || endTimeOfDay.isAfter(closingTime)) {
            return false;
        }

        return true;
    }

    @Override
    public List<ReservationEntity> getReservationsByUser(Long id_user) {

        UserEntity user = userRepository.findById(id_user)
                .orElseThrow(() -> new IllegalArgumentException("It wasn't possible to find a user with the ID:" + id_user));

        return user.getReservations();
    }

    @Override
    public List<ReservationEntity> getAllReservations() {

        return reservationRepository.findAll();
    }

    @Override
    public ReservationEntity deleteReservation(Long id_reservation) {

        ReservationEntity reservation = reservationRepository.findById(id_reservation).orElse(null);

        if (reservation != null) {
            reservationRepository.delete(reservation);
            return reservation;
        } else {
            System.out.println("It wasn't possible to find a reservation with the ID: " + id_reservation);
            return null;
        }
    }

    @Override
    public ReservationEntity findReservationById(Long id_reservation) {

        ReservationEntity reservation = reservationRepository.findById(id_reservation).orElse(null);

        if (reservation != null) {
            return reservation;
        } else {
            System.out.println("It wasn't possible to find a reservation with the ID: " + id_reservation);
            return null;
        }
    }
}