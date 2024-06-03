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


    public Image save(MultipartFile mpf) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(mpf.getInputStream());
        if(bufferedImage != null){
            Map result = cloudinaryHelper.upload(mpf);
            Image image = new Image();
            image.builder()
                    .name((String) result.get("original_filename"))
                    .imageUrl((String) result.get("url"))
                    .cloudinaryId((String) result.get("public_id"))
                    .build();

            imageRepository.save(image);

            return image;
        }
        return null;
    }

    public void remove(Long id) throws IOException {
        Image image = imageRepository.findById(id).get();
        if(image == null){
            return;
        }
        cloudinaryHelper.delete(image.getCloudinaryId());
        imageRepository.deleteById(id);
    }
}
