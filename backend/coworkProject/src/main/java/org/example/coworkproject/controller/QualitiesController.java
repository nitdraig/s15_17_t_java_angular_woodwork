package org.example.coworkproject.controller;

import org.example.coworkproject.dto.request.QualitiesRequestDTO;
import org.example.coworkproject.dto.response.QualitiesResponseDTO;
import org.example.coworkproject.dto.response.WorkspaceResponseDTO;
import org.example.coworkproject.entity.QualitiesEntity;
import org.example.coworkproject.service.QualitiesService;
import org.example.coworkproject.service.impl.QualitiesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/v1/api/qualities")
public class QualitiesController {

    @Autowired
    private QualitiesService qualitiesService;

    @GetMapping("/listOfQualities")
    public ResponseEntity<List<QualitiesResponseDTO>> getAllQualities() {

        List<QualitiesResponseDTO> qualitiesResponseListDTO = qualitiesService.getAllQualities();

        if (qualitiesResponseListDTO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(qualitiesResponseListDTO);
        }
    }

    @GetMapping("/getQualityById/{id_qualities}")
    public ResponseEntity<QualitiesResponseDTO> findQualityById(@PathVariable Long id_qualities) {

        QualitiesResponseDTO qualitiesResponseDTO = qualitiesService.getQualityById(id_qualities);

        if(qualitiesResponseDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(qualitiesResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/createQuality")
    public ResponseEntity<QualitiesResponseDTO> createQuality(@RequestBody QualitiesRequestDTO qualitiesRequestDTO) {

        QualitiesResponseDTO qualitiesResponseDTO = qualitiesService.createQuality(qualitiesRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(qualitiesResponseDTO);
    }

    @GetMapping("/getWorkspacesByQuality/{id_quality}")
    public ResponseEntity<List<WorkspaceResponseDTO>> getWorkspacesByQuality(@PathVariable Long id_quality) {

        QualitiesResponseDTO qualitiesResponseDTO = qualitiesService.getQualityById(id_quality);

        if (qualitiesResponseDTO != null) {

            List<WorkspaceResponseDTO> workspaceResponseListDTO = qualitiesService.getWorkspacesByQuality(id_quality);

            if (workspaceResponseListDTO.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(workspaceResponseListDTO);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    @PutMapping("/updateQuality/{id_qualities}")
    public ResponseEntity<QualitiesResponseDTO> update(@PathVariable Long id_qualities, @RequestBody QualitiesRequestDTO updatedQualityRequestDTO) {

        QualitiesResponseDTO qualitiesResponseDTO = qualitiesService.updateQuality(id_qualities, updatedQualityRequestDTO);

        if(qualitiesResponseDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(qualitiesResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteQuality/{id_qualities}")
    public ResponseEntity<QualitiesResponseDTO> deleteQuality(@PathVariable Long id_qualities) {
        QualitiesResponseDTO qualitiesResponseDTO = qualitiesService.deleteQuality(id_qualities);

        if(qualitiesResponseDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(qualitiesResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}