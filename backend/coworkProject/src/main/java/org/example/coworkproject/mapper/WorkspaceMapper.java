package org.example.coworkproject.mapper;

import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface WorkspaceMapper {

    WorkspaceResponseDTO workspaceToWorkspaceResponseDTO(WorkspaceEntity workspace);

    WorkspaceEntity workspaceRequestDTOToWorkspace(WorkspaceRequestDTO workspaceRequestDTO);

    List<WorkspaceEntity> workspacesResponseDTOToWorkspaces(List<WorkspaceResponseDTO> workspacesResponseDTO);

    List<WorkspaceResponseDTO> workspacesToWorkspacesResponseDTO(List<WorkspaceEntity> workspaces);
}
