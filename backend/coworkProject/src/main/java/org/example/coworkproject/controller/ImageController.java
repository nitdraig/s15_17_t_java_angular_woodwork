package org.example.coworkproject.controller;


import org.example.coworkproject.helper.ImageHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageHelper imageHelper;

    public ImageController(ImageHelper imageHelper) {
        this.imageHelper = imageHelper;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam MultipartFile image) throws IOException {
        if(imageHelper.save(image) != null) {
            return ResponseEntity.ok("Imagen guardada exitosamente");
        }
        return ResponseEntity.badRequest().body("No se pudo subir la imagen");
    }

}
