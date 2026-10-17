/**
 * TYAARI JEWELLERY - Interactive Application Script
 * 
 * Features:
 * - Cart management with LocalStorage & WhatsApp order generation
 * - Wishlist management with LocalStorage
 * - Category & Product dynamic rendering with smooth filtering
 * - Interactive Lookbook Lightbox with navigation
 * - Touch-enabled Testimonial carousel
 * - Quick-view modal with specification details
 * - Real-time product search
 * - Mobile navigation menu & sticky header blur
 * - Toast notification feedback
 * - Scroll reveal animations
 */

// --- Global State ---
let cart = JSON.parse(localStorage.getItem('tyaari_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('tyaari_wishlist')) || [];
let currentCategoryFilter = 'all';
let currentLightboxIndex = 0;
let currentTestimonialIndex = 0;
let testimonialAutoTimer = null;

// --- Helper Functions ---
function formatPrice(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

function showToast(message, type = 'gold') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.35s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// --- DOM Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderCategories();
  renderProducts();
  initCatalogFilters();
  initTestimonials();
  initLookbook();
  initCart();
  initWishlist();
  initSearch();
  initContactForm();
  initNewsletterForm();
  initScrollEffects();
  updateHeaderCounters();
});

// --- 1. Sticky Header & Mobile Nav ---
function initHeader() {
  const header = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  // Sticky header transition & back to top
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  // Mobile menu toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.classList.toggle('modal-open', isOpen);
  });

  // Close mobile nav when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  });

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- 2. Render Shop by Category ---
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container || !CATEGORIES) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" data-category="${cat.id}">
      <div class="category-img-wrap">
        <img src="${cat.image}" alt="${cat.name} Collection" loading="lazy" />
        <span class="category-count">${cat.itemCount}</span>
      </div>
      <div class="category-info">
        <div>
          <h3 class="category-title">${cat.name}</h3>
          <p class="category-tagline">${cat.tagline}</p>
        </div>
        <span class="category-cta">Explore →</span>
      </div>
    </div>
  `).join('');

  // Click on category card filters product grid & scrolls smoothly
  container.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.getAttribute('data-category');
      applyCategoryFilter(catId);
      
      const catalogEl = document.getElementById('collection');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// --- 3. Render Product Catalog & Filtering ---
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container || !PRODUCTS) return;

  const filtered = currentCategoryFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === currentCategoryFilter);

  container.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const badgeHtml = product.badge ? `
      <span class="badge badge-${product.badgeType || 'gold'}">${product.badge}</span>
    ` : '';

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-thumb-wrap">
          <div class="product-badge-wrap">
            ${badgeHtml}
          </div>
          <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                  data-id="${product.id}" 
                  aria-label="Save to Wishlist"
                  title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <img src="${product.image}" alt="${product.name}" class="product-thumb" loading="lazy" />
          <img src="${product.hoverImage || product.image}" alt="${product.name} alternate angle" class="product-thumb-hover" loading="lazy" />
          
          <button class="quickview-btn" data-id="${product.id}">
            Quick View
          </button>
        </div>

        <div class="product-details">
          <div>
            <span class="product-category-name">${product.category.replace('-', ' ')}</span>
            <h3 class="product-name" title="${product.name}">${product.name}</h3>
            
            <div class="product-rating">
              <svg class="star-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${product.rating.toFixed(1)}</span>
              <span class="review-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="product-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
          </div>

          <button class="add-cart-btn" data-id="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </article>
    `;
  }).join('');

  attachProductCardEvents();
}

function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyCategoryFilter(filter);
    });
  });
}

function applyCategoryFilter(catId) {
  currentCategoryFilter = catId;
  
  // Update buttons
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === catId);
  });

  // Re-render products with a smooth fade
  const container = document.getElementById('products-grid');
  if (container) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';
    setTimeout(() => {
      renderProducts();
      container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 200);
  }
}

function attachProductCardEvents() {
  // Add to cart buttons
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      addToCart(id);
    });
  });

  // Wishlist buttons
  document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleWishlist(id);
    });
  });

  // Quick view buttons
  document.querySelectorAll('.quickview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openQuickView(id);
    });
  });
}

