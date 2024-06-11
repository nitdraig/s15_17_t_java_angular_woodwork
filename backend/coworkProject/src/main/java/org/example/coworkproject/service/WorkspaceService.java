package org.example.coworkproject.service;

import io.jsonwebtoken.io.IOException;
import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.QualitiesResponseDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface WorkspaceService {
    List<WorkspaceResponseDTO> getAllWorkspaces();

    WorkspaceResponseDTO getWorkspaceById(Long id);

    WorkspaceResponseDTO addQualityToWorkspace(Long id_workspace, Long idQuality);
    WorkspaceResponseDTO removeQualityFromWorkspace(Long id_workspace, Long id_quality);
    WorkspaceResponseDTO createWorkspace(WorkspaceRequestDTO workspaceRequestDTO);
    WorkspaceResponseDTO updateWorkspace(Long id, WorkspaceRequestDTO updatedWorkspaceRequestDTO);
    WorkspaceResponseDTO addImages(Long id_workspace, List<MultipartFile> images) throws IOException;
    WorkspaceResponseDTO addMainImage(Long id_workspace, MultipartFile mainImage) throws IOException;
    WorkspaceResponseDTO deleteWorkspace(Long id);
    List<QualitiesResponseDTO> getQualitiesByWorkspace(Long id_workspace);
}
