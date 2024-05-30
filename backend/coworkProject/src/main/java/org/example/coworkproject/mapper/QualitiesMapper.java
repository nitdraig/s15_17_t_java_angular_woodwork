package org.example.coworkproject.mapper;

import org.example.coworkproject.dto.request.QualitiesRequestDTO;
import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.QualitiesResponseDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface QualitiesMapper {

    QualitiesResponseDTO qualityToQualityResponseDTO(QualitiesEntity quality);

    QualitiesEntity qualityRequestDTOToQuality(QualitiesRequestDTO qualityRequestDTO);

    List<QualitiesEntity> qualitiesResponseDTOToQualities(List<QualitiesResponseDTO> qualitiesResponseDTO);

    List<QualitiesResponseDTO> qualitiesToQualitiesResponseDTO(List<QualitiesEntity> qualities);

}
