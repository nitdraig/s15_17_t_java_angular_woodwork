package org.example.coworkproject.controller;

import org.example.coworkproject.entity.WorkspaceEntity;
import org.example.coworkproject.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/v1/workspaces")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    @GetMapping
    public ResponseEntity<List<WorkspaceEntity>> getAll() {
        List<WorkspaceEntity> workspaces = workspaceService.getAll();
        return new ResponseEntity<>(workspaces, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkspaceEntity> getById(@PathVariable Long id) {
        WorkspaceEntity workspace = workspaceService.getById(id);
        if(workspace != null){
            return ResponseEntity.ok().body(workspace);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<WorkspaceEntity> create(@RequestBody WorkspaceEntity body) {
        System.out.println("Request Body: " + body);
        WorkspaceEntity workspace = workspaceService.create(body);
        return ResponseEntity.ok(workspace);
    }

    @PostMapping("/add-quality-to-workspace/{idWorkspace}/{idQuality}")
    public ResponseEntity<WorkspaceEntity> addQualityToWorkspace(@PathVariable Long idWorkspace, @PathVariable Long idQuality) {
        WorkspaceEntity workspace = workspaceService.addQualityToWorkspace(idWorkspace, idQuality);
        if(workspace != null){
            return ResponseEntity.ok(workspace);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkspaceEntity> update(@PathVariable Long id, @RequestBody WorkspaceEntity workspace) {
        WorkspaceEntity workspaceUpd = workspaceService.update(id, workspace).orElse(null);

        if (workspaceUpd != null) {
            return ResponseEntity.ok().body(workspaceUpd);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WorkspaceEntity> delete(@PathVariable Long id) {
        WorkspaceEntity workspace = workspaceService.delete(id);

        if(workspace != null){
            return ResponseEntity.ok().body(workspace);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
