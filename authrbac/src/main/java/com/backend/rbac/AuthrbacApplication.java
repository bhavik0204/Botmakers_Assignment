package com.backend.rbac;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.backend.rbac.entity.Role;
import com.backend.rbac.repository.RoleRepository;

@SpringBootApplication
public class AuthrbacApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthrbacApplication.class, args);
	}

	@Bean
	public CommandLineRunner seedRoles(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.count() == 0) {
				roleRepository.save(new Role(null, "USER"));
				roleRepository.save(new Role(null, "ADMIN"));
			}
		};
	}

}

