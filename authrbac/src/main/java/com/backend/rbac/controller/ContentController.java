package com.backend.rbac.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContentController {

    @GetMapping("/api/public")
    public String publicContent() {
        return "Open to all";
    }

    @GetMapping("/api/user")
    public String userContent() {
        return "User Content - Accessible to USER and ADMIN";
    }

    @GetMapping("/api/admin")
    public String adminContent() {
        return "Admin Content - Accessible only to ADMIN";
    }
}
