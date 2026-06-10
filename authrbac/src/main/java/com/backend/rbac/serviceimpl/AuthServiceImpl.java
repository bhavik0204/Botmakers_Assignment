package com.backend.rbac.serviceimpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.rbac.dto.AuthResponseDto;
import com.backend.rbac.dto.LoginRequestDto;
import com.backend.rbac.dto.RegisterRequestDto;
import com.backend.rbac.entity.Role;
import com.backend.rbac.entity.User;
import com.backend.rbac.repository.RoleRepository;
import com.backend.rbac.repository.UserRepository;
import com.backend.rbac.security.JwtService;
import com.backend.rbac.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public void register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String roleName = request.getRole();
        if (roleName.startsWith("ROLE_")) {
            roleName = roleName.substring(5);
        }

        Role role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() ->
                        new RuntimeException("Role not found"));

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(
                        request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        String token = jwtService.generateToken(user);

        return new AuthResponseDto(
                token,
                user.getRole().getRoleName());
    }
}

