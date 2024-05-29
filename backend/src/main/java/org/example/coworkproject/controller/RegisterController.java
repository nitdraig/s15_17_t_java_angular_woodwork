package org.example.coworkproject.controller;

import jakarta.validation.Valid;
import org.example.coworkproject.dto.request.RegisterRequestDTO;
import org.example.coworkproject.dto.response.RegisterResponseDTO;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/api/auth/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping()
    public ResponseEntity<RegisterResponseDTO> register(@Valid @RequestBody RegisterRequestDTO requestDTO) throws MyException {

        RegisterResponseDTO registerResponseDTO = registerService.register(requestDTO);

        if (registerResponseDTO == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(registerResponseDTO);
        }
    }
}
