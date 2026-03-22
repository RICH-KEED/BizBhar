package com.bizbhar.controller;

import com.bizbhar.dto.ProductRequest;
import com.bizbhar.model.Product;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;
    private final JwtUtil jwtUtil;

    public ProductController(ProductService productService, JwtUtil jwtUtil) {
        this.productService = productService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestHeader("Authorization") String token,
            @RequestBody ProductRequest request) {
        try {
            String jwt = token.substring(7);
            String role = jwtUtil.extractRole(jwt);
            if (!"SELLER".equals(role)) {
                return ResponseEntity.badRequest().body("Only sellers can add products");
            }
            String email = jwtUtil.extractEmail(jwt);
            Long sellerId = (long) email.hashCode();

            Product created = productService.createProduct(sellerId, request);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        try {
            List<Product> list = productService.listProducts(category, search);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
