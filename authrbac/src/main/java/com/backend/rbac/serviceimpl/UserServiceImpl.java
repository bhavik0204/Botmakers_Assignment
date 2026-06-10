package com.backend.rbac.serviceimpl;
import com.backend.rbac.mapper.*; 
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.rbac.dto.UserResponseDto;
import com.backend.rbac.entity.User;
import com.backend.rbac.exception.ResourceNotFoundException;
import com.backend.rbac.mapper.UserMapper;
import com.backend.rbac.repository.UserRepository;
import com.backend.rbac.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public List<UserResponseDto> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
    }

    @Override
    public UserResponseDto getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + id));

        return userMapper.toDto(user);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + id));

        userRepository.delete(user);
    }
}
