package com.back.petshop.repository;

import com.back.petshop.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    List<Tutor> findByClinicaId(Long clinicaId);
}
