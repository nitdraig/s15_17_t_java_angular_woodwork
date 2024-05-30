package org.example.coworkproject.service;

import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.WorkspaceEntity;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {
    List<WorkspaceResponseDTO> getAllWorkspaces();

    WorkspaceResponseDTO getWorkspaceById(Long id);

    WorkspaceResponseDTO addQualityToWorkspace(Long id_workspace, Long idQuality);

    WorkspaceResponseDTO removeQualityFromWorkspace(Long id_workspace, Long id_quality);
    WorkspaceResponseDTO createWorkspace(WorkspaceRequestDTO workspaceRequestDTO);

    WorkspaceResponseDTO updateWorkspace(Long id, WorkspaceRequestDTO updatedWorkspaceRequestDTO);

    WorkspaceResponseDTO deleteWorkspace(Long id);
}
