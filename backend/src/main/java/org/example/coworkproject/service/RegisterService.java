package org.example.coworkproject.service;

import org.example.coworkproject.dto.request.RegisterRequestDTO;
import org.example.coworkproject.dto.response.RegisterResponseDTO;
import org.example.coworkproject.exception.MyException;

public interface RegisterService {

    RegisterResponseDTO register(RegisterRequestDTO requestDTO);

}
