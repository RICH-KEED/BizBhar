package com.bizbhar.service;

import com.bizbhar.dto.ShopRequest;
import com.bizbhar.dto.ShopStatsResponse;
import com.bizbhar.model.Shop;
import com.bizbhar.repository.ShopRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ShopService {

    private final ShopRepository shopRepository;

    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public Shop createShop(Long sellerId, ShopRequest request) {
        // Check if seller already has a shop
        if (shopRepository.existsBySellerId(sellerId)) {
            throw new RuntimeException("Seller already has a shop");
        }

        Shop shop = new Shop();
        shop.setSellerId(sellerId);
        shop.setName(request.getName());
        shop.setLogoUrl(request.getLogoUrl());
        shop.setStatus("APPROVED"); // Auto-approve for now
        shop.setBalance(BigDecimal.ZERO);

        return shopRepository.save(shop);
    }

    public Shop getShopBySellerId(Long sellerId) {
        return shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new RuntimeException("Shop not found for seller"));
    }

    public ShopStatsResponse getShopStats(Long shopId) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        // For now, return dummy stats. In real app, calculate from orders/products
        return new ShopStatsResponse(
                shop.getId(),
                shop.getName(),
                shop.getBalance(),
                new BigDecimal("45200"), // Total revenue
                124, // Total orders
                45,  // Active products
                4.8  // Rating
        );
    }
}
