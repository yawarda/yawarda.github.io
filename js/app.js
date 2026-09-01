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

    container.innerHTML = products.map(product => {
      const delivery = getProductDeliveryInfo(product);
      const coverImage = Array.isArray(product.image) ? product.image[0] : product.image;
      return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-media">
          <img src="${coverImage}" alt="${product.name}" class="product-img" loading="lazy">
          <div class="product-badges">
            ${product.badge ? `<span class="badge badge-gold">${product.badge}</span>` : ''}
            <span class="badge ${delivery.badgeClass}">${delivery.badgeText}</span>
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
            <button class="btn btn-dm btn-sm" onclick="App.instantWhatsAppOrder('${product.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Send DM
            </button>
          </div>
        </div>
      </div>
      `;
    }).join('');
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

    const delivery = getProductDeliveryInfo(product);

    // Extract all images (supports image as array or string, images array, secondaryImage)
    const allImages = [];
    if (Array.isArray(product.image)) {
      allImages.push(...product.image);
    } else if (product.image) {
      allImages.push(product.image);
    }
    if (Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (!allImages.includes(img)) allImages.push(img);
      });
    }
    if (product.secondaryImage && !allImages.includes(product.secondaryImage)) {
      allImages.push(product.secondaryImage);
    }

    const coverImage = allImages[0] || (Array.isArray(product.image) ? product.image[0] : product.image) || '';
    if (imgEl) {
      imgEl.src = coverImage;
      imgEl.style.opacity = '1';
    }

    // Populate gallery thumbnails if multiple photos exist
    const thumbsContainer = document.getElementById('modal-thumbnails-container');
    if (thumbsContainer) {
      if (allImages.length > 1) {
        thumbsContainer.style.display = 'flex';
        thumbsContainer.innerHTML = allImages.map((src, idx) => `
          <button class="modal-thumb-btn ${idx === 0 ? 'active' : ''}" 
                  onclick="App.switchModalImage('${src}', this)" 
                  aria-label="View Photo ${idx + 1}">
            <img src="${src}" alt="${product.name} Photo ${idx + 1}">
          </button>
        `).join('');
      } else {
        thumbsContainer.style.display = 'none';
        thumbsContainer.innerHTML = '';
      }
    }

    if (subtitleEl) subtitleEl.textContent = `${product.subtitle} · ${delivery.badgeText}`;
    if (titleEl) titleEl.textContent = product.name;
    if (descEl) {
      descEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #166534; font-weight: 600; background: #F0FDF4; border: 1px solid #BBF7D0; padding: 6px 12px; border-radius: 4px; margin-bottom: 12px;">
          <span>🚚</span>
          <span>${delivery.detailText} across Kozhikode & Kannur</span>
        </div>
        <div>${product.description}</div>
      `;
    }
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

    // Date and location initialization
    const dateInput = document.getElementById('modal-delivery-date');
    if (dateInput) {
      const today = new Date();
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + (delivery.days || 1));
      const dateStr = targetDate.toISOString().split('T')[0];
      const todayStr = today.toISOString().split('T')[0];
      dateInput.min = todayStr;
      dateInput.value = dateStr;
    }

    this.updateModalPrice();

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  switchModalImage(src, btnElement) {
    const mainImg = document.getElementById('modal-product-img');
    if (mainImg) {
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
      }, 120);
    }
    if (btnElement) {
      document.querySelectorAll('.modal-thumb-btn').forEach(b => b.classList.remove('active'));
      btnElement.classList.add('active');
    }
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
    const coverImage = Array.isArray(product.image) ? product.image[0] : product.image;
    
    CartManager.addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: coverImage,
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

    const dateInput = document.getElementById('modal-delivery-date');
    const slotInput = document.getElementById('modal-delivery-slot');
    const locationInput = document.getElementById('modal-delivery-location');

    InstagramEngine.orderSingleProduct(product, {
      stemOption: selectedStem,
      boxColor: selectedColor,
      deliveryDate: dateInput ? dateInput.value : '',
      deliverySlot: slotInput ? slotInput.value : '',
      location: locationInput ? locationInput.value.trim() : ''
    });
  },

  quickAddToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    const coverImage = Array.isArray(product.image) ? product.image[0] : product.image;

    CartManager.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: coverImage,
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
    InstagramEngine.orderSingleProduct(product);
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
              <a href="https://ig.me/m/ya.warda_?text=${encodeURIComponent(`Hello YA.WARDA, I would like to check delivery availability for location/pincode: ${query}`)}" 
                 target="_blank" 
                 class="btn btn-dm btn-sm" 
                 style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                DM on Instagram for Delivery Check
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
              • <strong>Standard Bouquets:</strong> Delivery within <strong>1 Day</strong>.<br>
              • <strong>Lilies Collections:</strong> Delivery within <strong>3 Days</strong>.<br>
              • <strong>Tulips Collections:</strong> Delivery within <strong>4 Days</strong>.<br>
              • Handcrafted farm-fresh bouquets dispatched directly from our Kuttiady atelier.
            </p>
            <div style="display: flex; gap: 10px; margin-top: 6px; flex-wrap: wrap;">
              <a href="#shop-section" class="btn btn-primary btn-sm" style="padding: 6px 14px;">Explore Catalog</a>
              <a href="https://ig.me/m/ya.warda_?text=${encodeURIComponent(`Hello YA.WARDA, I checked pincode ${pin} (${poName}, ${district}) and delivery is available. I would like to place an order.`)}" 
                 target="_blank" 
                 class="btn btn-dm btn-sm" 
                 style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Order via Instagram DM
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
              This address is in <strong>${district}</strong> district. Standard delivery coverage includes <strong>Kannur</strong> & <strong>Kozhikode</strong>. Special courier / custom delivery may be arranged upon request.
            </p>
            <div style="margin-top: 6px;">
              <a href="https://ig.me/m/ya.warda_?text=${encodeURIComponent(`Hello YA.WARDA, I would like to inquire about special flower delivery to ${poName}, ${district} (Pincode: ${pin}).`)}" 
                 target="_blank" 
                 class="btn btn-dm btn-sm" 
                 style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                DM Us on Instagram for Delivery Info
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
            <p style="margin: 0; font-size: 0.84rem;">Delivery within 1 Day (Lilies: 3 Days, Tulips & Hydrangeas: 4 Days) across Kannur & Kozhikode.</p>
            <div style="margin-top: 4px;">
              <a href="https://ig.me/m/ya.warda_?text=${encodeURIComponent(`Hello YA.WARDA, I would like to order flowers for delivery to ${query}.`)}" target="_blank" class="btn btn-dm btn-sm">Order on Instagram DM</a>
            </div>
          </div>
        `;
      } else {
        resultBox.className = 'pincode-result warning';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-weight: 600; color: #856404;">💬 DM for Delivery Info (${query})</div>
            <p style="margin: 0; font-size: 0.84rem; color: #533f03;">Please DM our Concierge on Instagram to confirm delivery to your location.</p>
            <div style="margin-top: 4px;">
              <a href="https://ig.me/m/ya.warda_?text=${encodeURIComponent(`Hello YA.WARDA, I would like to check delivery to: ${query}`)}" target="_blank" class="btn btn-dm btn-sm">DM on Instagram for Delivery Info</a>
            </div>
          </div>
        `;
      }
    }
  },

  handleConciergeSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const name = (document.getElementById('inq-name')?.value || '').trim();
    const date = (document.getElementById('inq-date')?.value || '').trim();
    const time = (document.getElementById('inq-time')?.value || '').trim();
    const details = (document.getElementById('inq-details')?.value || '').trim();

    let msg = `🌸 *CUSTOM BOUQUET INQUIRY — YA.WARDA*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Customer Name:* ${name || 'Customer'}\n`;
    msg += `📅 *Delivery Date:* ${date || '[Not specified]'}\n`;
    if (time) msg += `⏰ *Preferred Time:* ${time}\n`;
    msg += `💐 *Bouquet & Flower Requirement:*\n${details}\n`;
    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello YA.WARDA Master Florist, I would like to customize a fresh bouquet. Please confirm availability & pricing on WhatsApp! ✨`;

    const whatsappNumber = "916235828338";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  bindConciergeForm() {
    const quickForm = document.getElementById('quick-concierge-form');
    if (quickForm) {
      quickForm.addEventListener('submit', (e) => this.handleConciergeSubmit(e));
    }

    const vipForm = document.getElementById('concierge-vip-form');
    if (vipForm) {
      vipForm.addEventListener('submit', (e) => this.handleConciergeSubmit(e));
    }

    // Set min date on inq-date to today
    const inqDate = document.getElementById('inq-date');
    if (inqDate) {
      const todayStr = new Date().toISOString().split('T')[0];
      inqDate.min = todayStr;
      if (!inqDate.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        inqDate.value = tomorrow.toISOString().split('T')[0];
      }
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
