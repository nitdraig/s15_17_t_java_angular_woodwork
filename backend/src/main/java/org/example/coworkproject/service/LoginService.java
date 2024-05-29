package org.example.coworkproject.service;

import org.example.coworkproject.dto.request.LoginRequestDTO;
import org.example.coworkproject.dto.response.LoginResponseDTO;
import org.example.coworkproject.exception.MyException;

public interface LoginService {

    LoginResponseDTO login(LoginRequestDTO requestDTO) throws MyException;

}
