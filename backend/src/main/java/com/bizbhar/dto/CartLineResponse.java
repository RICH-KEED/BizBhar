package com.bizbhar.dto;

import java.math.BigDecimal;

public class CartLineResponse {

    private Long cartItemId;
    private Long productId;
    private Integer quantity;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private Integer stock;
    private String category;

    public CartLineResponse() {
    }

    public CartLineResponse(Long cartItemId, Long productId, Integer quantity,
                            String name, BigDecimal price, String imageUrl, Integer stock, String category) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.quantity = quantity;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.category = category;
    }

    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
