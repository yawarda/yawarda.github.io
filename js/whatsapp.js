/* ==========================================================================
   YA.WARDA INSTAGRAM DM & VIP ORDER ENGINE
   Handles direct Instagram DM order formatting (https://ig.me/m/ya.warda_)
   ========================================================================== */

var YA_WARDA_IG_USERNAME = window.YA_WARDA_IG_USERNAME || "ya.warda_";

const WhatsAppEngine = {
  /**
   * Generates a direct Instagram DM link with prefilled message
   * Format: https://ig.me/m/ya.warda_?text=...
   */
  createLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://ig.me/m/${YA_WARDA_IG_USERNAME}?text=${encoded}`;
  },

  /**
   * Opens Instagram DM directly in a new tab/app
   */
  openDM(message) {
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        event_category: 'Order',
        method: 'WhatsApp / DM'
      });
    }
    const url = this.createLink(message);
    window.open(url, '_blank');
  },

  // Alias for backward compatibility
  openWhatsApp(message) {
    this.openDM(message);
  },

  /**
   * Quick 1-Click Order for an individual product
   */
  orderSingleProduct(product, options = {}) {
    const stemOption = options.stemOption !== undefined
      ? options.stemOption
      : (product.stemOptions && product.stemOptions.length > 0 ? product.stemOptions.find(o => o.default) || product.stemOptions[0] : null);

    const boxColor = options.boxColor !== undefined
      ? options.boxColor
      : (product.boxColors && product.boxColors.length > 0 ? product.boxColors[0] : (product.boxType || null));

    const price = stemOption ? stemOption.price : product.price;

    let msg = `🌸 *NEW ORDER REQUEST — YA.WARDA FRESH FLOWERS*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Item:* ${product.name}\n`;
    if (stemOption && stemOption.label) msg += `*Stem Size:* ${stemOption.label}\n`;
    if (boxColor) msg += `*Box / Wrap Color:* ${boxColor}\n`;
    msg += `*Price:* ₹${price.toLocaleString('en-IN')}\n\n`;

    if (options.deliveryDate) msg += `📅 *Preferred Date:* ${options.deliveryDate}\n`;
    if (options.deliverySlot) msg += `⏰ *Delivery Slot:* ${options.deliverySlot}\n`;
    if (options.location) msg += `📍 *Delivery Area:* ${options.location}\n`;
    if (options.cardMessage) msg += `💌 *Card Note:* "${options.cardMessage}"\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello YA.WARDA team, I would like to place this order for delivery in Kuttiady/Kozhikode. Please confirm availability & payment link! ✨`;

    this.openWhatsApp(msg);
  },

  /**
   * Order from Custom Bouquet / Box Studio
   */
  orderCustomBouquet(customData) {
    let msg = `🎨 *BESPOKE CUSTOM FLOWER ORDER — YA.WARDA STUDIO*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Presentation Style:* ${customData.boxTypeTitle}\n`;
    msg += `*Box / Wrap Shade:* ${customData.boxColor}\n`;
    msg += `*Flower Selection:* ${customData.bloomTitle}\n`;
    msg += `*Stem Density:* ${customData.stemDensity}\n`;
    
    if (customData.addons && customData.addons.length > 0) {
      msg += `*Luxe Add-ons:* ${customData.addons.join(", ")}\n`;
    }
    
    msg += `*Estimated Total:* ₹${customData.totalPrice.toLocaleString('en-IN')}\n\n`;

    if (customData.recipientName) {
      msg += `👤 *Recipient:* ${customData.recipientName}\n`;
    }
    if (customData.deliveryDate) {
      msg += `📅 *Delivery Date:* ${customData.deliveryDate}\n`;
    }
    if (customData.deliverySlot) {
      msg += `⏰ *Time Slot:* ${customData.deliverySlot}\n`;
    }
    if (customData.deliveryCity) {
      msg += `📍 *Delivery Zone:* ${customData.deliveryCity}\n`;
    }

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello YA.WARDA, I created this bespoke arrangement on your website and would love to finalize the order. Please confirm! 💐`;

    this.openWhatsApp(msg);
  },

  /**
   * Complete Cart Checkout via WhatsApp
   */
  checkoutCart(cartState) {
    if (!cartState.items || cartState.items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let msg = `🛒 *ONLINE CART ORDER — YA.WARDA FRESH FLOWERS*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    cartState.items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      if (item.selectedStem) msg += `   Size: ${item.selectedStem}\n`;
      if (item.selectedColor) msg += `   Color: ${item.selectedColor}\n`;
      msg += `   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    msg += `\n*Subtotal:* ₹${cartState.subtotal.toLocaleString('en-IN')}\n`;
    if (cartState.discount > 0) {
      msg += `*Discount:* -₹${cartState.discount.toLocaleString('en-IN')}\n`;
    }
    msg += `*Delivery Fee:* ${cartState.shipping === 0 ? 'FREE' : '₹' + cartState.shipping}\n`;
    msg += `*TOTAL AMOUNT:* ₹${cartState.total.toLocaleString('en-IN')}\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *DELIVERY & GIFT DETAILS:*\n`;
    if (cartState.recipientName) msg += `• Recipient: ${cartState.recipientName}\n`;
    if (cartState.deliveryAddress) msg += `• Address: ${cartState.deliveryAddress}\n`;
    if (cartState.deliveryCity) msg += `• Area/Pincode: ${cartState.deliveryCity}\n`;
    if (cartState.deliveryDate) msg += `• Date: ${cartState.deliveryDate}\n`;
    if (cartState.deliverySlot) msg += `• Slot: ${cartState.deliverySlot}\n`;
    if (cartState.cardMessage) msg += `• Card Message: "${cartState.cardMessage}"\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please send payment confirmation and delivery slot dispatch details! 🌹`;

    this.openWhatsApp(msg);
  },

  /**
   * VIP DM Consultation Request
   */
  inquireConcierge(data) {
    let msg = `👑 *VIP FLORAL CONCIERGE INQUIRY — YA.WARDA*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Client Name:* ${data.name}\n`;
    msg += `*Phone / Contact:* ${data.phone}\n`;
    msg += `*Occasion / Event:* ${data.occasion}\n`;
    msg += `*Delivery Location:* ${data.location}\n`;
    if (data.budget) msg += `*Target Budget:* ${data.budget}\n`;
    if (data.notes) msg += `*Special Requests:* ${data.notes}\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello YA.WARDA team, I would like to consult with your head florist for a bespoke luxury floral styling. Please get in touch! ✨`;

    this.openWhatsApp(msg);
  }
};
