package com.bizbhar.service;

import com.bizbhar.dto.CartLineResponse;
import com.bizbhar.dto.CheckoutPaymentIntentResponse;
import com.bizbhar.dto.OrderStatusResponse;
import com.bizbhar.model.Cart;
import com.bizbhar.model.Order;
import com.bizbhar.model.Product;
import com.bizbhar.repository.CartRepository;
import com.bizbhar.repository.OrderRepository;
import com.bizbhar.repository.ProductRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CheckoutService {

    private final CartService cartService;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @Value("${stripe.publishable.key:}")
    private String publishableKey;

    public CheckoutService(
            CartService cartService,
            CartRepository cartRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository) {
        this.cartService = cartService;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public CheckoutPaymentIntentResponse createPaymentIntent(Long userId) throws StripeException {
        if (Stripe.apiKey == null || Stripe.apiKey.isBlank()) {
            throw new RuntimeException("Stripe is not configured. Set stripe.secret.key (e.g. in application.properties or env STRIPE_SECRET_KEY).");
        }
        if (publishableKey == null || publishableKey.isBlank()) {
            throw new RuntimeException("Set stripe.publishable.key (or env STRIPE_PUBLISHABLE_KEY) for the payment form.");
        }
        List<CartLineResponse> lines = cartService.getCart(userId);
        if (lines.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Set<Long> shopIds = new HashSet<>();
        BigDecimal total = BigDecimal.ZERO;
        for (CartLineResponse line : lines) {
            Product p = productRepository.findById(line.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            shopIds.add(p.getShopId());
            if (line.getQuantity() > p.getStock()) {
                throw new RuntimeException("Not enough stock for " + p.getName());
            }
            total = total.add(p.getPrice().multiply(BigDecimal.valueOf(line.getQuantity())));
        }
        if (shopIds.size() != 1) {
            throw new RuntimeException("Checkout one shop at a time. Remove items from other shops and order separately.");
        }
        Long shopId = shopIds.iterator().next();

        long amountPaise = total.multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP).longValue();
        if (amountPaise < 50) {
            throw new RuntimeException("Order total is too small for card payment.");
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountPaise)
                .setCurrency("inr")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .putMetadata("userId", String.valueOf(userId))
                .putMetadata("shopId", String.valueOf(shopId))
                .build();

        PaymentIntent pi = PaymentIntent.create(params);
        return new CheckoutPaymentIntentResponse(pi.getClientSecret(), publishableKey);
    }

    @Transactional
    public void finalizeOrder(PaymentIntent pi) {
        if (orderRepository.findByStripePaymentId(pi.getId()).isPresent()) {
            return;
        }
        String uid = pi.getMetadata() != null ? pi.getMetadata().get("userId") : null;
        String sid = pi.getMetadata() != null ? pi.getMetadata().get("shopId") : null;
        if (uid == null || sid == null) {
            throw new IllegalStateException("Missing PaymentIntent metadata");
        }
        Long userId = Long.parseLong(uid);
        Long shopId = Long.parseLong(sid);

        List<Cart> lines = cartRepository.findByUserIdOrderByUpdatedAtDesc(userId);
        if (lines.isEmpty()) {
            return;
        }

        BigDecimal computed = BigDecimal.ZERO;
        for (Cart c : lines) {
            Product p = productRepository.findById(c.getProductId()).orElseThrow();
            if (!p.getShopId().equals(shopId)) {
                throw new IllegalStateException("Cart does not match payment shop");
            }
            computed = computed.add(p.getPrice().multiply(BigDecimal.valueOf(c.getQuantity())));
        }

        long expectedPaise = computed.multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP).longValue();
        if (Math.abs(expectedPaise - pi.getAmount()) > 2) {
            throw new IllegalStateException("Payment amount does not match cart total");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setShopId(shopId);
        order.setTotal(computed);
        order.setStripePaymentId(pi.getId());
        order.setStatus("PENDING");
        orderRepository.save(order);

        for (Cart c : lines) {
            Product p = productRepository.findById(c.getProductId()).orElseThrow();
            p.setStock(p.getStock() - c.getQuantity());
            productRepository.save(p);
        }

        cartService.clearCart(userId);
    }

    public Optional<OrderStatusResponse> findOrderForUser(Long userId, String paymentIntentId) {
        return orderRepository.findByStripePaymentId(paymentIntentId)
                .filter(o -> o.getUserId().equals(userId))
                .map(o -> new OrderStatusResponse(o.getId(), o.getStatus(), o.getStripePaymentId()));
    }
}
