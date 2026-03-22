package com.bizbhar.controller;

import com.bizbhar.service.CheckoutService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Stripe webhooks. {@code payment_intent.succeeded} finalizes the order.
 * <p>
 * The embedded object deserializer sometimes returns empty with newer API versions; we fall back to
 * {@link PaymentIntent#retrieve(String)} using the id from the raw JSON so we never ACK without
 * actually running {@link CheckoutService#finalizeOrder}.
 */
@RestController
public class StripeWebhookController {

    private final CheckoutService checkoutService;
    private final ObjectMapper objectMapper;

    @Value("${stripe.webhook.secret:}")
    private String webhookSecret;

    public StripeWebhookController(CheckoutService checkoutService, ObjectMapper objectMapper) {
        this.checkoutService = checkoutService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/api/webhook/stripe")
    public ResponseEntity<String> handle(
            @RequestBody String payload,
            @RequestHeader(value = "Stripe-Signature", required = false) String sigHeader) {
        if (webhookSecret == null || webhookSecret.isBlank()) {
            return ResponseEntity.status(503).body("Webhook secret not configured");
        }
        if (sigHeader == null) {
            return ResponseEntity.badRequest().body("Missing Stripe-Signature");
        }
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            if ("payment_intent.succeeded".equals(event.getType())) {
                PaymentIntent pi = resolvePaymentIntent(event, payload);
                if (pi == null) {
                    return ResponseEntity.internalServerError()
                            .body("payment_intent.succeeded: could not resolve PaymentIntent — will retry");
                }
                checkoutService.finalizeOrder(pi);
            }
            return ResponseEntity.ok("ok");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    /**
     * Prefer deserialized object; otherwise parse {@code data.object.id} and retrieve from Stripe.
     */
    private PaymentIntent resolvePaymentIntent(Event event, String payload) throws StripeException {
        StripeObject obj = event.getDataObjectDeserializer().getObject().orElse(null);
        if (obj instanceof PaymentIntent pi) {
            return pi;
        }
        try {
            JsonNode root = objectMapper.readTree(payload);
            JsonNode idNode = root.path("data").path("object").path("id");
            if (idNode.isMissingNode() || idNode.isNull()) {
                return null;
            }
            String id = idNode.asText();
            if (id == null || !id.startsWith("pi_")) {
                return null;
            }
            return PaymentIntent.retrieve(id);
        } catch (Exception e) {
            return null;
        }
    }
}
