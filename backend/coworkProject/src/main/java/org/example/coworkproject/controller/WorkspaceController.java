package org.example.coworkproject.controller;

import org.example.coworkproject.dto.request.WorkspaceRequestDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/v1/api/workspace")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    @GetMapping("/listOfWorkspaces")
    public ResponseEntity<List<WorkspaceResponseDTO>> getAllWorkspaces() {

        List<WorkspaceResponseDTO> workspaceResponseListDTO = workspaceService.getAllWorkspaces();

        if (workspaceResponseListDTO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseListDTO);
        }
    }

    @GetMapping("getWorkspaceById/{id_workspace}")
    public ResponseEntity<WorkspaceResponseDTO> findWorkspaceById(@PathVariable Long id_workspace) {

        WorkspaceResponseDTO workspaceResponseDTO = workspaceService.getWorkspaceById(id_workspace);
        if(workspaceResponseDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/createWorkspace")
    public ResponseEntity<WorkspaceResponseDTO> create(@RequestBody WorkspaceRequestDTO workspaceRequestDTO) {

        WorkspaceResponseDTO workspaceResponseDTO = workspaceService.createWorkspace(workspaceRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(workspaceResponseDTO);
    }

    @PostMapping("/addQualityToWorkspace/{id_workspace}/{id_quality}")
    public ResponseEntity<WorkspaceResponseDTO> addQualityToWorkspace(@PathVariable Long id_workspace, @PathVariable Long id_quality) {

        WorkspaceResponseDTO workspaceResponseDTO = workspaceService.addQualityToWorkspace(id_workspace, id_quality);

        if(workspaceResponseDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/removeQualityFromWorkspace/{id_workspace}/{id_quality}")
    public ResponseEntity<WorkspaceResponseDTO> removeQualityFromWorkspace(@PathVariable Long id_workspace, @PathVariable Long id_quality) {

        WorkspaceResponseDTO workspaceResponseDTO = workspaceService.removeQualityFromWorkspace(id_workspace, id_quality);

        if (workspaceResponseDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @PutMapping("/updateWorkspace/{id_workspace}")
    public ResponseEntity<WorkspaceResponseDTO> update(@PathVariable Long id_workspace, @RequestBody WorkspaceRequestDTO updatedWorkspaceRequestDTO) {

        WorkspaceResponseDTO workspaceResponseDTO = workspaceService.updateWorkspace(id_workspace, updatedWorkspaceRequestDTO);

        if(workspaceResponseDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteWorkspace/{id_workspace}")
    public ResponseEntity<WorkspaceResponseDTO> deleteWorkspace(@PathVariable Long id_workspace) {

        WorkspaceResponseDTO workspaceResponseDTO = workspaceService.deleteWorkspace(id_workspace);

        if (workspaceResponseDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}