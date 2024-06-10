package org.example.coworkproject.controller;

import io.jsonwebtoken.io.IOException;
import jakarta.validation.Valid;
import org.example.coworkproject.dto.request.ChangePasswordRequestDTO;
import org.example.coworkproject.dto.response.UserResponseDTO;
import org.example.coworkproject.exception.ExceptionMethods;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("v1/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/listOfUsers")
    public ResponseEntity<List<UserResponseDTO>> getUsers() {

        List<UserResponseDTO> userResponseListDTO = userService.getAllUsers();

        if (userResponseListDTO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(userResponseListDTO);
        }
    }

    @GetMapping("/getUserById/{id_user}")
    public ResponseEntity<UserResponseDTO> findUserById(@PathVariable Long id_user) {

        UserResponseDTO userResponseDTO = userService.findUserById(id_user);

        if (userResponseDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/changeUserPassword/{id_user}")
    public ResponseEntity<UserResponseDTO> changePassword(@Valid @RequestBody ChangePasswordRequestDTO changePasswordRequestDTO, @PathVariable Long id_user) throws MyException {

        UserResponseDTO userResponseDTO = userService.changeUserPassword(id_user, changePasswordRequestDTO);
        String password = changePasswordRequestDTO.getPassword();

        if (password == null || ExceptionMethods.onlySpaces(password)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            if (userResponseDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
            }
        }
    }

    @PutMapping("/updateUser/{id_user}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id_user, @RequestParam String fullName, @RequestParam MultipartFile profilePicture) {

        try {
            UserResponseDTO updatedUser = userService.updateUser(id_user, fullName, profilePicture);
            return ResponseEntity.ok(updatedUser);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/deleteUser/{id_user}")
    public ResponseEntity<UserResponseDTO> deleteUser(@PathVariable Long id_user) {

        UserResponseDTO userResponseDTO = userService.findUserById(id_user);

        if (userResponseDTO != null) {
            userService.deleteUser(id_user);
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}