package com.bizbhar.controller;

import com.bizbhar.dto.CheckoutPaymentIntentResponse;
import com.bizbhar.service.AuthIdentityService;
import com.bizbhar.service.CheckoutService;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final AuthIdentityService authIdentityService;

    public CheckoutController(CheckoutService checkoutService, AuthIdentityService authIdentityService) {
        this.checkoutService = checkoutService;
        this.authIdentityService = authIdentityService;
    }

    private long userIdFromAuth(String token) {
        return authIdentityService.userIdFromBearer(token);
    }

    private static boolean isAuthFailure(RuntimeException e) {
        String msg = e.getMessage();
        if (msg == null) {
            return false;
        }
        return msg.contains("Authorization")
                || msg.contains("Invalid or expired")
                || msg.contains("User not found");
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<?> createPaymentIntent(
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || token.isBlank()) {
                return ResponseEntity.status(401).body("Missing Authorization");
            }
            Long userId = userIdFromAuth(token);
            CheckoutPaymentIntentResponse res = checkoutService.createPaymentIntent(userId);
            return ResponseEntity.ok(res);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (RuntimeException e) {
            if (isAuthFailure(e)) {
                return ResponseEntity.status(401).body(e.getMessage());
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/order-status/{paymentIntentId}")
    public ResponseEntity<?> orderStatus(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable String paymentIntentId) {
        try {
            if (token == null || token.isBlank()) {
                return ResponseEntity.status(401).body("Missing Authorization");
            }
            Long userId = userIdFromAuth(token);
            return ResponseEntity.ok(checkoutService.pollOrderForUser(userId, paymentIntentId));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (RuntimeException e) {
            if (isAuthFailure(e)) {
                return ResponseEntity.status(401).body(e.getMessage());
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
