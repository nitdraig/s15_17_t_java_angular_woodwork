package org.example.coworkproject.controller;

import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.service.QualitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/v1/qualities")
public class QualitiesController {
    @Autowired
    private QualitiesService qualitiesService;

    @GetMapping
    public ResponseEntity<List<QualitiesEntity>> getAllQualities() {
        List<QualitiesEntity> qualities = qualitiesService.getAll();
        return new ResponseEntity<>(qualities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QualitiesEntity> getById(@PathVariable Long id) {
        QualitiesEntity quality = qualitiesService.getById(id);
        if(quality != null){
            return ResponseEntity.ok().body(quality);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<QualitiesEntity> create(@RequestBody QualitiesEntity body) {
        QualitiesEntity quality = qualitiesService.create(body);
        return ResponseEntity.ok(quality);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QualitiesEntity> update(@PathVariable Long id, @RequestBody QualitiesEntity workspace) {
        QualitiesEntity qualityUpd = qualitiesService.update(id, workspace).orElse(null);

        if (qualityUpd != null) {
            return ResponseEntity.ok().body(qualityUpd);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<QualitiesEntity> delete(@PathVariable Long id) {
        QualitiesEntity quality = qualitiesService.delete(id);

        if(quality != null){
            return ResponseEntity.ok().body(quality);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
