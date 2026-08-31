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
    deliverySlot: "Evening (4:00 PM – 8:00 PM)",
    cardMessage: "",
    waxSealStyle: "Gold Crest Seal"
  },

  STORAGE_KEY: "yawarda_luxury_cart",

  init() {
    this.loadFromStorage();
    this.bindEvents();
    this.render();
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

    // WhatsApp checkout button inside drawer
    const waCheckoutBtn = document.getElementById('btn-cart-whatsapp-checkout');
    if (waCheckoutBtn) {
      waCheckoutBtn.addEventListener('click', () => {
        this.collectGiftDetails();
        WhatsAppEngine.checkoutCart(this.state);
      });
    }

    // Promo code apply
    const promoBtn = document.getElementById('btn-apply-promo');
    const promoInput = document.getElementById('cart-promo-input');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === "WARDA10" || code === "FLORAL10") {
          this.state.discount = Math.round(this.state.subtotal * 0.10);
          this.state.promoCode = code;
          App.showToast("10% Privilege Discount Applied!");
        } else if (code === "") {
          this.state.discount = 0;
        } else {
          App.showToast("Invalid code. Try WARDA10", "error");
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
    // Check if duplicate exists with same stem & color
    const existingIndex = this.state.items.findIndex(
      item => item.id === productItem.id &&
              item.selectedStem === productItem.selectedStem &&
              item.selectedColor === productItem.selectedColor
    );

    if (existingIndex > -1) {
      this.state.items[existingIndex].quantity += (productItem.quantity || 1);
    } else {
      this.state.items.push({
        id: productItem.id,
        name: productItem.name,
        price: productItem.price,
        image: productItem.image,
        selectedStem: productItem.selectedStem || "Standard",
        selectedColor: productItem.selectedColor || "Signature",
        quantity: productItem.quantity || 1
      });
    }

    this.saveToStorage();
    this.render();
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
    const message = document.getElementById('cart-card-message');

    if (recipient) this.state.recipientName = recipient.value.trim();
    if (address) this.state.deliveryAddress = address.value.trim();
    if (city) this.state.deliveryCity = city.value;
    if (date) this.state.deliveryDate = date.value;
    if (slot) this.state.deliverySlot = slot.value;
    if (message) this.state.cardMessage = message.value.trim();
  },

  calculateTotals() {
    this.state.subtotal = this.state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (this.state.promoCode && this.state.subtotal > 0) {
      this.state.discount = Math.round(this.state.subtotal * 0.10);
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

    itemsContainer.innerHTML = this.state.items.map((item, index) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-meta">${item.selectedStem} · ${item.selectedColor}</div>
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
    `).join('');

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
