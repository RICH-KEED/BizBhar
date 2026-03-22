package com.bizbhar.dto;

public class CheckoutPaymentIntentResponse {

    private String clientSecret;
    private String publishableKey;

    public CheckoutPaymentIntentResponse() {
    }

    public CheckoutPaymentIntentResponse(String clientSecret, String publishableKey) {
        this.clientSecret = clientSecret;
        this.publishableKey = publishableKey;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getPublishableKey() {
        return publishableKey;
    }

    public void setPublishableKey(String publishableKey) {
        this.publishableKey = publishableKey;
    }
}
