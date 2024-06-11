package org.example.coworkproject.service.impl;

import io.jsonwebtoken.io.IOException;
import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.QualitiesResponseDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.entity.ReservationEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.helper.ImageHelper;
import org.example.coworkproject.mapper.QualitiesMapper;
import org.example.coworkproject.mapper.WorkspaceMapper;
import org.example.coworkproject.repository.QualitiesRepository;
import org.example.coworkproject.repository.WorkspaceRepository;
import org.example.coworkproject.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private QualitiesRepository qualitiesRepository;

    @Autowired
    private WorkspaceMapper workspaceMapper;

    @Autowired
    private ImageHelper imageHelper;

    @Autowired
    private QualitiesMapper qualitiesMapper;

    @Override
    public List<WorkspaceResponseDTO> getAllWorkspaces() {

        List<WorkspaceEntity> workspaces = workspaceRepository.findAll();

        return workspaceMapper.workspacesToWorkspacesResponseDTO(workspaces);
    }

    @Override
    public WorkspaceResponseDTO getWorkspaceById(Long id_workspace) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);
        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }

    @Override
    public WorkspaceResponseDTO addQualityToWorkspace(Long id_workspace, Long id_quality) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);
        QualitiesEntity quality = qualitiesRepository.findById(id_quality).orElse(null);

        if (workspace != null && quality != null) {
            if (!workspace.getQualities().contains(quality)) {
                workspace.getQualities().add(quality);
                quality.getWorkspaces().add(workspace);
                workspaceRepository.save(workspace);
                qualitiesRepository.save(quality);

                return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
            }

            return null;
        }
        return null;
    }

    @Override
    public WorkspaceResponseDTO removeQualityFromWorkspace(Long id_workspace, Long id_quality) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);
        QualitiesEntity quality = qualitiesRepository.findById(id_quality).orElse(null);

        if (workspace != null && quality != null) {
            workspace.getQualities().remove(quality);
            quality.getWorkspaces().remove(workspace);

            workspaceRepository.save(workspace);
            qualitiesRepository.save(quality);

            return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
        } else {
            return null;
        }
    }

    @Override
    public WorkspaceResponseDTO createWorkspace(WorkspaceRequestDTO workspaceRequestDTO) {

        WorkspaceEntity workspace = workspaceMapper.workspaceRequestDTOToWorkspace(workspaceRequestDTO);
        WorkspaceEntity createdWorkspace = workspaceRepository.save(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(createdWorkspace);
    }

    @Override
    public WorkspaceResponseDTO updateWorkspace(Long id_workspace, WorkspaceRequestDTO updatedWorkspaceRequestDTO) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);

        workspace.setPricePerHour(updatedWorkspaceRequestDTO.getPricePerHour());
        workspace.setOpenDays(updatedWorkspaceRequestDTO.getOpenDays());
        workspace.setAddress(updatedWorkspaceRequestDTO.getAddress());
        workspace.setWorkspaceName(updatedWorkspaceRequestDTO.getWorkspaceName());
        workspace.setDescription(updatedWorkspaceRequestDTO.getDescription());
        workspace.setOpeningTime(updatedWorkspaceRequestDTO.getOpeningTime());
        workspace.setClosingTime(updatedWorkspaceRequestDTO.getClosingTime());
        workspace.setCapacity(updatedWorkspaceRequestDTO.getCapacity());

        workspaceRepository.save(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }

    @Override
    public WorkspaceResponseDTO addImages(Long id_workspace, List<MultipartFile> images) throws IOException {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace)
                .orElseThrow(() -> new RuntimeException("Workspace not found"));

        for (MultipartFile image : images) {
            try {
                String imageUrl = imageHelper.save(image);
                workspace.getWorkspaceImages().add(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }

        workspaceRepository.save(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }


    @Override
    public WorkspaceResponseDTO addMainImage(Long id_workspace, MultipartFile mainImage) throws IOException {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace)
                .orElseThrow(() -> new RuntimeException("Workspace not found"));

        try {
            String imageUrl = imageHelper.save(mainImage);
            workspace.setMainImage(imageUrl);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }

        workspaceRepository.save(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }

    @Transactional
    @Override
    public WorkspaceResponseDTO deleteWorkspace(Long id_workspace) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);

        if (workspace != null) {
            // Desasociar todas las reservas relacionadas
            for (ReservationEntity reservation : workspace.getReservations()) {
                reservation.setWorkspace(null);
            }
            workspace.getReservations().clear();

            // Desasociar de todas las cualidades relacionadas
            for (QualitiesEntity quality : workspace.getQualities()) {
                quality.getWorkspaces().remove(workspace);
            }
            workspace.getQualities().clear();

            // Eliminar el workspace
            workspaceRepository.delete(workspace);
        }

        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }

    @Override
    public List<QualitiesResponseDTO> getQualitiesByWorkspace(Long id_workspace) {

        List<QualitiesEntity> qualities = workspaceRepository.findById(id_workspace).get().getQualities();
        return qualitiesMapper.qualitiesToQualitiesResponseDTO(qualities);
    }
}

