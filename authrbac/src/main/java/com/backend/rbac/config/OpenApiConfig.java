package com.backend.rbac.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Authentication & RBAC API")
                        .version("1.0")
                        .description("JWT Authentication and Role-Based Access Control System")
                        .contact(new Contact()
                                .name("Bhavik Bacchewar")
                                .email("your-email@example.com")));
    }
}
