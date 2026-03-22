package com.bizbhar.repository;

import com.bizbhar.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByStripePaymentId(String stripePaymentId);

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Order> findByShopIdOrderByCreatedAtDesc(Long shopId);

    long countByShopId(Long shopId);

    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Order o WHERE o.shopId = :shopId")
    BigDecimal sumTotalByShopId(@Param("shopId") Long shopId);
}
