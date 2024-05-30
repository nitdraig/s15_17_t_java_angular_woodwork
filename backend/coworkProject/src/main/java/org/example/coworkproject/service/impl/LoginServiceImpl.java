package org.example.coworkproject.service.impl;

import org.example.coworkproject.configuration.security.jwt.JwtService;
import org.example.coworkproject.dto.request.LoginRequestDTO;
import org.example.coworkproject.dto.response.LoginResponseDTO;
import org.example.coworkproject.exception.MyException;
import org.example.coworkproject.repository.UserRepository;
import org.example.coworkproject.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginResponseDTO login(LoginRequestDTO requestDTO) throws MyException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestDTO.getEmail(),
                            requestDTO.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            System.out.println("Bad credentials for email: " + requestDTO.getEmail());
            return null;
        }

        var user = userRepository.findUserByEmail(requestDTO.getEmail())
                .orElseThrow(() -> new MyException("User not found"));

        var jwtToken = jwtService.generateToken(user);

        return LoginResponseDTO.builder()
                .email(user.getEmail())
                .id_user(user.getId_user())
                .token(jwtToken)
                .fullName(user.getFullName())
                .build();
    }
}
