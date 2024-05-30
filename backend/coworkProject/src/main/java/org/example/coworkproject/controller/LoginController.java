package org.example.coworkproject.controller;

import jakarta.validation.Valid;
import org.example.coworkproject.dto.request.LoginRequestDTO;
import org.example.coworkproject.dto.response.LoginResponseDTO;
import org.example.coworkproject.dto.response.RegisterResponseDTO;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/auth/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO requestDTO) throws MyException {

        LoginResponseDTO loginResponseDTO = loginService.login(requestDTO);

        if (loginResponseDTO == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect credentials or user not found");
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .header("Authorization", "Bearer" + loginResponseDTO.getToken())
                    .body(loginResponseDTO);
        }
    }
}