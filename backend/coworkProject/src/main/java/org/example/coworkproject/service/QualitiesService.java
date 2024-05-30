package org.example.coworkproject.service;

import org.example.coworkproject.dto.request.QualitiesRequestDTO;
import org.example.coworkproject.dto.response.QualitiesResponseDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.QualitiesEntity;

import java.util.List;
import java.util.Optional;

public interface QualitiesService {


    List<QualitiesResponseDTO> getAllQualities();

    QualitiesResponseDTO getQualityById(Long id_qualities);

    QualitiesResponseDTO createQuality(QualitiesRequestDTO qualitiesRequestDTO);

    QualitiesResponseDTO updateQuality(Long id_qualities, QualitiesRequestDTO updatedQualityRequestDTO);

    QualitiesResponseDTO deleteQuality(Long id_qualities);

    List<WorkspaceResponseDTO> getWorkspacesByQuality(Long id_quality);
}
