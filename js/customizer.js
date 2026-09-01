/* ==========================================================================
   YA.WARDA CUSTOM BOUQUET & BOX STUDIO ENGINE
   Interactive customizer for bespoke luxury floral gifts
   ========================================================================== */

const CustomizerEngine = {
  state: {
    boxType: "ronde",
    boxTypeTitle: "Parisian Ronde (Round Velvet Box)",
    boxPrice: 1800,
    boxColor: "Midnight Black",
    boxColorHex: "#121212",
    
    bloomType: "scarlet",
    bloomTitle: "Imperial Scarlet Dutch Roses",
    bloomBasePrice: 1699,
    
    stemDensity: "Deluxe (35 Stems)",
    stemDensityMultiplier: 1.0,

    addons: [],
    addonsPrice: 0,

    cardMessage: "",
    recipientName: "",
    deliveryDate: "",
    deliverySlot: "Evening (4:00 PM – 8:00 PM)",
    deliveryCity: "Kozhikode (Calicut)",

    previewImage: "images/IMG_0001_1400.jpg",
    totalPrice: 3499
  },

  boxStyles: {
    ronde: {
      title: "Parisian Ronde (Round Velvet Box)",
      basePrice: 1800,
      image: "images/IMG_0001_1400.jpg",
      colors: [
        { name: "Midnight Black", hex: "#121212" },
        { name: "Parisian Ivory", hex: "#F5F2EB" },
        { name: "Regal Burgundy", hex: "#54141E" }
      ]
    },
    cubo: {
      title: "L'Émeraude Cubo (Square Box with Gold Trim)",
      basePrice: 1900,
      image: "images/IMG_0169_4500.png",
      colors: [
        { name: "Emerald Green", hex: "#1B4D3E" },
        { name: "Midnight Black", hex: "#121212" },
        { name: "Parisian Ivory", hex: "#F5F2EB" }
      ]
    },
    crystal: {
      title: "Crystal Acrylic Vitrine (with Gift Drawer)",
      basePrice: 2200,
      image: "images/IMG_0740_3500.png",
      colors: [
        { name: "Crystal Clear + Black Base", hex: "#121212" },
        { name: "Crystal Clear + Emerald Base", hex: "#1B4D3E" }
      ]
    },
    heart: {
      title: "Mon Amour Velvet Heart Box",
      basePrice: 1850,
      image: "images/IMG_0759_1600.jpg",
      colors: [
        { name: "Dusty Rose Pink", hex: "#D8A49B" },
        { name: "Midnight Black", hex: "#121212" },
        { name: "Scarlet Crimson", hex: "#8A1C24" }
      ]
    },
    handtied: {
      title: "French Artisanal Hand-Tied Wrap",
      basePrice: 1200,
      image: "images/IMG_0245_3000.jpg",
      colors: [
        { name: "Charcoal Kraft & Champagne Ribbon", hex: "#2A2A2A" },
        { name: "Warm Alabaster Kraft & Gold Ribbon", hex: "#E8E2D6" }
      ]
    }
  },

  bloomStyles: {
    scarlet: {
      title: "Imperial Scarlet Dutch Roses",
      price: 1699,
      preview: "images/IMG_0245_3000.jpg"
    },
    pastel: {
      title: "Pastel Peonies, Hydrangea & Blush Roses",
      price: 2099,
      preview: "images/IMG_0186_3800.jpg"
    },
    alabaster: {
      title: "Avalanche White Roses & Gilded Eucalyptus",
      price: 1699,
      preview: "images/IMG_0001_1400.jpg"
    },
    sunset: {
      title: "Sunset Peach Garden Roses & Yellow Sprays",
      price: 1799,
      preview: "images/IMG_0249_3600.jpg"
    },
    lavender: {
      title: "Lavender & Lilac Roses with Scented Freesia",
      price: 1899,
      preview: "images/IMG_0741_1500.png"
    }
  },

  init() {
    if (typeof document === 'undefined' || !document.getElementById('customizer-section')) return;
    this.bindEvents();
    this.recalculateTotal();
  },

  bindEvents() {
    // Style choices
    document.querySelectorAll('[data-custom-style]').forEach(el => {
      el.addEventListener('click', (e) => {
        const styleKey = el.getAttribute('data-custom-style');
        this.selectStyle(styleKey);
      });
    });

    // Bloom choices
    document.querySelectorAll('[data-custom-bloom]').forEach(el => {
      el.addEventListener('click', (e) => {
        const bloomKey = el.getAttribute('data-custom-bloom');
        this.selectBloom(bloomKey);
      });
    });

    // Stem density
    document.querySelectorAll('[data-custom-density]').forEach(el => {
      el.addEventListener('click', (e) => {
        const multiplier = parseFloat(el.getAttribute('data-multiplier') || 1.0);
        const label = el.getAttribute('data-density-label');
        this.selectDensity(multiplier, label, el);
      });
    });

    // Addons checkboxes
    document.querySelectorAll('[data-custom-addon]').forEach(el => {
      el.addEventListener('change', () => {
        this.updateAddons();
      });
    });

    // Customizer order button
    const customOrderBtn = document.getElementById('btn-custom-order-whatsapp');
    if (customOrderBtn) {
      customOrderBtn.addEventListener('click', () => {
        this.collectInputs();
        InstagramEngine.orderCustomBouquet(this.state);
      });
    }

    // Customizer add to cart button
    const customAddToCartBtn = document.getElementById('btn-custom-add-cart');
    if (customAddToCartBtn) {
      customAddToCartBtn.addEventListener('click', () => {
        this.collectInputs();
        CartManager.addItem({
          id: `custom-${Date.now()}`,
          name: `Bespoke: ${this.state.boxTypeTitle}`,
          price: this.state.totalPrice,
          image: this.state.previewImage,
          selectedStem: this.state.stemDensity,
          selectedColor: `${this.state.boxColor} (${this.state.bloomTitle})`,
          quantity: 1
        });
        App.showToast("Bespoke creation added to your Bag!");
        CartManager.openDrawer();
      });
    }
  },

  selectStyle(styleKey) {
    const style = this.boxStyles[styleKey];
    if (!style) return;

    this.state.boxType = styleKey;
    this.state.boxTypeTitle = style.title;
    this.state.boxPrice = style.basePrice;
    this.state.previewImage = style.image;

    // Update active UI cards
    document.querySelectorAll('[data-custom-style]').forEach(el => el.classList.remove('selected'));
    const selectedEl = document.querySelector(`[data-custom-style="${styleKey}"]`);
    if (selectedEl) selectedEl.classList.add('selected');

    // Update Swatches
    this.renderColorSwatches(style.colors);
    this.recalculateTotal();
  },

  renderColorSwatches(colors) {
    const container = document.getElementById('custom-color-swatches');
    if (!container) return;

    container.innerHTML = '';
    colors.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.className = `color-swatch-btn ${idx === 0 ? 'selected' : ''}`;
      btn.style.backgroundColor = c.hex;
      btn.title = c.name;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.state.boxColor = c.name;
        this.state.boxColorHex = c.hex;
        const colorNameLabel = document.getElementById('selected-color-name');
        if (colorNameLabel) colorNameLabel.textContent = c.name;
      });
      container.appendChild(btn);
    });

    if (colors.length > 0) {
      this.state.boxColor = colors[0].name;
      this.state.boxColorHex = colors[0].hex;
      const colorNameLabel = document.getElementById('selected-color-name');
      if (colorNameLabel) colorNameLabel.textContent = colors[0].name;
    }
  },

  selectBloom(bloomKey) {
    const bloom = this.bloomStyles[bloomKey];
    if (!bloom) return;

    this.state.bloomType = bloomKey;
    this.state.bloomTitle = bloom.title;
    this.state.bloomBasePrice = bloom.price;
    this.state.previewImage = bloom.preview;

    document.querySelectorAll('[data-custom-bloom]').forEach(el => el.classList.remove('selected'));
    const selectedEl = document.querySelector(`[data-custom-bloom="${bloomKey}"]`);
    if (selectedEl) selectedEl.classList.add('selected');

    this.recalculateTotal();
  },

  selectDensity(multiplier, label, element) {
    this.state.stemDensityMultiplier = multiplier;
    this.state.stemDensity = label;

    document.querySelectorAll('[data-custom-density]').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    this.recalculateTotal();
  },

  updateAddons() {
    const checked = document.querySelectorAll('[data-custom-addon]:checked');
    let addonsTotal = 0;
    const addonNames = [];

    checked.forEach(cb => {
      const price = parseInt(cb.getAttribute('data-addon-price') || 0, 10);
      addonsTotal += price;
      addonNames.push(cb.getAttribute('data-addon-name'));
    });

    this.state.addons = addonNames;
    this.state.addonsPrice = addonsTotal;
    this.recalculateTotal();
  },

  collectInputs() {
    const noteEl = document.getElementById('custom-card-note');
    const recipientEl = document.getElementById('custom-recipient-name');
    const dateEl = document.getElementById('custom-delivery-date');
    const slotEl = document.getElementById('custom-delivery-slot');
    const cityEl = document.getElementById('custom-delivery-city');

    if (noteEl) this.state.cardMessage = noteEl.value.trim();
    if (recipientEl) this.state.recipientName = recipientEl.value.trim();
    if (dateEl) this.state.deliveryDate = dateEl.value;
    if (slotEl) this.state.deliverySlot = slotEl.value;
    if (cityEl) this.state.deliveryCity = cityEl.value;
  },

  recalculateTotal() {
    const baseFloral = this.state.bloomBasePrice * this.state.stemDensityMultiplier;
    const rawTotal = Math.round(this.state.boxPrice + baseFloral + this.state.addonsPrice);
    this.state.totalPrice = rawTotal;

    // Update UI elements
    const priceDisplay = document.getElementById('custom-price-display');
    if (priceDisplay) {
      priceDisplay.textContent = `₹${rawTotal.toLocaleString('en-IN')}`;
    }

    const previewImg = document.getElementById('custom-preview-img');
    if (previewImg) {
      previewImg.src = this.state.previewImage;
    }

    const summaryText = document.getElementById('custom-summary-text');
    if (summaryText) {
      summaryText.textContent = `${this.state.boxTypeTitle} · ${this.state.boxColor} · ${this.state.stemDensity}`;
    }
  }
};
