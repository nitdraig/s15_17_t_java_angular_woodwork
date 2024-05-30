package org.example.coworkproject.service.impl;

import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.mapper.WorkspaceMapper;
import org.example.coworkproject.repository.QualitiesRepository;
import org.example.coworkproject.repository.WorkspaceRepository;
import org.example.coworkproject.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private QualitiesRepository qualitiesRepository;

    @Autowired
    private WorkspaceMapper workspaceMapper;

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
    public WorkspaceResponseDTO addQualityToWorkspace(Long id_workspace, Long id_quality){

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);
        QualitiesEntity quality = qualitiesRepository.findById(id_quality).orElse(null);

        if(workspace != null && quality != null) {
            if (!workspace.getQualities().contains(quality)){
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
    public WorkspaceResponseDTO createWorkspace(WorkspaceRequestDTO workspaceRequestDTO){

        WorkspaceEntity workspace = workspaceMapper.workspaceRequestDTOToWorkspace(workspaceRequestDTO);
        WorkspaceEntity createdWorkspace = workspaceRepository.save(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(createdWorkspace);
    }

    @Override
    public WorkspaceResponseDTO updateWorkspace(Long id_workspace, WorkspaceRequestDTO updatedWorkspaceRequestDTO) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);

        workspace.setPricePerHour(updatedWorkspaceRequestDTO.getPricePerHour());
        workspace.setDays(updatedWorkspaceRequestDTO.getDays());
        workspace.setAddress(updatedWorkspaceRequestDTO.getAddress());
        workspace.setWorkspaceName(updatedWorkspaceRequestDTO.getWorkspaceName());
        workspace.setDescription(updatedWorkspaceRequestDTO.getDescription());
        workspace.setStartTime(updatedWorkspaceRequestDTO.getStartTime());
        workspace.setEndTime(updatedWorkspaceRequestDTO.getEndTime());

        workspaceRepository.save(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }

    @Override
    public WorkspaceResponseDTO deleteWorkspace(Long id_workspace) {

        WorkspaceEntity workspace = workspaceRepository.findById(id_workspace).orElse(null);

        workspaceRepository.delete(workspace);

        return workspaceMapper.workspaceToWorkspaceResponseDTO(workspace);
    }
}
