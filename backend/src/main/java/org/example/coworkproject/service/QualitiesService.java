package org.example.coworkproject.service;

import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.repository.QualitiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QualitiesService {
    private final QualitiesRepository qualitiesRepository;

    public QualitiesService(QualitiesRepository qualitiesRepository) {
        this.qualitiesRepository = qualitiesRepository;
    }

    public List<QualitiesEntity> getAll() {
        return qualitiesRepository.findAll();
    }

    public QualitiesEntity getById(Long id) {
        return qualitiesRepository.findById(id).orElse(null);
    }

    public QualitiesEntity create(QualitiesEntity body){
        return qualitiesRepository.save(body);
    }

    public Optional<QualitiesEntity> update(Long id, QualitiesEntity updatedQuality) {
        return qualitiesRepository.findById(id).map(existingQuality -> {
            existingQuality.setNombre(updatedQuality.getNombre());
            return qualitiesRepository.save(existingQuality);
        });
    }

    public QualitiesEntity delete(Long id) {
        Optional<QualitiesEntity> quality = qualitiesRepository.findById(id);
        if (quality.isPresent()) {
            qualitiesRepository.delete(quality.get());
            return quality.get();
        }
        return null;
    }

}
