package org.example.coworkproject.service.impl;

import org.example.coworkproject.dto.response.UserResponseDTO;
import org.example.coworkproject.entity.UserEntity;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.mapper.UserMapper;
import org.example.coworkproject.repository.UserRepository;
import org.example.coworkproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO changeUserPassword(Long id_user, String password) throws MyException {

        validatePassword(password);

        UserEntity user = userRepository.findById(id_user).orElse(null);

        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                System.out.println("New password must be different from the old one.");
                return null;
            }

            String newPasswordEncoded = passwordEncoder.encode(password);
            user.setPassword(newPasswordEncoded);

            UserEntity savedUser = userRepository.save(user);

            return userMapper.userToUserResponseDTO(savedUser);
        } else {
            return null;
        }
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        List<UserEntity> users = userRepository.findAll();
        return userMapper.toUserResponseListDTO(users);
    }

    @Override
    public UserResponseDTO findUserById(Long id_user) {

        UserEntity user = userRepository.findById(id_user).orElse(null);

        if (user != null) {
            return userMapper.userToUserResponseDTO(user);
        } else {
            System.out.println("It wasn't possible to find a user with the ID: " + id_user);
            return null;
        }
    }


    /*
    Este método tal vez cambiaría un poco si se relaciona
    con la entidad Images.
     */
    @Override
    public UserResponseDTO deleteUser(Long id_user) {

        UserEntity user = userRepository.findById(id_user).orElse(null);

        if (user != null) {
            userRepository.delete(user);
            return userMapper.userToUserResponseDTO(user);
        } else {
            System.out.println("It wasn't possible to find a user with the ID: " + id_user);
            return null;
        }
    }

    public void validatePassword(CharSequence password) throws MyException {
        if (password == null || password.toString().trim().isEmpty()) {
            throw new MyException("Password can't be null or empty.");
        }
    }
}