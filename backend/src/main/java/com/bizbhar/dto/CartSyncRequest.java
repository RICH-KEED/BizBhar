package com.bizbhar.dto;

import java.util.List;

public class CartSyncRequest {

    private List<CartAddRequest> items;

    public List<CartAddRequest> getItems() {
        return items;
    }

    public void setItems(List<CartAddRequest> items) {
        this.items = items;
    }
}