// --- 4. Shopping Cart Functionality ---
function initCart() {
  const cartToggleBtns = document.querySelectorAll('.cart-open-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const whatsappCheckoutBtn = document.getElementById('btn-whatsapp-checkout');

  cartToggleBtns.forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });

  cartCloseBtn?.addEventListener('click', closeCartDrawer);
  cartOverlay?.addEventListener('click', closeCartDrawer);

  whatsappCheckoutBtn?.addEventListener('click', handleWhatsAppCheckout);

  renderCart();
}

function openCartDrawer() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  cartDrawer?.classList.add('open');
  cartOverlay?.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeCartDrawer() {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  cartDrawer?.classList.remove('open');
  cartOverlay?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart();
  renderCart();
  updateHeaderCounters();
  openCartDrawer();
  showToast(`Added "${product.name}" to your cart!`, 'emerald');
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
    showToast(`Removed from cart`, 'gold');
  }

  saveCart();
  renderCart();
  updateHeaderCounters();
}

function removeCartItem(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCart();
  updateHeaderCounters();
  showToast(`Item removed from cart`, 'gold');
}

function saveCart() {
  localStorage.setItem('tyaari_cart', JSON.stringify(cart));
}

function renderCart() {
  const body = document.getElementById('cart-drawer-body');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingMsgEl = document.getElementById('shipping-threshold-msg');
  const shippingBarFill = document.getElementById('shipping-bar-fill');
  const checkoutBtn = document.getElementById('btn-whatsapp-checkout');

  if (!body) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

  // Free Shipping Calculation
  const threshold = BRAND_CONFIG.freeShippingThreshold;
  if (shippingMsgEl && shippingBarFill) {
    if (subtotal >= threshold) {
      shippingMsgEl.innerHTML = `<strong class="text-mint">🎉 Congratulations!</strong> You have unlocked Free Insured Express Delivery.`;
      shippingBarFill.style.width = '100%';
    } else {
      const diff = threshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      shippingMsgEl.innerHTML = `Add <strong>${formatPrice(diff)}</strong> more to unlock Free Insured Express Delivery.`;
      shippingBarFill.style.width = `${pct}%`;
    }
  }

  // Empty state vs Cart list
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-state">
        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h4 class="cart-empty-title">Your Jewel Box is Empty</h4>
        <p class="cart-empty-text">Discover our royal polki, emerald, and handcrafted kundan treasures.</p>
        <button class="btn btn-outline-gold" onclick="closeCartDrawer(); document.getElementById('collection')?.scrollIntoView({behavior:'smooth'});">
          Explore Collection
        </button>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.style.display = 'none';
  } else {
    if (checkoutBtn) checkoutBtn.style.display = 'flex';
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)" aria-label="Decrease quantity">-</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Order checkout generated directly into WhatsApp concierge
function handleWhatsAppCheckout() {
  if (cart.length === 0) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let message = `Namaste Tyaari Concierge! ✨\nI would like to place an order for the following handcrafted pieces:\n\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} | Price: ${formatPrice(item.price * item.quantity)}\n`;
  });

  message += `\n*Total Order Value:* ${formatPrice(subtotal)}`;
  message += `\n\nPlease confirm availability and payment details. Thank you!`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${BRAND_CONFIG.whatsapp}?text=${encoded}`;
  window.open(waUrl, '_blank');
}

// --- 5. Wishlist Functionality ---
function initWishlist() {
  const wishlistToggleBtns = document.querySelectorAll('.wishlist-open-btn');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistOverlay = document.getElementById('wishlist-drawer-overlay');
  const wishlistCloseBtn = document.getElementById('wishlist-close-btn');

  wishlistToggleBtns.forEach(btn => {
    btn.addEventListener('click', openWishlistDrawer);
  });

  wishlistCloseBtn?.addEventListener('click', closeWishlistDrawer);
  wishlistOverlay?.addEventListener('click', closeWishlistDrawer);

  renderWishlist();
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  renderWishlist();
  drawer?.classList.add('open');
  overlay?.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  drawer?.classList.remove('open');
  overlay?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed from your wishlist`, 'gold');
  } else {
    wishlist.push(productId);
    showToast(`Saved "${product?.name || 'piece'}" to Wishlist!`, 'blush');
  }

  localStorage.setItem('tyaari_wishlist', JSON.stringify(wishlist));
  updateHeaderCounters();
  renderProducts(); // refresh heart icon fill
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlist-drawer-body');
  if (!container) return;

  const items = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <h4 class="cart-empty-title">Your Wishlist is Empty</h4>
        <p class="cart-empty-text">Tap the heart icon on any jewellery piece to save it for your bridal trousseau or festive moments.</p>
      </div>
    `;
  } else {
    container.innerHTML = items.map(product => `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-name">${product.name}</h4>
            <div class="cart-item-price">${formatPrice(product.price)}</div>
          </div>
          <div class="cart-item-actions">
            <button class="btn btn-emerald" style="padding: 0.4rem 0.85rem; font-size: 0.7rem; min-height: 36px;" onclick="addToCart('${product.id}'); toggleWishlist('${product.id}');">
              Move to Cart
            </button>
            <button class="cart-item-remove" onclick="toggleWishlist('${product.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function updateHeaderCounters() {
  const cartCounts = document.querySelectorAll('.cart-count-badge');
  const wishlistCounts = document.querySelectorAll('.wishlist-count-badge');

  const totalCart = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounts.forEach(el => el.textContent = totalCart);

  const totalWishlist = wishlist.length;
  wishlistCounts.forEach(el => el.textContent = totalWishlist);
}

