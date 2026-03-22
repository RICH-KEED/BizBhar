package com.bizbhar.controller;

import com.bizbhar.dto.ProductRequest;
import com.bizbhar.model.Product;
import com.bizbhar.security.JwtUtil;
import com.bizbhar.service.AuthIdentityService;
import com.bizbhar.service.ProductService;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final JwtUtil jwtUtil;
    private final AuthIdentityService authIdentityService;

    public ProductController(
            ProductService productService,
            JwtUtil jwtUtil,
            AuthIdentityService authIdentityService) {
        this.productService = productService;
        this.jwtUtil = jwtUtil;
        this.authIdentityService = authIdentityService;
    }

    @GetMapping("/my-shop")
    public ResponseEntity<?> listMyShopProducts(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            String role = jwtUtil.extractRole(jwt);
            if (!"SELLER".equals(role)) {
                return ResponseEntity.badRequest().body("Only sellers can list their products");
            }
            long sellerId = authIdentityService.userIdFromBearer(token);
            return ResponseEntity.ok()
                    .cacheControl(CacheControl.noStore().mustRevalidate())
                    .body(productService.listProductsForSeller(sellerId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
            long sellerId = authIdentityService.userIdFromBearer(token);

            Product created = productService.createProduct(sellerId, request);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        try {
            String jwt = token.substring(7);
            String role = jwtUtil.extractRole(jwt);
            if (!"SELLER".equals(role)) {
                return ResponseEntity.badRequest().body("Only sellers can update products");
            }
            long sellerId = authIdentityService.userIdFromBearer(token);
            Product updated = productService.updateProductForSeller(sellerId, id, request);
            return ResponseEntity.ok(updated);
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
