package com.bizbhar.service;

import com.bizbhar.repository.UserRepository;
import com.bizbhar.security.JwtUtil;
import org.springframework.stereotype.Service;

/**
 * Resolves the authenticated user to their persistent database ID.
 * Shop, cart, and orders must use this ID — not email.hashCode().
 */
@Service
public class AuthIdentityService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthIdentityService(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    public long userIdFromBearer(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String jwt = authorizationHeader.substring(7).trim();
        if (jwt.isEmpty()) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String email;
        try {
            email = jwtUtil.extractEmail(jwt);
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token");
        }
        String normalized = email != null ? email.trim().toLowerCase() : "";
        if (normalized.isEmpty()) {
            throw new RuntimeException("Invalid or expired token");
        }
        return userRepository.findByEmailIgnoreCase(normalized)
                .map(u -> u.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
