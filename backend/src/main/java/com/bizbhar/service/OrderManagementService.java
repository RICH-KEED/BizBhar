package com.bizbhar.service;

import com.bizbhar.dto.OrderSummaryDto;
import com.bizbhar.model.Order;
import com.bizbhar.model.Shop;
import com.bizbhar.repository.OrderRepository;
import com.bizbhar.repository.ShopRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderManagementService {

    private final OrderRepository orderRepository;
    private final ShopRepository shopRepository;

    public OrderManagementService(OrderRepository orderRepository, ShopRepository shopRepository) {
        this.orderRepository = orderRepository;
        this.shopRepository = shopRepository;
    }

    public List<OrderSummaryDto> listForBuyer(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    public List<OrderSummaryDto> listForShop(Long sellerId, Long shopId) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));
        if (!shop.getSellerId().equals(sellerId)) {
            throw new RuntimeException("You do not manage this shop");
        }
        return orderRepository.findByShopIdOrderByCreatedAtDesc(shopId).stream()
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    private OrderSummaryDto toSummary(Order o) {
        OrderSummaryDto d = new OrderSummaryDto();
        d.setId(o.getId());
        d.setShopId(o.getShopId());
        d.setTotal(o.getTotal());
        d.setStatus(o.getStatus());
        d.setCreatedAt(o.getCreatedAt());
        d.setStripePaymentId(o.getStripePaymentId());
        shopRepository.findById(o.getShopId()).ifPresent(s -> d.setShopName(s.getName()));
        return d;
    }

    @Transactional
    public Order updateStatus(Long sellerId, Long orderId, String newStatus) {
        if (newStatus == null || newStatus.isBlank()) {
            throw new RuntimeException("status is required");
        }
        String next = newStatus.trim().toUpperCase();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Shop shop = shopRepository.findById(order.getShopId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));
        if (!shop.getSellerId().equals(sellerId)) {
            throw new RuntimeException("You do not manage this order");
        }

        String cur = order.getStatus() != null ? order.getStatus().toUpperCase() : "PENDING";
        if ("PENDING".equals(cur) && "SHIPPED".equals(next)) {
            order.setStatus("SHIPPED");
        } else if ("SHIPPED".equals(cur) && "DELIVERED".equals(next)) {
            order.setStatus("DELIVERED");
        } else {
            throw new RuntimeException("Invalid transition from " + cur + " to " + next + " (use PENDING→SHIPPED→DELIVERED)");
        }
        return orderRepository.save(order);
    }
}
