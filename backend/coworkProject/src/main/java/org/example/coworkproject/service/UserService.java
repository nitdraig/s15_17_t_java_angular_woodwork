package org.example.coworkproject.service;


import org.example.coworkproject.dto.request.ChangePasswordRequestDTO;
import org.example.coworkproject.dto.response.UserResponseDTO;
import org.example.coworkproject.exception.MyException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    UserResponseDTO changeUserPassword(Long id_user, ChangePasswordRequestDTO changePasswordRequestDTO) throws MyException;
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO findUserById(Long id_user);
    UserResponseDTO updateUser(Long id_user, String fullName, MultipartFile profilePicture);
    UserResponseDTO deleteUser(Long id_user);
}
