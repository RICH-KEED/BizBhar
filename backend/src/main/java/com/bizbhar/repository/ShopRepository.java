package com.bizbhar.repository;

import com.bizbhar.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findBySellerId(Long sellerId);
    boolean existsBySellerId(Long sellerId);
}
