package com.bizbhar.controller;

import com.bizbhar.dto.ShopRequest;
import com.bizbhar.dto.ShopStatsResponse;
import com.bizbhar.model.Shop;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.AuthIdentityService;
import com.bizbhar.service.ShopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;
    private final AuthIdentityService authIdentityService;
    private final JwtUtil jwtUtil;

    public ShopController(
            ShopService shopService,
            AuthIdentityService authIdentityService,
            JwtUtil jwtUtil) {
        this.shopService = shopService;
        this.authIdentityService = authIdentityService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> createShop(@RequestHeader("Authorization") String token,
                                       @RequestBody ShopRequest request) {
        try {
            String jwt = token.substring(7);
            String role = jwtUtil.extractRole(jwt);
            if (!"SELLER".equals(role)) {
                return ResponseEntity.badRequest().body("Only sellers can create shops");
            }
            long sellerId = authIdentityService.userIdFromBearer(token);
            Shop shop = shopService.createShop(sellerId, request);
            return ResponseEntity.ok(shop);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-shop")
    public ResponseEntity<?> getMyShop(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }
        try {
            long sellerId = authIdentityService.userIdFromBearer(token);
            Shop shop = shopService.getShopBySellerId(sellerId);
            return ResponseEntity.ok(shop);
        } catch (RuntimeException e) {
            return mapShopException(e);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage() != null ? e.getMessage() : "Unexpected error");
        }
    }

    private ResponseEntity<?> mapShopException(RuntimeException e) {
        String msg = e.getMessage() != null ? e.getMessage() : "Request failed";
        if ("User not found".equals(msg)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(msg);
        }
        if (msg.contains("Invalid or expired token") || msg.contains("Missing or invalid Authorization")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(msg);
        }
        if (msg.contains("Shop not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }
        return ResponseEntity.badRequest().body(msg);
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<?> getShopStats(@PathVariable Long id) {
        try {
            ShopStatsResponse stats = shopService.getShopStats(id);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
