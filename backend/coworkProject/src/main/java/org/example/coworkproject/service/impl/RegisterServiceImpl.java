package org.example.coworkproject.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.coworkproject.configuration.security.jwt.JwtService;
import org.example.coworkproject.dto.request.RegisterRequestDTO;
import org.example.coworkproject.dto.response.RegisterResponseDTO;
import org.example.coworkproject.entity.UserEntity;
import org.example.coworkproject.exception.ExceptionMethods;
import org.example.coworkproject.exception.InvalidPasswordException;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.repository.UserRepository;
import org.example.coworkproject.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @Override
    public RegisterResponseDTO register(RegisterRequestDTO requestDTO) {

        if (userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new IllegalArgumentException("There is already a user registered with the email: " + requestDTO.getEmail());
        }

        if (requestDTO.getEmail() == null || ExceptionMethods.onlySpaces(requestDTO.getEmail())) {
            System.out.println("Email can't be null or empty.");
            return null;
        }

        if (requestDTO.getPassword() == null || ExceptionMethods.onlySpaces(requestDTO.getPassword())) {
            System.out.println("Password can't be null or empty.");
            return null;
        }

        if (requestDTO.getFullName() == null || ExceptionMethods.onlySpaces(requestDTO.getFullName())) {
            System.out.println("Name can't be null or empty.");
            return null;
        }

        var user = UserEntity.builder()
                .email(requestDTO.getEmail())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .fullName(requestDTO.getFullName())
                .profilePicture(requestDTO.getProfilePicture())
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        Long id = user.getId_user();
        String email = user.getEmail();
        String fullName = user.getFullName();

        return RegisterResponseDTO.builder()
                .id(id)
                .fullName(fullName)
                .token(jwtToken)
                .email(email)
                .build();
    }
}
