package com.bizbhar.dto;

import java.math.BigDecimal;

public class ShopStatsResponse {
    private Long shopId;
    private String shopName;
    private BigDecimal balance;
    private BigDecimal totalRevenue;
    private Integer totalOrders;
    private Integer activeProducts;
    private Double rating;

    public ShopStatsResponse() {
    }

    public ShopStatsResponse(Long shopId, String shopName, BigDecimal balance, BigDecimal totalRevenue, 
                            Integer totalOrders, Integer activeProducts, Double rating) {
        this.shopId = shopId;
        this.shopName = shopName;
        this.balance = balance;
        this.totalRevenue = totalRevenue;
        this.totalOrders = totalOrders;
        this.activeProducts = activeProducts;
        this.rating = rating;
    }

    // Getters and Setters
    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Integer getActiveProducts() {
        return activeProducts;
    }

    public void setActiveProducts(Integer activeProducts) {
        this.activeProducts = activeProducts;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
