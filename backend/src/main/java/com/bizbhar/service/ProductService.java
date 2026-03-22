package com.bizbhar.service;

import com.bizbhar.dto.ProductRequest;
import com.bizbhar.model.Product;
import com.bizbhar.model.Shop;
import com.bizbhar.repository.ProductRepository;
import com.bizbhar.repository.ShopRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ShopRepository shopRepository;

    public ProductService(ProductRepository productRepository, ShopRepository shopRepository) {
        this.productRepository = productRepository;
        this.shopRepository = shopRepository;
    }

    public Product createProduct(Long sellerId, ProductRequest request) {
        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new RuntimeException("Create a shop before adding products"));

        if (!StringUtils.hasText(request.getName())) {
            throw new RuntimeException("Product name is required");
        }
        if (request.getPrice() == null || request.getPrice().signum() < 0) {
            throw new RuntimeException("Valid price is required");
        }
        int stock = request.getStock() != null ? request.getStock() : 0;
        if (stock < 0) {
            throw new RuntimeException("Stock cannot be negative");
        }

        Product p = new Product();
        p.setShopId(shop.getId());
        p.setName(request.getName().trim());
        p.setDescription(request.getDescription());
        p.setPrice(request.getPrice());
        p.setStock(stock);
        p.setImageUrl(request.getImageUrl());
        p.setCategory(StringUtils.hasText(request.getCategory()) ? request.getCategory().trim() : "General");

        return productRepository.save(p);
    }

    /**
     * Partial update: only non-null fields in {@code request} are applied. Seller must own the product.
     */
    @Transactional
    public Product updateProductForSeller(Long sellerId, Long productId, ProductRequest request) {
        if (request == null) {
            throw new RuntimeException("Request body required");
        }
        boolean any =
                request.getName() != null
                        || request.getDescription() != null
                        || request.getPrice() != null
                        || request.getStock() != null
                        || request.getImageUrl() != null
                        || request.getCategory() != null;
        if (!any) {
            throw new RuntimeException("No fields to update");
        }

        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new RuntimeException("Create a shop before managing products"));
        Product p = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (!p.getShopId().equals(shop.getId())) {
            throw new RuntimeException("Not your product");
        }

        if (request.getName() != null) {
            if (!StringUtils.hasText(request.getName().trim())) {
                throw new RuntimeException("Product name cannot be empty");
            }
            p.setName(request.getName().trim());
        }
        if (request.getDescription() != null) {
            p.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            if (request.getPrice().signum() < 0) {
                throw new RuntimeException("Price cannot be negative");
            }
            p.setPrice(request.getPrice());
        }
        if (request.getStock() != null) {
            if (request.getStock() < 0) {
                throw new RuntimeException("Stock cannot be negative");
            }
            p.setStock(request.getStock());
        }
        if (request.getImageUrl() != null) {
            p.setImageUrl(request.getImageUrl());
        }
        if (request.getCategory() != null) {
            p.setCategory(StringUtils.hasText(request.getCategory().trim()) ? request.getCategory().trim() : "General");
        }

        return productRepository.save(p);
    }

    public List<Product> listProductsForSeller(Long sellerId) {
        Shop shop = shopRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new RuntimeException("Create a shop before managing products"));
        return productRepository.findByShopIdOrderByCreatedAtDesc(shop.getId());
    }

    public List<Product> listProducts(String category, String search) {
        String cat = StringUtils.hasText(category) ? category.trim() : null;
        String q = StringUtils.hasText(search) ? search.trim() : null;
        return productRepository.findFiltered(cat, q);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
