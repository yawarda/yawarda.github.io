/* ==========================================================================
   YA.WARDA CART & GIFT MESSAGE SCHEDULER
   ========================================================================== */

const CartManager = {
  state: {
    items: [],
    subtotal: 0,
    discount: 0,
    shipping: 0, // Free delivery in Kuttiady & Calicut
    total: 0,
    promoCode: "",
    recipientName: "",
    deliveryAddress: "",
    deliveryCity: "Kuttiady / Calicut",
    deliveryDate: "",
    deliverySlot: "Evening (4:00 PM – 8:00 PM)"
  },

  STORAGE_KEY: "yawarda_luxury_cart",
  config: {
    promoCodes: []
  },

  async init() {
    await this.loadConfig();
    this.loadFromStorage();
    this.bindEvents();
    this.render();
  },

  async loadConfig() {
    try {
      const response = await fetch("config.json");
      if (!response.ok) throw new Error(`Config request failed: ${response.status}`);
      const config = await response.json();
      this.config = {
        promoCodes: Array.isArray(config.promoCodes)
          ? config.promoCodes
            .filter(promo => promo && promo.code)
            .map(promo => ({
              code: String(promo.code).trim().toUpperCase(),
              discount: Number.isFinite(Number(promo.discount)) ? Number(promo.discount) : 0,
              description: String(promo.description || "").trim()
            }))
          : []
      };
    } catch (e) {
      console.error("Failed to load application config", e);
    }
  },

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state.items = parsed.items || [];
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        items: this.state.items
      }));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  },

  bindEvents() {
    // Cart open trigger
    document.querySelectorAll('.cart-open-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Cart close trigger
    const closeBtn = document.querySelector('.cart-close-btn');
    const overlay = document.querySelector('.cart-drawer-overlay');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeDrawer();
      });
    }

    // Instagram DM checkout button inside drawer
    const waCheckoutBtn = document.getElementById('btn-cart-whatsapp-checkout');
    if (waCheckoutBtn) {
      waCheckoutBtn.addEventListener('click', () => {
        this.collectGiftDetails();
        InstagramEngine.checkoutCart(this.state);
      });
    }

    // Promo code apply
    const promoBtn = document.getElementById('btn-apply-promo');
    const promoInput = document.getElementById('cart-promo-input');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        const promo = this.config.promoCodes.find(item => item.code === code);
        if (promo) {
          this.state.promoCode = code;
          App.showToast(promo.description || `${promo.discount}% Privilege Discount Applied!`);
        } else if (code === "") {
          this.state.discount = 0;
          this.state.promoCode = "";
        } else {
          App.showToast("Invalid promo code", "error");
        }
        this.render();
      });
    }
  },

  openDrawer() {
    const overlay = document.querySelector('.cart-drawer-overlay');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    const overlay = document.querySelector('.cart-drawer-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  addItem(productItem) {
    const cleanStem = productItem.selectedStem || "";
    const cleanColor = productItem.selectedColor || "";

    // Check if duplicate exists with same stem & color
    const existingIndex = this.state.items.findIndex(
      item => item.id === productItem.id &&
        (item.selectedStem || "") === cleanStem &&
        (item.selectedColor || "") === cleanColor
    );

    if (existingIndex > -1) {
      this.state.items[existingIndex].quantity += (productItem.quantity || 1);
    } else {
      this.state.items.push({
        id: productItem.id,
        name: productItem.name,
        price: productItem.price,
        image: productItem.image,
        selectedStem: cleanStem,
        selectedColor: cleanColor,
        quantity: productItem.quantity || 1
      });
    }

    this.saveToStorage();
    this.render();

    if (typeof gtag === 'function') {
      gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: (productItem.price || 0) * (productItem.quantity || 1),
        items: [{
          item_id: productItem.id,
          item_name: productItem.name,
          price: productItem.price,
          quantity: productItem.quantity || 1,
          item_variant: [cleanStem, cleanColor].filter(Boolean).join(' / ')
        }]
      });
    }
  },

  updateQuantity(index, delta) {
    if (!this.state.items[index]) return;
    this.state.items[index].quantity += delta;
    if (this.state.items[index].quantity <= 0) {
      this.state.items.splice(index, 1);
    }
    this.saveToStorage();
    this.render();
  },

  removeItem(index) {
    if (!this.state.items[index]) return;
    this.state.items.splice(index, 1);
    this.saveToStorage();
    this.render();
  },

  collectGiftDetails() {
    const recipient = document.getElementById('cart-recipient-name');
    const address = document.getElementById('cart-delivery-address');
    const city = document.getElementById('cart-delivery-city');
    const date = document.getElementById('cart-delivery-date');
    const slot = document.getElementById('cart-delivery-slot');

    if (recipient) this.state.recipientName = recipient.value.trim();
    if (address) this.state.deliveryAddress = address.value.trim();
    if (city) this.state.deliveryCity = city.value;
    if (date) this.state.deliveryDate = date.value;
    if (slot) this.state.deliverySlot = slot.value;
  },

  calculateTotals() {
    this.state.subtotal = this.state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const promo = this.config.promoCodes.find(item => item.code === this.state.promoCode);
    if (promo && this.state.subtotal > 0) {
      this.state.discount = Math.round(this.state.subtotal * promo.discount / 100);
    } else {
      this.state.discount = 0;
    }
    this.state.total = Math.max(0, this.state.subtotal - this.state.discount + this.state.shipping);
  },

  render() {
    this.calculateTotals();

    // Update Header Counter Badges
    const totalCount = this.state.items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count-badge').forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    const itemsContainer = document.getElementById('cart-drawer-items-list');
    const emptyState = document.getElementById('cart-empty-state');
    const footer = document.querySelector('.cart-drawer-footer');
    const cardEditor = document.querySelector('.cart-card-editor');

    if (!itemsContainer) return;

    if (this.state.items.length === 0) {
      itemsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (footer) footer.style.display = 'none';
      if (cardEditor) cardEditor.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'block';
    if (cardEditor) cardEditor.style.display = 'block';

    itemsContainer.innerHTML = this.state.items.map((item, index) => {
      const metaParts = [item.selectedStem, item.selectedColor].filter(Boolean);
      const metaHtml = metaParts.length > 0 ? `<div class="cart-item-meta">${metaParts.join(' · ')}</div>` : '';

      return `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          ${metaHtml}
          <div class="cart-item-bottom">
            <div class="cart-qty-ctrl">
              <button class="cart-qty-btn" onclick="CartManager.updateQuantity(${index}, -1)">−</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="CartManager.updateQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>
      `;
    }).join('');

    // Update summary values
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount-val');
    const totalEl = document.getElementById('cart-total-val');

    if (subtotalEl) subtotalEl.textContent = `₹${this.state.subtotal.toLocaleString('en-IN')}`;
    if (discountRow && discountEl) {
      if (this.state.discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-₹${this.state.discount.toLocaleString('en-IN')}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    if (totalEl) totalEl.textContent = `₹${this.state.total.toLocaleString('en-IN')}`;
  }
};
