package com.bizbhar.controller;

import com.bizbhar.dto.CartAddRequest;
import com.bizbhar.dto.CartLineResponse;
import com.bizbhar.dto.CartSyncRequest;
import com.bizbhar.dto.CartUpdateRequest;
import com.bizbhar.model.Cart;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;
    private final JwtUtil jwtUtil;

    public CartController(CartService cartService, JwtUtil jwtUtil) {
        this.cartService = cartService;
        this.jwtUtil = jwtUtil;
    }

    private Long userIdFromAuth(String token) {
        String jwt = token.substring(7);
        String email = jwtUtil.extractEmail(jwt);
        return (long) email.hashCode();
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestHeader("Authorization") String token,
                                 @RequestBody CartAddRequest request) {
        try {
            Long userId = userIdFromAuth(token);
            Cart cart = cartService.addItem(userId, request);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestHeader("Authorization") String token) {
        try {
            Long userId = userIdFromAuth(token);
            List<CartLineResponse> lines = cartService.getCart(userId);
            return ResponseEntity.ok(lines);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String token,
                                    @PathVariable Long id,
                                    @RequestBody CartUpdateRequest request) {
        try {
            Long userId = userIdFromAuth(token);
            Cart cart = cartService.updateQuantity(userId, id, request);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String token,
                                    @PathVariable Long id) {
        try {
            Long userId = userIdFromAuth(token);
            cartService.removeItem(userId, id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/sync")
    public ResponseEntity<?> sync(@RequestHeader("Authorization") String token,
                                  @RequestBody CartSyncRequest body) {
        try {
            Long userId = userIdFromAuth(token);
            cartService.syncFromClient(userId, body != null ? body.getItems() : null);
            return ResponseEntity.ok(cartService.getCart(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
