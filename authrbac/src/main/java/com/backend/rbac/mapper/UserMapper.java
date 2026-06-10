package com.backend.rbac.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.backend.rbac.dto.UserResponseDto;
import com.backend.rbac.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "role.roleName", target = "role")
    UserResponseDto toDto(User user);
}