// --- 6. Quick View Modal ---
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickview-modal');
  const modalBody = document.getElementById('quickview-content-target');
  if (!modal || !modalBody) return;

  const specsHtml = product.specs ? `
    <ul class="qv-specs-list">
      ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
    </ul>
  ` : '';

  modalBody.innerHTML = `
    <div class="quickview-media">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="quickview-details">
      <div>
        <span class="product-category-name">${product.category.replace('-', ' ')}</span>
        <h3 class="product-name" style="font-size: 1.8rem; margin: 0.5rem 0;">${product.name}</h3>
        
        <div class="product-rating" style="margin-bottom: 1rem;">
          <svg class="star-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${product.rating.toFixed(1)}</span>
          <span class="review-count">(${product.reviewsCount} verified reviews)</span>
        </div>

        <div class="product-price-row" style="margin-bottom: 1.25rem;">
          <span class="product-price" style="font-size: 1.5rem;">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="product-original-price" style="font-size: 1.1rem;">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>

        <p style="font-size: 0.9rem; color: var(--color-text-muted-light); line-height: 1.6;">${product.description}</p>
        
        ${specsHtml}
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
        <button class="btn btn-emerald" style="flex: 1;" onclick="addToCart('${product.id}'); closeQuickView();">
          Add to Cart
        </button>
        <button class="btn btn-outline-gold" onclick="buyViaWhatsApp('${product.id}')">
          Buy on WhatsApp
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  modal?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

function buyViaWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const msg = `Namaste Tyaari! ✨\nI am interested in purchasing the *${product.name}* (${formatPrice(product.price)}).\nPlease share availability and order steps.`;
  const url = `https://wa.me/${BRAND_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Close quickview on click outside
document.getElementById('quickview-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'quickview-modal') {
    closeQuickView();
  }
});
document.getElementById('quickview-close-btn')?.addEventListener('click', closeQuickView);

// --- 7. Lookbook Gallery & Lightbox ---
function initLookbook() {
  const container = document.getElementById('lookbook-grid');
  if (!container || !LOOKBOOK) return;

  container.innerHTML = LOOKBOOK.map((item, idx) => `
    <div class="lookbook-item" data-index="${idx}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="lookbook-overlay">
        <span class="lookbook-tag">${item.category}</span>
        <h4 class="lookbook-heading">${item.title}</h4>
        <span class="lookbook-zoom-cta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          View Lookbook
        </span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.lookbook-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(idx);
    });
  });

  // Lightbox controls
  document.getElementById('lightbox-close-btn')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev-btn')?.addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightbox-next-btn')?.addEventListener('click', () => navigateLightbox(1));

  document.getElementById('lightbox-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-modal') closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal?.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById('lightbox-modal');
  modal?.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

function navigateLightbox(dir) {
  currentLightboxIndex += dir;
  if (currentLightboxIndex < 0) currentLightboxIndex = LOOKBOOK.length - 1;
  if (currentLightboxIndex >= LOOKBOOK.length) currentLightboxIndex = 0;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = LOOKBOOK[currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const catEl = document.getElementById('lightbox-category');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');
  const tagsEl = document.getElementById('lightbox-tags');

  if (imgEl) imgEl.src = item.image;
  if (catEl) catEl.textContent = item.category;
  if (titleEl) titleEl.textContent = item.title;
  if (captionEl) captionEl.textContent = item.caption;
  if (tagsEl) {
    tagsEl.innerHTML = item.tags.map(t => `<span class="badge badge-gold" style="font-size: 0.65rem;">#${t}</span>`).join(' ');
  }
}

