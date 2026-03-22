package com.bizbhar.service;

import com.bizbhar.dto.CartAddRequest;
import com.bizbhar.dto.CartLineResponse;
import com.bizbhar.dto.CartUpdateRequest;
import com.bizbhar.model.Cart;
import com.bizbhar.model.Product;
import com.bizbhar.repository.CartRepository;
import com.bizbhar.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public List<CartLineResponse> getCart(Long userId) {
        return cartRepository.findByUserIdOrderByUpdatedAtDesc(userId).stream()
                .map(this::toLine)
                .collect(Collectors.toList());
    }

    private CartLineResponse toLine(Cart c) {
        Product p = productRepository.findById(c.getProductId())
                .orElseThrow(() -> new RuntimeException("Product missing for cart line"));
        return new CartLineResponse(
                c.getId(),
                c.getProductId(),
                c.getQuantity(),
                p.getName(),
                p.getPrice(),
                p.getImageUrl(),
                p.getStock(),
                p.getCategory()
        );
    }

    @Transactional
    public Cart addItem(Long userId, CartAddRequest request) {
        if (request.getProductId() == null) {
            throw new RuntimeException("productId is required");
        }
        int qty = request.getQuantity() != null && request.getQuantity() > 0 ? request.getQuantity() : 1;
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getStock() == null || product.getStock() <= 0) {
            throw new RuntimeException("Product is out of stock");
        }

        Optional<Cart> existing = cartRepository.findByUserIdAndProductId(userId, request.getProductId());
        if (existing.isPresent()) {
            Cart cart = existing.get();
            int newQty = cart.getQuantity() + qty;
            if (newQty > product.getStock()) {
                throw new RuntimeException("Cannot add more than available stock (" + product.getStock() + ")");
            }
            cart.setQuantity(newQty);
            return cartRepository.save(cart);
        }

        if (qty > product.getStock()) {
            throw new RuntimeException("Cannot add more than available stock (" + product.getStock() + ")");
        }
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setProductId(request.getProductId());
        cart.setQuantity(qty);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateQuantity(Long userId, Long cartItemId, CartUpdateRequest request) {
        if (request.getQuantity() == null || request.getQuantity() < 1) {
            throw new RuntimeException("Quantity must be at least 1");
        }
        Cart cart = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!cart.getUserId().equals(userId)) {
            throw new RuntimeException("Not your cart item");
        }
        Product product = productRepository.findById(cart.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (request.getQuantity() > product.getStock()) {
            throw new RuntimeException("Cannot exceed available stock (" + product.getStock() + ")");
        }
        cart.setQuantity(request.getQuantity());
        return cartRepository.save(cart);
    }

    public void removeItem(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!cart.getUserId().equals(userId)) {
            throw new RuntimeException("Not your cart item");
        }
        cartRepository.delete(cart);
    }

    /** Merge guest cart lines after login (adds quantities like repeated add). */
    @Transactional
    public void syncFromClient(Long userId, List<CartAddRequest> items) {
        if (items == null || items.isEmpty()) {
            return;
        }
        for (CartAddRequest line : items) {
            if (line == null || line.getProductId() == null) {
                continue;
            }
            try {
                addItem(userId, line);
            } catch (RuntimeException ignored) {
                // skip invalid or OOS lines
            }
        }
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}
