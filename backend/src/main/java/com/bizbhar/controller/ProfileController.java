package com.bizbhar.controller;

import com.bizbhar.model.User;
import com.bizbhar.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // GET /api/profile → requires valid JWT
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String raw = authentication.getName();
        String email = raw != null ? raw.trim().toLowerCase() : "";

        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "createdAt", user.getCreatedAt().toString()
        ));
    }
}
