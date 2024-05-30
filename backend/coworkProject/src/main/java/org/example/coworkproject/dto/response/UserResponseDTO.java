package org.example.coworkproject.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponseDTO {

    private long id_user;
    private String email;
    private String fullName;
    private String profilePicture;
}