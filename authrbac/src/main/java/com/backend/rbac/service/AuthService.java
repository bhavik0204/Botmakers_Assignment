package com.backend.rbac.service;

import com.backend.rbac.dto.AuthResponseDto;
import com.backend.rbac.dto.LoginRequestDto;
import com.backend.rbac.dto.RegisterRequestDto;

public interface AuthService {

    void register(RegisterRequestDto request);

    AuthResponseDto login(LoginRequestDto request);
}
