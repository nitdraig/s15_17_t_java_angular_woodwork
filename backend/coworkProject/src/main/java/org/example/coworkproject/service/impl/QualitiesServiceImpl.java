package org.example.coworkproject.service.impl;

import org.example.coworkproject.dto.request.QualitiesRequestDTO;
import org.example.coworkproject.dto.response.QualitiesResponseDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.mapper.QualitiesMapper;
import org.example.coworkproject.mapper.WorkspaceMapper;
import org.example.coworkproject.repository.QualitiesRepository;
import org.example.coworkproject.service.QualitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QualitiesServiceImpl implements QualitiesService {

    @Autowired
    private QualitiesRepository qualitiesRepository;

    @Autowired
    private QualitiesMapper qualitiesMapper;

    @Autowired
    private WorkspaceMapper workspaceMapper;

    @Override
    public List<QualitiesResponseDTO> getAllQualities() {

        List<QualitiesEntity> qualities = qualitiesRepository.findAll();
        return qualitiesMapper.qualitiesToQualitiesResponseDTO(qualities);
    }

    @Override
    public QualitiesResponseDTO getQualityById(Long id_qualities) {

        QualitiesEntity quality = qualitiesRepository.findById(id_qualities).orElse(null);
        return qualitiesMapper.qualityToQualityResponseDTO(quality);
    }

    @Override
    public QualitiesResponseDTO createQuality(QualitiesRequestDTO qualitiesRequestDTO){

        QualitiesEntity quality = qualitiesMapper.qualityRequestDTOToQuality(qualitiesRequestDTO);
        QualitiesEntity createdQuality = qualitiesRepository.save(quality);

        return qualitiesMapper.qualityToQualityResponseDTO(createdQuality);
    }

    @Override
    public QualitiesResponseDTO updateQuality(Long id_qualities, QualitiesRequestDTO updatedQualityRequestDTO) {

        QualitiesEntity quality = qualitiesRepository.findById(id_qualities).orElse(null);

        quality.setQualityName(updatedQualityRequestDTO.getQualityName());
        quality.setActive(updatedQualityRequestDTO.isActive());

        qualitiesRepository.save(quality);

        return qualitiesMapper.qualityToQualityResponseDTO(quality);
    }

    @Override
    public QualitiesResponseDTO deleteQuality(Long id_qualities) {

        QualitiesEntity quality = qualitiesRepository.findById(id_qualities).orElse(null);
        qualitiesRepository.delete(quality);

        return qualitiesMapper.qualityToQualityResponseDTO(quality);
    }

    @Override
    public List<WorkspaceResponseDTO> getWorkspacesByQuality(Long id_quality) {

        List<WorkspaceEntity> workspaces = qualitiesRepository.findById(id_quality).get().getWorkspaces();
        return workspaceMapper.workspacesToWorkspacesResponseDTO(workspaces);
    }

}
