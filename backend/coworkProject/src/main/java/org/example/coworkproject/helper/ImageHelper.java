package org.example.coworkproject.helper;

import lombok.AllArgsConstructor;
import org.example.coworkproject.entity.Image;
import org.example.coworkproject.repository.ImageRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

@Component
@AllArgsConstructor
public class ImageHelper  {

    private final CloudinaryHelper cloudinaryHelper;

    private final ImageRepository imageRepository;


    public String save(MultipartFile mpf){
        if(isImageNotNull(mpf)){
            try {
                BufferedImage bufferedImage = ImageIO.read(mpf.getInputStream());
                Map result = cloudinaryHelper.upload(mpf);
                return result.get("url").toString();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            //TODO: retornar una imagen por defecto
            return "No hay imagen disponible";
        }

    }

    public void remove(Long id) throws IOException {
        Image image = imageRepository.findById(id).get();
        if(image == null){
            return;
        }
        cloudinaryHelper.delete(image.getCloudinaryId());
        imageRepository.deleteById(id);
    }

    private boolean isImageNotNull(MultipartFile mpf) {
        return mpf != null && !mpf.isEmpty();
    }
}
