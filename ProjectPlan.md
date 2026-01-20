
# Multi-Vendor Online Marketplace [BizBhar]

**8-Week Development Roadmap** (1 Module Per Week)

## Tech Stack

```
Frontend: React 18 + Tailwind CSS + Axios + React Router + Chart.js
Backend: Spring Boot 3 + Spring Security (JWT) + Spring Data JPA
Database: PostgreSQL 15
Payments: Stripe (Checkout API + Webhooks)
Tools: Maven (multi-module), Postman, Docker (optional)
Deployment: Heroku/Netlify (free)
```


***

## **WEEK 1: User Authentication \& Roles**

### Goals

✅ Working login/register
✅ Role-based pages (buyer/seller/admin)
✅ JWT protected routes

### Backend Tasks (Day 1-3)

```
1. Setup Spring Boot project (Maven multi-module)
2. PostgreSQL: CREATE TABLE users (
   id BIGSERIAL PRIMARY KEY,
   email VARCHAR UNIQUE,
   password_hash VARCHAR,
   role VARCHAR(20), -- 'BUYER', 'SELLER', 'ADMIN'
   created_at TIMESTAMP
);
3. Dependencies: spring-boot-starter-security, jjwt, postgresql
4. Endpoints:
   POST /api/auth/register → returns JWT
   POST /api/auth/login → returns JWT
   GET /api/profile → protected
```


### Frontend Tasks (Day 4-6)

```
1. Create React app: npx create-react-app frontend
2. Install: tailwindcss, axios, react-router-dom
3. Pages: /login, /register, /profile
4. Store JWT in localStorage
5. ProtectedRoute component
```


### Day 7: Demo

```
Test: Register buyer → Login → See profile
Submit: Postman collection + screenshots
```


***

## **WEEK 2: Seller Onboarding \& Dashboard**

### Goals

✅ Sellers create shop
✅ Seller dashboard with charts
✅ Earnings tracking

### Backend Tasks (Day 1-3)

```
1. New table: shops (
   id BIGSERIAL,
   seller_id BIGINT REFERENCES users,
   name VARCHAR,
   logo_url VARCHAR,
   status VARCHAR DEFAULT 'PENDING',
   balance DECIMAL
);
2. Endpoints:
   POST /api/shops (seller only)
   GET /api/shops/{id}/stats (earnings, orders count)
```


### Frontend Tasks (Day 4-6)

```
1. New pages: /seller/onboard, /seller/dashboard
2. Onboard form → POST /api/shops
3. Dashboard: Chart.js line chart (dummy sales data)
4. Progress bar: Earnings to payout goal (₹5000)
```


### Day 7: Demo

```
Test: Seller registers → Creates shop → Sees dashboard
```


***

## **WEEK 3: Product Management**

### Goals

✅ Sellers add products
✅ Buyers browse/search products
✅ Product details page

### Backend Tasks (Day 1-3)

```
1. Table: products (
   id BIGSERIAL,
   shop_id BIGINT REFERENCES shops,
   name VARCHAR,
   description TEXT,
   price DECIMAL,
   stock INTEGER,
   image_url VARCHAR,
   category VARCHAR
);
2. Endpoints:
   POST /api/products (seller only)
   GET /api/products?category=electronics&search=phone
   GET /api/products/{id}
```


### Frontend Tasks (Day 4-6)

```
1. Pages: /seller/products/add, /products, /products/:id
2. Product list: Grid layout + search/filter
3. Add product form (with image preview)
4. "Out of stock" badge if stock=0
```


### Day 7: Demo

```
Test: Seller adds phone → Buyer searches → Views details
```


***

## **WEEK 4: Shopping Cart**

### Goals

✅ Add to cart from anywhere
✅ Cart page with totals
✅ Update quantities

### Backend Tasks (Day 1-3)

```
1. Table: carts (
   id BIGSERIAL,
   user_id BIGINT REFERENCES users,
   product_id BIGINT REFERENCES products,
   quantity INTEGER
);
2. Endpoints:
   POST /api/cart/add
   GET /api/cart/{userId}
   PUT /api/cart/{id} (update qty)
   DELETE /api/cart/{id}
```


