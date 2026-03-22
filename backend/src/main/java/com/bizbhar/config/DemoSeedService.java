package com.bizbhar.config;



import com.bizbhar.model.Product;

import com.bizbhar.model.Shop;

import com.bizbhar.model.User;

import com.bizbhar.repository.ProductRepository;

import com.bizbhar.repository.ShopRepository;

import com.bizbhar.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;



import java.math.BigDecimal;



/**

 * Inserts demo seller + shop + products when enabled.

 * If the demo seller already exists (e.g. from an older run) but the shop has no products,

 * catalog rows are inserted on startup so buyers always see sample listings in dev.

 */

@Service

public class DemoSeedService {



    public static final String DEMO_SELLER_EMAIL = "demo-seller@bizbhar.test";

    /** Log in as seller to manage this shop: same password */

    public static final String DEMO_SELLER_PASSWORD = "Demo123!";



    private final UserRepository userRepository;

    private final ShopRepository shopRepository;

    private final ProductRepository productRepository;

    private final PasswordEncoder passwordEncoder;



    @Value("${bizbhar.seed.enabled:true}")

    private boolean seedEnabled;



    public DemoSeedService(

            UserRepository userRepository,

            ShopRepository shopRepository,

            ProductRepository productRepository,

            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;

        this.shopRepository = shopRepository;

        this.productRepository = productRepository;

        this.passwordEncoder = passwordEncoder;

    }



    @Transactional

    public void seedIfNeeded() {

        if (!seedEnabled) {

            return;

        }

        if (!userRepository.existsByEmailIgnoreCase(DEMO_SELLER_EMAIL)) {

            User seller = new User();

            seller.setEmail(DEMO_SELLER_EMAIL);

            seller.setPasswordHash(passwordEncoder.encode(DEMO_SELLER_PASSWORD));

            seller.setRole("SELLER");

            seller = userRepository.save(seller);



            Shop shop = new Shop();

            shop.setSellerId(seller.getId());

            shop.setName("Demo Bazaar — Spices & Handloom");

            shop.setLogoUrl("https://picsum.photos/seed/bizbhar-shop/120/120");

            shop.setStatus("APPROVED");

            shop.setBalance(BigDecimal.ZERO);

            shop = shopRepository.save(shop);



            seedDemoProducts(shop.getId());

        } else {

            ensureDemoShopHasCatalog();

        }

    }



    /**

     * Demo user already exists but shop or catalog may be missing — backfill on startup.

     */

    private void ensureDemoShopHasCatalog() {

        userRepository.findByEmailIgnoreCase(DEMO_SELLER_EMAIL).ifPresent(user -> {

            Shop shop = shopRepository.findBySellerId(user.getId()).orElseGet(() -> {

                Shop s = new Shop();

                s.setSellerId(user.getId());

                s.setName("Demo Bazaar — Spices & Handloom");

                s.setLogoUrl("https://picsum.photos/seed/bizbhar-shop/120/120");

                s.setStatus("APPROVED");

                s.setBalance(BigDecimal.ZERO);

                return shopRepository.save(s);

            });

            if (productRepository.countByShopId(shop.getId()) == 0) {

                seedDemoProducts(shop.getId());

            }

        });

    }



    private void seedDemoProducts(long shopId) {

        record DemoProduct(String name, String description, BigDecimal price, int stock, String category, String imageSeed) {}



        DemoProduct[] items = new DemoProduct[] {

                new DemoProduct(

                        "Kashmiri Saffron (1g)",

                        "Premium grade saffron threads for biryani and desserts.",

                        new BigDecimal("599.00"),

                        40,

                        "Spices",

                        "saffron"),

                new DemoProduct(

                        "Assam Orthodox Tea (250g)",

                        "Strong breakfast tea, vacuum packed.",

                        new BigDecimal("189.00"),

                        120,

                        "Food",

                        "tea"),

                new DemoProduct(

                        "Handloom Cotton Dupatta",

                        "Block-printed cotton dupatta, indigo on cream.",

                        new BigDecimal("450.00"),

                        25,

                        "Handloom",

                        "dupatta"),

                new DemoProduct(

                        "Brass Diya Set (Pair)",

                        "Traditional brass diyas for festivals.",

                        new BigDecimal("320.00"),

                        60,

                        "Crafts",

                        "diya"),

                new DemoProduct(

                        "Organic Turmeric Powder (200g)",

                        "Single-origin turmeric, high curcumin.",

                        new BigDecimal("95.00"),

                        200,

                        "Spices",

                        "turmeric"),

                new DemoProduct(

                        "Khadi Kurta — Off White (M)",

                        "Hand-spun khadi, comfortable everyday wear.",

                        new BigDecimal("890.00"),

                        15,

                        "Handloom",

                        "kurta"),

                new DemoProduct(

                        "Jute Tote Bag",

                        "Eco-friendly jute bag with cotton lining.",

                        new BigDecimal("275.00"),

                        45,

                        "Crafts",

                        "jute"),

                new DemoProduct(

                        "Filter Coffee Powder (500g)",

                        "South Indian blend, medium roast.",

                        new BigDecimal("299.00"),

                        80,

                        "Food",

                        "coffee"),

                new DemoProduct(

                        "Bamboo Desk Organizer",

                        "Handcrafted bamboo slots for pens, phone, and cables.",

                        new BigDecimal("425.00"),

                        35,

                        "Home & Living",

                        "bamboo-desk"),

                new DemoProduct(

                        "Linen Table Runner",

                        "Natural linen, machine washable, 180×40 cm.",

                        new BigDecimal("680.00"),

                        20,

                        "Home & Living",

                        "table-runner"),

                new DemoProduct(

                        "Coconut Oil Cold-Pressed (500ml)",

                        "Kerala single-farm cold-pressed coconut oil.",

                        new BigDecimal("210.00"),

                        90,

                        "Food",

                        "coconut-oil"),

        };



        for (DemoProduct d : items) {

            Product p = new Product();

            p.setShopId(shopId);

            p.setName(d.name);

            p.setDescription(d.description);

            p.setPrice(d.price);

            p.setStock(d.stock);

            p.setCategory(d.category);

            p.setImageUrl("https://picsum.photos/seed/" + d.imageSeed + "/600/400");

            productRepository.save(p);

        }

    }

}