// --- 8. Testimonials Carousel ---
function initTestimonials() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!track || !TESTIMONIALS) return;

  // Render slides
  track.innerHTML = TESTIMONIALS.map((item, idx) => `
    <div class="testimonial-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <div class="testimonial-stars">
        ${Array(item.rating).fill(`
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        `).join('')}
      </div>
      <p class="testimonial-quote">"${item.comment}"</p>
      <h4 class="testimonial-author">${item.name}</h4>
      <div class="testimonial-meta">
        <span>${item.location}</span>
        <span>•</span>
        <span>Verified Buyer</span>
      </div>
    </div>
  `).join('');

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = TESTIMONIALS.map((_, idx) => `
      <div class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
    `).join('');

    dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goToTestimonial(idx);
      });
    });
  }

  prevBtn?.addEventListener('click', () => {
    goToTestimonial(currentTestimonialIndex - 1);
    restartTestimonialAuto();
  });

  nextBtn?.addEventListener('click', () => {
    goToTestimonial(currentTestimonialIndex + 1);
    restartTestimonialAuto();
  });

  // Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) {
      goToTestimonial(currentTestimonialIndex + 1);
      restartTestimonialAuto();
    }
    if (touchEndX > touchStartX + 40) {
      goToTestimonial(currentTestimonialIndex - 1);
      restartTestimonialAuto();
    }
  }, { passive: true });

  startTestimonialAuto();
}

function goToTestimonial(index) {
  if (index < 0) index = TESTIMONIALS.length - 1;
  if (index >= TESTIMONIALS.length) index = 0;
  currentTestimonialIndex = index;

  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentTestimonialIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentTestimonialIndex);
  });
}

function startTestimonialAuto() {
  testimonialAutoTimer = setInterval(() => {
    goToTestimonial(currentTestimonialIndex + 1);
  }, 6500);
}

function restartTestimonialAuto() {
  clearInterval(testimonialAutoTimer);
  startTestimonialAuto();
}

// --- 9. Live Search Modal ---
function initSearch() {
  const searchOpenBtns = document.querySelectorAll('.search-open-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input-field');
  const resultsContainer = document.getElementById('search-results-list');

  searchOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      searchModal?.classList.add('open');
      document.body.classList.add('modal-open');
      setTimeout(() => searchInput?.focus(), 100);
    });
  });

  searchCloseBtn?.addEventListener('click', () => {
    searchModal?.classList.remove('open');
    document.body.classList.remove('modal-open');
  });

  searchModal?.addEventListener('click', (e) => {
    if (e.target.id === 'search-modal') {
      searchModal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!resultsContainer) return;

    if (!q) {
      resultsContainer.innerHTML = `<p style="text-align: center; color: var(--color-text-muted-light); font-size: 0.9rem;">Type to search rings, earrings, bracelets, polki, and emeralds...</p>`;
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p style="text-align: center; color: var(--color-text-muted-light); font-size: 0.9rem;">No jewellery pieces found matching "${q}".</p>`;
    } else {
      resultsContainer.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="openQuickView('${p.id}'); document.getElementById('search-modal').classList.remove('open');">
          <img src="${p.image}" alt="${p.name}" class="search-result-thumb" />
          <div style="flex-grow: 1;">
            <div style="font-size: 0.72rem; color: var(--color-gold); text-transform: uppercase;">${p.category}</div>
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-cream);">${p.name}</h4>
            <div style="font-size: 0.88rem; color: var(--color-mint); font-weight: 600;">${formatPrice(p.price)}</div>
          </div>
          <span style="font-size: 0.78rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.1em;">View →</span>
        </div>
      `).join('');
    }
  });
}

// --- 10. Forms & Interactions ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || 'Guest';
    showToast(`Thank you, ${name}. Our personal stylist will contact you shortly!`, 'emerald');
    form.reset();
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value;
    if (email) {
      showToast(`Welcome to the Inner Circle! Your 10% privilege code has been sent.`, 'emerald');
      form.reset();
    }
  });
}

// --- 11. Subtle Scroll Reveal Animations ---
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