### Frontend Tasks (Day 4-6)

```
1. Add "Add to Cart" button to all product pages
2. Cart page: /cart → list items + total + remove
3. localStorage sync for guest users
4. Quantity +/- buttons
```


### Day 7: Demo

```
Test: Add 2 products → Change qty → See ₹ total
```


***

## **WEEK 5: Stripe Checkout ⭐ PAYMENT EVALUATION**

### Goals

✅ Complete Stripe payment flow
✅ Order creation on success
✅ Webhook handling

### Backend Tasks (Day 1-4)

```
1. Stripe dependencies: stripe-java
2. POST /api/checkout → create PaymentIntent
3. POST /api/webhook/stripe → confirm payment → create order
4. Table: orders (
   id BIGSERIAL,
   user_id BIGINT,
   shop_id BIGINT,
   total DECIMAL,
   stripe_payment_id VARCHAR,
   status VARCHAR DEFAULT 'PENDING'
);
```


### Frontend Tasks (Day 5-6)

```
1. Checkout page: /checkout
2. Stripe Elements (card input)
3. Success page: /order-success/:id
```


### Day 7: Demo

```
Test: Checkout → Enter test card 4242424242424242 → Success page
Submit: Stripe dashboard screenshot
```


***

## **WEEK 6: Order Management**

### Goals

✅ Buyer sees order history
✅ Seller manages orders
✅ Status updates

### Backend Tasks (Day 1-3)

```
1. Endpoints:
   GET /api/orders/my (buyer)
   GET /api/orders/shop/{shopId} (seller)
   PUT /api/orders/{id}/status (seller)
2. Status flow: PENDING → SHIPPED → DELIVERED
```


### Frontend Tasks (Day 4-6)

```
1. Pages: /my-orders (buyer), /seller/orders
2. Status badges + timeline
3. Seller can update status
```


### Day 7: Demo

```
Test: Place order → Seller changes PENDING→SHIPPED
```


***

## **WEEK 7: Admin Dashboard ⭐ PROGRESS BAR EVALUATION**

### Goals

✅ Revenue analytics
✅ Manage sellers
✅ Goal tracker

### Backend Tasks (Day 1-3)

```
1. Admin endpoints:
   GET /api/admin/stats (total revenue, orders count)
   GET /api/admin/shops (pending list)
   PUT /api/admin/shops/{id}/approve
2. SQL queries for monthly revenue
```


### Frontend Tasks (Day 4-6)

```
1. /admin/dashboard
2. Charts: Revenue progress bar (to monthly goal)
3. Table: Pending shops + approve button
4. Order logs table
```


### Day 7: Demo

```
Test: Admin approves shop → Sees revenue ₹12,500/₹20,000
```


***

## **WEEK 8: Reviews + Final Demo ⭐ FULL EVALUATION**

### Goals

✅ Post-purchase reviews
✅ Ratings display
✅ Project completion

### Backend Tasks (Day 1-2)

```
1. Table: reviews (
   id BIGSERIAL,
   order_id BIGINT,
   rating INTEGER (1-5),
   comment TEXT
);
2. GET /api/products/{id}/reviews (avg rating)
```


### Frontend Tasks (Day 3-5)

```
1. Review form on delivered orders
2. Stars + average rating on product pages
3. Seller average rating
```


### Day 6-7: Polish \& Demo

```
✅ Fix bugs
✅ Demo video (full buyer journey)
✅ Documentation + GitHub repo
```


## Final Evaluation Checklist ✅

- [ ] **Stripe**: Payments work (Week 5)
- [ ] **Progress bar**: Revenue tracker (Week 7)
- [ ] **Logs**: Order history (Week 6)
- [ ] **Goal tracker**: Admin dashboard (Week 7)
- [ ] **Full flow**: Buyer→Payment→Seller→Review (Week 8)

<div align="center">⁂</div>
