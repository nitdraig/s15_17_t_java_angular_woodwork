package org.example.coworkproject.service;


import org.example.coworkproject.dto.response.UserResponseDTO;
import org.example.coworkproject.exception.MyException;

import java.util.List;

public interface UserService {

    UserResponseDTO changeUserPassword(Long id_user, String password) throws MyException;
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO findUserById(Long id_user);
    UserResponseDTO deleteUser(Long id_user);
}
