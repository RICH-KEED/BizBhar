package com.bizbhar.service;

import com.bizbhar.dto.ProductRequest;
import com.bizbhar.model.Product;
import com.bizbhar.model.Shop;
import com.bizbhar.repository.ProductRepository;
import com.bizbhar.repository.ShopRepository;
import org.springframework.stereotype.Service;
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
