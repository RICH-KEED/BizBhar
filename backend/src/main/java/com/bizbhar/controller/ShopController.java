package com.bizbhar.controller;

import com.bizbhar.dto.ShopRequest;
import com.bizbhar.dto.ShopStatsResponse;
import com.bizbhar.model.Shop;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:3000")
public class ShopController {

    private final ShopService shopService;
    private final JwtUtil jwtUtil;

    public ShopController(ShopService shopService, JwtUtil jwtUtil) {
        this.shopService = shopService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> createShop(@RequestHeader("Authorization") String token,
                                       @RequestBody ShopRequest request) {
        try {
            String jwt = token.substring(7); // Remove "Bearer "
            String email = jwtUtil.extractEmail(jwt);
            String role = jwtUtil.extractRole(jwt);

            if (!"SELLER".equals(role)) {
                return ResponseEntity.badRequest().body("Only sellers can create shops");
            }

            // For simplicity, using email hash as sellerId
            // In real app, get user ID from database
            Long sellerId = (long) email.hashCode();

            Shop shop = shopService.createShop(sellerId, request);
            return ResponseEntity.ok(shop);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my-shop")
    public ResponseEntity<?> getMyShop(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            String email = jwtUtil.extractEmail(jwt);
            Long sellerId = (long) email.hashCode();

            Shop shop = shopService.getShopBySellerId(sellerId);
            return ResponseEntity.ok(shop);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
