package com.bizbhar.controller;

import com.bizbhar.dto.CheckoutPaymentIntentResponse;
import com.bizbhar.dto.OrderStatusResponse;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.CheckoutService;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:3000")
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final JwtUtil jwtUtil;

    public CheckoutController(CheckoutService checkoutService, JwtUtil jwtUtil) {
        this.checkoutService = checkoutService;
        this.jwtUtil = jwtUtil;
    }

    private Long userIdFromAuth(String token) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractEmail(jwt);
        return (long) email.hashCode();
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestHeader("Authorization") String token) {
        try {
            Long userId = userIdFromAuth(token);
            CheckoutPaymentIntentResponse res = checkoutService.createPaymentIntent(userId);
            return ResponseEntity.ok(res);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/order-status/{paymentIntentId}")
    public ResponseEntity<?> orderStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable String paymentIntentId) {
        try {
            Long userId = userIdFromAuth(token);
            return checkoutService.findOrderForUser(userId, paymentIntentId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
