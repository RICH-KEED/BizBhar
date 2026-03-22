package com.bizbhar.dto;

public class OrderStatusResponse {

    private Long orderId;
    private String status;
    private String stripePaymentId;

    public OrderStatusResponse() {
    }

    public OrderStatusResponse(Long orderId, String status, String stripePaymentId) {
        this.orderId = orderId;
        this.status = status;
        this.stripePaymentId = stripePaymentId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStripePaymentId() {
        return stripePaymentId;
    }

    public void setStripePaymentId(String stripePaymentId) {
        this.stripePaymentId = stripePaymentId;
    }
}
