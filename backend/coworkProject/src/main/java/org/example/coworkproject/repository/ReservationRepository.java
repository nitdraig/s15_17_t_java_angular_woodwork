package org.example.coworkproject.repository;

import org.example.coworkproject.entity.ReservationEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Long> {

    List<ReservationEntity> findByWorkspaceAndEndTimeAfterAndStartTimeBefore(WorkspaceEntity workspace, LocalDateTime endTime, LocalDateTime startTime);
}
