package org.example.coworkproject.service;

import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.repository.QualitiesRepository;
import org.example.coworkproject.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private QualitiesRepository qualitiesRepository;

    public List<WorkspaceEntity> getAll() {
        return workspaceRepository.findAll();
    }

    public WorkspaceEntity getById(Long id) {
        return workspaceRepository.findById(id).orElse(null);
    }

    public WorkspaceEntity addQualityToWorkspace(Long idWorkspace, Long idQuality){
        WorkspaceEntity workspace = workspaceRepository.findById(idWorkspace).orElse(null);
        QualitiesEntity quality = qualitiesRepository.findById(idQuality).orElse(null);

        if(workspace != null && quality != null){
            if(!workspace.getQualities().contains(quality)){
                workspace.getQualities().add(quality);
                quality.getWorkspaces().add(workspace);
                workspaceRepository.save(workspace);
                qualitiesRepository.save(quality);

                return workspace;
            }

            return null;
        }
        return null;
    }

    public WorkspaceEntity create(WorkspaceEntity body){
        return workspaceRepository.save(body);
    }

    public Optional<WorkspaceEntity> update(Long id, WorkspaceEntity updatedQuality) {
        return workspaceRepository.findById(id).map(existingWorkspace -> {
            existingWorkspace.setCity(updatedQuality.getCity());
            existingWorkspace.setCountry(updatedQuality.getCountry());
            existingWorkspace.setIsPublic(updatedQuality.getIsPublic());
            existingWorkspace.setAddress(updatedQuality.getAddress());
            existingWorkspace.setPrice(updatedQuality.getPrice());
            return workspaceRepository.save(existingWorkspace);
        });
    }

    public WorkspaceEntity delete(Long id) {
        Optional<WorkspaceEntity> workspace = workspaceRepository.findById(id);
        if (workspace.isPresent()) {
            workspaceRepository.delete(workspace.get());
            return workspace.get();
        }
        return null;
    }
}
