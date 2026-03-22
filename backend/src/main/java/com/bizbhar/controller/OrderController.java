package com.bizbhar.controller;

import com.bizbhar.dto.OrderStatusUpdateRequest;
import com.bizbhar.dto.OrderSummaryDto;
import com.bizbhar.model.Order;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.OrderManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderManagementService orderManagementService;
    private final JwtUtil jwtUtil;

    public OrderController(OrderManagementService orderManagementService, JwtUtil jwtUtil) {
        this.orderManagementService = orderManagementService;
        this.jwtUtil = jwtUtil;
    }

    private Long sellerIdFromAuth(String token) {
        String jwt = token.substring(7);
        String role = jwtUtil.extractRole(jwt);
        if (!"SELLER".equals(role)) {
            throw new RuntimeException("Seller access only");
        }
        String email = jwtUtil.extractEmail(jwt);
        return (long) email.hashCode();
    }

    private Long userIdFromAuth(String token) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractEmail(jwt);
        return (long) email.hashCode();
    }

    @GetMapping("/my")
    public ResponseEntity<?> myOrders(@RequestHeader("Authorization") String token) {
        try {
            Long userId = userIdFromAuth(token);
            List<OrderSummaryDto> list = orderManagementService.listForBuyer(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<?> shopOrders(
            @RequestHeader("Authorization") String token,
            @PathVariable Long shopId) {
        try {
            Long sellerId = sellerIdFromAuth(token);
            List<OrderSummaryDto> list = orderManagementService.listForShop(sellerId, shopId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody OrderStatusUpdateRequest body) {
        try {
            Long sellerId = sellerIdFromAuth(token);
            Order updated = orderManagementService.updateStatus(sellerId, id, body.getStatus());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
