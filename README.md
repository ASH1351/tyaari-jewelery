# TYAARI JEWELLERY — Luxury E-Commerce Website

An ultra-premium, mobile-first e-commerce style website designed for **Tyaari Jewellery**, inspired by royal Rajasthani Kundan and Polki heritage, emerald centerpieces, and modern Indian luxury.

> **Tagline:** *"Crafted to Shine. Made for You."*

---

## 🎨 Brand Colour Palette
- **Deep Black / Velvet:** `#0B0B0D` (main dark background, rich mood)
- **Emerald Green:** `#0F5C45` (primary accent, buttons, badges)
- **Soft Mint Green:** `#8FD0B0` (secondary accent, hover states, prices)
- **Antique Gold:** `#C9A24B` (headings accents, borders, icons, lines)
- **Pearl Cream:** `#F7F1E5` (light section backgrounds, text on dark)
- **Blush Pink:** `#E8C6C8` (subtle accents, tags, badges)

The website uses an alternating rhythm of **Velvet Black** and **Pearl Cream** sections with gold hairline dividers, ensuring a regal and spacious aesthetic.

---

## 💎 Features & Architecture

1. **Sticky Luxury Header:**
   - Gold serif typography with custom tracking.
   - Smooth glassmorphism backdrop blur on scroll.
   - Desktop navigation & full-screen mobile drawer menu.
   - Quick access to Search, Wishlist drawer (with live badge), and Shopping Cart (with live badge).

2. **Hero Section:**
   - Showcases the authentic **Royal Mayuri Kundan & Emerald Suite** on deep velvet.
   - Ambient gold & emerald lighting effects.
   - Direct CTA buttons: *"Shop Collection"* (Emerald) & *"Explore Rings"* (Gold Outline).
   - Animated luxury scroll down indicator.

3. **Shop by Category:**
   - 4 categories: **Rings**, **Bracelets**, **Earrings**, **Mini Earrings**.
   - 2x2 grid on mobile phones, 4-column layout on desktop.
   - Soft hover zoom and gold accent borders.

4. **Featured & Bestsellers Catalog:**
   - Interactive filtering (All | Rings | Bracelets | Earrings | Mini Earrings) with smooth fade animation.
   - Dual-image hover swap: cards transition to alternate product view on hover/tap.
   - Real-time Wishlist toggle (`localStorage` backed).
   - "Add to Cart" with instant drawer feedback.
   - "Quick View" modal with specifications and WhatsApp buy button.

5. **Brand Story / Atelier:**
   - Split layout celebrating the meaning of *"Tyaari"* (the ritual of preparation and inner radiance).
   - Artisan statistics: 100% Handcrafted, 22K Gold Micro-Plating, Skin-Safe, Royal Velvet Box.

6. **Why Choose Tyaari:**
   - Bespoke gold line icons highlighting Premium Craftsmanship, Anti-Tarnish Finish, 7-Day Easy Returns, and Insured Packaging.

7. **The Royal Gallery / Lookbook:**
   - High-definition editorial lookbook.
   - Interactive Lightbox with touch navigation, keyboard controls (Arrow keys / Esc), and captions.

8. **Voices of Grace (Testimonials):**
   - Deep emerald background with gold verified stars.
   - Touch-swipe enabled on mobile, autoplay, and navigation dots.

9. **Newsletter / Inner Circle:**
   - 10% privilege discount banner with input validation and celebratory toast confirmation.

10. **Atelier Concierge & Contact:**
    - Interactive inquiry form with styling category selector.
    - Direct **WhatsApp Personal Stylist button** (+91 98765 43210).
    - Custom dark-styled map preview.

11. **Mini Cart & WhatsApp Checkout:**
    - Slide-out drawer with quantity controls and subtotal calculation.
    - **Free Shipping Progress Bar** (configurable threshold).
    - **WhatsApp Checkout:** Automatically formats the exact items, quantities, and order total into a pre-filled WhatsApp message for immediate concierge order placement.

---

## 📁 File Structure

```
tyarri/
├── index.html                   # Semantic HTML5 single-page structure
├── README.md                    # Project documentation & editing guide
├── assets/
│   ├── css/
│   │   └── style.css            # Mobile-first CSS architecture & design tokens
│   ├── js/
│   │   ├── products.js          # Products, categories, lookbook & brand settings
│   │   └── app.js               # Cart, wishlist, filters, lightbox, modals & UX
│   └── images/
│       ├── favicon.svg          # Bespoke monogram gold/emerald SVG favicon
│       ├── hero-kundan-set.jpg  # User's uploaded authentic Kundan & Emerald set
│       ├── earrings-chandbali-pair.jpg # Matching user earrings pair
│       ├── ...                  # Rings, Bracelets, Earrings, Mini Earrings photos
```

---

## 🛠️ How to Customize Products & Brand Details

You do **not** need to touch the HTML to change products, prices, or phone numbers. Simply edit `assets/js/products.js`:

### 1. Update Brand & Contact Info:
```javascript
const BRAND_CONFIG = {
  name: "Tyaari Jewellery",
  tagline: "Crafted to Shine. Made for You.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // Your WhatsApp number without '+' or spaces
  email: "concierge@tyaarijewellery.com",
  freeShippingThreshold: 5000 // In ₹
};
```

### 2. Add or Edit Products:
```javascript
{
  id: "ty-ring-001",
  name: "Noor Emerald Polki Cocktail Ring",
  category: "rings", // 'rings' | 'bracelets' | 'earrings' | 'mini-earrings'
  price: 14500,
  originalPrice: 17200,
  badge: "Bestseller",
  badgeType: "gold", // 'gold' | 'blush' | 'emerald'
  image: "assets/images/your-product.jpg",
  hoverImage: "assets/images/your-product-hover.jpg",
  rating: 4.9,
  reviewsCount: 29,
  description: "...",
  specs: ["22K Gold Micro-Plating", "Emerald Cut Stone", "Adjustable Band"]
}
```

---

## 🚀 How to Run & Preview

1. **Directly in Browser:**
   Double click `index.html` to open in Google Chrome, Edge, Safari, or Firefox.

2. **Using a Local Server (Recommended):**
   ```bash
   # Using Python:
   python -m http.server 8080

   # Or using Node:
   npx serve .
   ```
   Open `http://localhost:8080` in your browser.

3. **Deploying Online:**
   Drag and drop this entire folder into [Netlify Drop](https://app.netlify.com/drop), [Vercel](https://vercel.com), or push to GitHub Pages. It is 100% static, fast-loading, and requires zero build steps or dependencies.
