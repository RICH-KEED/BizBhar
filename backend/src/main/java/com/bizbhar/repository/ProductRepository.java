package com.bizbhar.repository;

import com.bizbhar.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    long countByShopId(Long shopId);

    List<Product> findByShopIdOrderByCreatedAtDesc(Long shopId);

    @Query("""
            SELECT p FROM Product p WHERE
            (:category IS NULL OR :category = '' OR LOWER(p.category) = LOWER(:category))
            AND (:search IS NULL OR :search = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(COALESCE(p.description, '')) LIKE LOWER(CONCAT('%', :search, '%')))
            ORDER BY p.createdAt DESC
            """)
    List<Product> findFiltered(
            @Param("category") String category,
            @Param("search") String search);
}
