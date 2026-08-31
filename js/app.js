/* ==========================================================================
   YA.WARDA MAIN APPLICATION CONTROLLER
   ========================================================================== */

const App = {
  currentCategory: "all",
  activeProductModal: null,

  init() {
    this.renderProducts(PRODUCTS_DATA);
    this.bindNavigation();
    this.bindCategoryFilters();
    this.bindQuickViewModal();
    this.bindPincodeChecker();
    this.bindConciergeForm();
    this.bindFAQ();
    this.bindHeaderScroll();
    this.bindMobileNav();

    // Initialize subsystems
    CartManager.init();
    CustomizerEngine.init();
  },

  renderProducts(products) {
    const container = document.getElementById('products-grid-container');
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
          <p style="font-size: 1.1rem; color: var(--color-text-muted);">No luxury arrangements found in this category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-media">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <div class="product-badges">
            ${product.badge ? `<span class="badge badge-gold">${product.badge}</span>` : ''}
            <span class="badge badge-green">Same-Day Delivery</span>
          </div>
          <div class="product-actions-overlay">
            <button class="product-overlay-btn" onclick="App.openQuickView('${product.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Quick View
            </button>
            <button class="product-overlay-btn" onclick="App.quickAddToCart('${product.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Add to Bag
            </button>
          </div>
        </div>
        <div class="product-details">
          <div class="product-category-tag">${product.subtitle.split('·')[0]}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-flower-notes">${product.flowers}</p>
          
          <div class="product-price-row">
            <div class="product-price">
              ₹${product.price.toLocaleString('en-IN')}
              ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div style="font-size: 0.72rem; color: var(--color-accent-dark); font-weight: 500;">
              ★ ${product.rating} (${product.reviewCount})
            </div>
          </div>

          <div class="product-btn-row">
            <button class="btn btn-outline btn-sm" onclick="App.openQuickView('${product.id}')">Details</button>
            <button class="btn btn-whatsapp btn-sm" onclick="App.instantWhatsAppOrder('${product.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  bindCategoryFilters() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const category = tab.getAttribute('data-filter');
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (category === 'all') {
          this.renderProducts(PRODUCTS_DATA);
        } else {
          const filtered = PRODUCTS_DATA.filter(p => p.category === category || p.subCategory === category);
          this.renderProducts(filtered);
        }
      });
    });

    // Silhouette cards quick filter link
    document.querySelectorAll('[data-silhouette-filter]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const silhouette = link.getAttribute('data-silhouette-filter');
        const targetSection = document.getElementById('shop-section');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        const tab = document.querySelector(`.filter-tab[data-filter="${silhouette}"]`);
        if (tab) {
          tab.click();
        } else {
          const filtered = PRODUCTS_DATA.filter(p => p.subCategory === silhouette || p.category === silhouette);
          this.renderProducts(filtered);
        }
      });
    });
  },

  bindNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },

  bindHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  },

  bindMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const closeBtn = document.querySelector('.mobile-nav-close');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }
    document.querySelectorAll('.mobile-nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (drawer) drawer.classList.remove('open');
      });
    });
  },

  bindQuickViewModal() {
    const modalOverlay = document.getElementById('product-quick-view-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && modalOverlay) {
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  },

  openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    this.activeProductModal = {
      product: product,
      selectedStem: product.stemOptions ? product.stemOptions.find(s => s.default) || product.stemOptions[0] : null,
      selectedColor: product.boxColors ? product.boxColors[0] : "Signature",
      currentPrice: product.price
    };

    const modal = document.getElementById('product-quick-view-modal');
    const imgEl = document.getElementById('modal-product-img');
    const subtitleEl = document.getElementById('modal-product-subtitle');
    const titleEl = document.getElementById('modal-product-title');
    const descEl = document.getElementById('modal-product-desc');
    const flowersEl = document.getElementById('modal-product-flowers');
    const priceEl = document.getElementById('modal-product-price');
    const stemsContainer = document.getElementById('modal-stem-options');
    const colorsContainer = document.getElementById('modal-color-options');

    if (imgEl) imgEl.src = product.image;
    if (subtitleEl) subtitleEl.textContent = product.subtitle;
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) descEl.textContent = product.description;
    if (flowersEl) flowersEl.textContent = product.flowers;

    // Stem options
    if (stemsContainer) {
      if (product.stemOptions && product.stemOptions.length > 0) {
        stemsContainer.innerHTML = product.stemOptions.map(stem => `
          <button class="stem-opt-btn ${stem.default ? 'selected' : ''}" 
                  onclick="App.selectModalStem('${product.id}', '${stem.label}', ${stem.price}, this)">
            ${stem.label} — ₹${stem.price.toLocaleString('en-IN')}
          </button>
        `).join('');
      } else {
        stemsContainer.innerHTML = `<span style="font-size: 0.8rem; color: var(--color-text-muted);">Standard Haute Arrangement</span>`;
      }
    }

    // Color options
    if (colorsContainer) {
      if (product.boxColors && product.boxColors.length > 0) {
        colorsContainer.innerHTML = product.boxColors.map((col, idx) => `
          <button class="color-pill-btn ${idx === 0 ? 'selected' : ''}" 
                  onclick="App.selectModalColor('${col}', this)">
            ${col}
          </button>
        `).join('');
      }
    }

    this.updateModalPrice();

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  selectModalStem(productId, label, price, btnElement) {
    document.querySelectorAll('.stem-opt-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');
    if (this.activeProductModal) {
      this.activeProductModal.selectedStem = { label, price };
      this.activeProductModal.currentPrice = price;
      this.updateModalPrice();
    }
  },

  selectModalColor(colorName, btnElement) {
    document.querySelectorAll('.color-pill-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');
    if (this.activeProductModal) {
      this.activeProductModal.selectedColor = colorName;
    }
  },

  updateModalPrice() {
    const priceEl = document.getElementById('modal-product-price');
    if (priceEl && this.activeProductModal) {
      priceEl.textContent = `₹${this.activeProductModal.currentPrice.toLocaleString('en-IN')}`;
    }
  },

  modalAddToCart() {
    if (!this.activeProductModal) return;
    const { product, selectedStem, selectedColor, currentPrice } = this.activeProductModal;
    
    CartManager.addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      selectedStem: selectedStem ? selectedStem.label : "Standard",
      selectedColor: selectedColor,
      quantity: 1
    });

    document.getElementById('product-quick-view-modal').classList.remove('open');
    document.body.style.overflow = '';
    this.showToast(`${product.name} added to your Bag!`);
    CartManager.openDrawer();
  },

  modalWhatsAppOrder() {
    if (!this.activeProductModal) return;
    const { product, selectedStem, selectedColor } = this.activeProductModal;
    WhatsAppEngine.orderSingleProduct(product, {
      stemOption: selectedStem,
      boxColor: selectedColor
    });
  },

  quickAddToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    CartManager.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedStem: product.stemOptions ? product.stemOptions[0].label : "Standard",
      selectedColor: product.boxColors ? product.boxColors[0] : "Signature",
      quantity: 1
    });

    this.showToast(`${product.name} added to your Bag!`);
    CartManager.openDrawer();
  },

  instantWhatsAppOrder(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    WhatsAppEngine.orderSingleProduct(product);
  },

  bindPincodeChecker() {
    const input = document.getElementById('pincode-input');
    const checkBtn = document.getElementById('btn-check-pincode');
    const form = document.getElementById('pincode-check-form');

    const handleCheck = () => {
      if (!input) return;
      const rawValue = input.value.trim();
      const resultBox = document.getElementById('pincode-result') || document.getElementById('pincode-result-box');
      if (!rawValue) {
        if (resultBox) {
          resultBox.className = 'pincode-result error';
          resultBox.style.display = 'block';
          resultBox.innerHTML = `<span>Please enter a valid 6-digit Pincode (e.g. 670692, 673508) or town.</span>`;
        }
        return;
      }
      this.validatePincode(rawValue);
    };

    if (checkBtn) {
      checkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleCheck();
      });
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleCheck();
        }
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCheck();
      });
    }
  },

  checkSpecificLocation(pincode) {
    const input = document.getElementById('pincode-input');
    if (input) {
      input.value = pincode;
    }
    this.validatePincode(pincode);
  },

  async validatePincode(query) {
    const resultBox = document.getElementById('pincode-result') || document.getElementById('pincode-result-box');
    if (!resultBox) return;

    // Show loading state
    resultBox.className = 'pincode-result loading';
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="spinner" style="display: inline-block; width: 16px; height: 16px; border: 2px solid var(--color-accent); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        <span>Checking delivery availability for <strong>${query}</strong> via Postal Registry...</span>
      </div>
    `;

    const cleanPin = query.replace(/\D/g, '');
    let apiUrl = '';
    
    if (cleanPin.length === 6) {
      apiUrl = `https://api.postalpincode.in/pincode/${cleanPin}`;
    } else {
      apiUrl = `https://api.postalpincode.in/postoffice/${encodeURIComponent(query)}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Postal API network response error');
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0 || data[0].Status !== 'Success' || !data[0].PostOffice || data[0].PostOffice.length === 0) {
        resultBox.className = 'pincode-result warning';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #856404;">
              <span>📍 Location details not found in Postal Registry</span>
            </div>
            <p style="margin: 0; font-size: 0.84rem; color: #533f03;">
              We couldn't automatically verify "<strong>${query}</strong>". Please DM our Concierge on WhatsApp to confirm delivery to your exact address.
            </p>
            <div style="margin-top: 6px;">
              <a href="https://wa.me/919847000000?text=${encodeURIComponent(`Hello YA.WARDA, I would like to check delivery availability for location/pincode: ${query}`)}" 
                 target="_blank" 
                 class="btn btn-whatsapp btn-sm" 
                 style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                DM on WhatsApp for Delivery Check
              </a>
            </div>
          </div>
        `;
        return;
      }

      const postOffices = data[0].PostOffice;
      const primaryPO = postOffices[0];
      const district = (primaryPO.District || "").trim();
      const state = (primaryPO.State || "").trim();
      const poName = primaryPO.Name || query;
      const pin = primaryPO.Pincode || cleanPin || query;

      const normalizedDistrict = district.toLowerCase();
      // Check if District is Kannur or Kozhikode
      const isEligibleDistrict = normalizedDistrict.includes('kannur') || normalizedDistrict.includes('kozhikode') || normalizedDistrict.includes('calicut');

      if (isEligibleDistrict) {
        resultBox.className = 'pincode-result success';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.95rem;">
              <span>✨ Delivery Available in ${poName}, ${district} (${pin})!</span>
            </div>
            <p style="margin: 0; font-size: 0.84rem; line-height: 1.5;">
              • <strong>Same-Day Express Delivery</strong> & <strong>Midnight Surprise</strong> slots available across ${district} District.<br>
              • Handcrafted farm-fresh bouquets dispatched directly from our Kuttiady & Kozhikode ateliers.
            </p>
            <div style="display: flex; gap: 10px; margin-top: 6px; flex-wrap: wrap;">
              <a href="#shop-section" class="btn btn-primary btn-sm" style="padding: 6px 14px;">Explore Catalog</a>
              <a href="https://wa.me/919847000000?text=${encodeURIComponent(`Hello YA.WARDA, I checked pincode ${pin} (${poName}, ${district}) and delivery is available. I would like to place an order.`)}" 
                 target="_blank" 
                 class="btn btn-whatsapp btn-sm" 
                 style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        `;
      } else {
        // District is outside Kannur and Kozhikode
        resultBox.className = 'pincode-result warning';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #856404; font-size: 0.95rem;">
              <span>💬 DM for More Info (${poName}, ${district}, ${state} - ${pin})</span>
            </div>
            <p style="margin: 0; font-size: 0.84rem; color: #533f03; line-height: 1.5;">
              This address is in <strong>${district}</strong> district. Standard automated same-day delivery covers <strong>Kannur</strong> & <strong>Kozhikode</strong>. Special long-distance courier / custom delivery may be arranged upon request.
            </p>
            <div style="margin-top: 6px;">
              <a href="https://wa.me/919847000000?text=${encodeURIComponent(`Hello YA.WARDA, I would like to inquire about special flower delivery to ${poName}, ${district} (Pincode: ${pin}).`)}" 
                 target="_blank" 
                 class="btn btn-whatsapp btn-sm" 
                 style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                DM Us on WhatsApp for Delivery Info
              </a>
            </div>
          </div>
        `;
      }

    } catch (error) {
      console.warn("Pincode API error, providing graceful fallback:", error);
      const isKnownDistrict = ['673508', '673001', '673101', '673525', '673504', '673305', '670692', '670001'].some(p => query.includes(p)) ||
                              ['kuttiady', 'calicut', 'kozhikode', 'kannur', 'vadakara', 'perambra', 'panoor', 'thalassery'].some(k => query.toLowerCase().includes(k));

      if (isKnownDistrict) {
        resultBox.className = 'pincode-result success';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-weight: 600; font-size: 0.95rem;">✨ Delivery Available in ${query}!</div>
            <p style="margin: 0; font-size: 0.84rem;">Same-Day Express Delivery & Midnight slots available across Kannur & Kozhikode.</p>
            <div style="margin-top: 4px;">
              <a href="https://wa.me/919847000000?text=${encodeURIComponent(`Hello YA.WARDA, I would like to order flowers for delivery to ${query}.`)}" target="_blank" class="btn btn-whatsapp btn-sm">Order on WhatsApp</a>
            </div>
          </div>
        `;
      } else {
        resultBox.className = 'pincode-result warning';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-weight: 600; color: #856404;">💬 DM for Delivery Info (${query})</div>
            <p style="margin: 0; font-size: 0.84rem; color: #533f03;">Please DM our Concierge on WhatsApp to confirm delivery to your location.</p>
            <div style="margin-top: 4px;">
              <a href="https://wa.me/919847000000?text=${encodeURIComponent(`Hello YA.WARDA, I would like to check delivery to: ${query}`)}" target="_blank" class="btn btn-whatsapp btn-sm">DM on WhatsApp for Delivery Info</a>
            </div>
          </div>
        `;
      }
    }
  },

  bindConciergeForm() {
    const form = document.getElementById('concierge-vip-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById('concierge-name').value.trim(),
          phone: document.getElementById('concierge-phone').value.trim(),
          occasion: document.getElementById('concierge-occasion').value,
          location: document.getElementById('concierge-location').value,
          notes: document.getElementById('concierge-notes').value.trim()
        };
        WhatsAppEngine.inquireConcierge(data);
      });
    }
  },

  bindFAQ() {
    document.querySelectorAll('.faq-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  },

  showToast(message, type = "success") {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

// Auto-run on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
