package org.example.coworkproject.repository;

import org.example.coworkproject.entity.ReservationsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationsRepository extends JpaRepository<ReservationsEntity, Long> {
}
