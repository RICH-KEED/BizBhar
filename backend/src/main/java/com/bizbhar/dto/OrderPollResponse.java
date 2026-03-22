package com.bizbhar.dto;

/**
 * Polling response for checkout: {@code ready=false} until the order row exists (webhook or
 * server-side sync from Stripe after payment).
 */
public class OrderPollResponse {

    private boolean ready;
    private Long orderId;
    private String status;
    private String stripePaymentId;

    public OrderPollResponse() {
    }

    public OrderPollResponse(boolean ready, Long orderId, String status, String stripePaymentId) {
        this.ready = ready;
        this.orderId = orderId;
        this.status = status;
        this.stripePaymentId = stripePaymentId;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
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
