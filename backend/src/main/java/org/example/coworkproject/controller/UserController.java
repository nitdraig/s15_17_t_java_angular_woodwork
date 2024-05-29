package org.example.coworkproject.controller;

import org.example.coworkproject.dto.response.UserResponseDTO;
import org.example.coworkproject.exception.ExceptionMethods;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id_user}")
    public ResponseEntity<UserResponseDTO> findUserById(@PathVariable Long id_user) {

        UserResponseDTO userResponseDTO = userService.findUserById(id_user);

        if (userResponseDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/changePassword/{id_user}")
    public ResponseEntity<UserResponseDTO> changePassword(@RequestParam String password, @PathVariable Long id_user) throws MyException {

        UserResponseDTO userResponseDTO = userService.changeUserPassword(id_user, password);

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

    @DeleteMapping("/delete/{id_user}")
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