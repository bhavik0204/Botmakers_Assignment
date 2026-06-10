package com.backend.rbac.service;

import java.util.List;

import com.backend.rbac.dto.UserResponseDto;

public interface UserService {

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(Long id);

    void deleteUser(Long id);
}
