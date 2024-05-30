package org.example.coworkproject.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Builder
public class LoginResponseDTO {

    private String token;
    private String email;
    private Long id_user;
    private String fullName;
}
