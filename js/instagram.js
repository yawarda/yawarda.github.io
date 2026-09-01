/* ==========================================================================
   YA.WARDA INSTAGRAM DM ORDER & CONCIERGE ENGINE (js/instagram.js)
   Handles direct Instagram DM order formatting (https://ig.me/m/ya.warda_)
   Automatically prepares pre-filled bouquet specifications, date, pricing,
   copies text to clipboard, shows 5s countdown popup, and forwards to IG DM.
   ========================================================================== */

const YA_WARDA_IG_USERNAME = "ya.warda_"; // Official Instagram Handle: @ya.warda_

const InstagramEngine = {
  redirectTimer: null,

  /**
   * Generates a direct Instagram DM link with prefilled URL text
   * URL format: https://ig.me/m/ya.warda_?text=...
   */
  createLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://ig.me/m/${YA_WARDA_IG_USERNAME}?text=${encoded}`;
  },

  /**
   * Copies formatted text to clipboard (works on modern & older mobile/desktop browsers)
   */
  async copyToClipboard(text) {
    if (typeof document === 'undefined') return true;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for non-secure contexts / webviews
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        return successful;
      }
    } catch (err) {
      console.warn("Clipboard copy not permitted:", err);
      return false;
    }
  },

  /**
   * Shows the 5-second countdown pop-up modal:
   * 1. Informs user that order details are auto-copied to clipboard.
   * 2. Counts down 5s -> 4s -> 3s -> 2s -> 1s -> forwards to Instagram DM.
   * 3. Provides an explicit "Copy Order Text" button.
   * 4. Provides an "Open Instagram Now" button.
   */
  showTransferModal(message, title = "Order Copied! Transferring to Instagram...") {
    // Clear any previous running timer
    if (this.redirectTimer) {
      clearInterval(this.redirectTimer);
      this.redirectTimer = null;
    }

    // Auto copy text immediately
    this.copyToClipboard(message);

    if (typeof document === 'undefined') return;

    // Remove existing modal if any
    const existing = document.getElementById("ig-dm-transfer-modal");
    if (existing) existing.remove();

    const igUrl = this.createLink(message);
    let timeLeft = 5;

    const modal = document.createElement("div");
    modal.id = "ig-dm-transfer-modal";
    modal.className = "modal-overlay open";
    modal.style.zIndex = "999999";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "16px";

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 520px; width: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45); padding: 0; background: #FAF8F5; border: 1px solid #E8E2D9; animation: fadeIn 0.3s ease forwards;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #AE3712 0%, #8F2B0C 100%); color: #FFFFFF; padding: 22px 24px; position: relative;">
          <button id="close-ig-transfer-btn" style="position: absolute; right: 16px; top: 16px; background: rgba(255,255,255,0.15); border: none; color: #FFFFFF; font-size: 1.3rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">&times;</button>
          
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <div style="width: 38px; height: 38px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-family: var(--font-heading, serif); font-weight: 600; color: #FFFFFF;">${title}</h3>
              <p style="margin: 0; font-size: 0.78rem; opacity: 0.9;">Connecting to <strong>@${YA_WARDA_IG_USERNAME}</strong></p>
            </div>
          </div>
        </div>

        <!-- Body Content -->
        <div style="padding: 24px;">
          
          <!-- Green Success Callout -->
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; color: #166534; padding: 12px 16px; border-radius: 8px; font-size: 0.86rem; display: flex; align-items: flex-start; gap: 10px; margin-bottom: 18px;">
            <span style="font-size: 1.3rem; line-height: 1;">✨</span>
            <div style="line-height: 1.45;">
              <strong style="color: #14532D; font-size: 0.9rem; display: block; margin-bottom: 2px;">Order Auto-Copied to Clipboard!</strong>
              When Instagram opens, simply <strong>Paste (⌘V / Ctrl+V / Long-press Paste)</strong> into the chat to send your order.
            </div>
          </div>

          <!-- Countdown Progress Section -->
          <div style="background: #FFFFFF; border: 1px solid #E8E2D9; border-radius: 8px; padding: 16px; margin-bottom: 18px; text-align: center;">
            <div style="font-size: 0.85rem; color: #44403C; font-weight: 500; margin-bottom: 10px;">
              Redirecting to Instagram in <span id="ig-countdown-val" style="font-weight: 700; font-size: 1.15rem; color: #AE3712; background: #FDF2E9; padding: 2px 8px; border-radius: 4px;">5</span> seconds...
            </div>
            
            <!-- Progress Bar -->
            <div style="width: 100%; height: 6px; background: #F5EFEB; border-radius: 999px; overflow: hidden;">
              <div id="ig-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #AE3712, #C44319); transition: width 1s linear;"></div>
            </div>
          </div>

          <!-- Message Preview -->
          <div style="margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #78716C;">Order Text Preview:</span>
              <span style="font-size: 0.72rem; color: #166534; font-weight: 600;">✓ Copied</span>
            </div>
            <div id="ig-preview-text" style="background: #FFFFFF; border: 1px solid #E8E2D9; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 0.78rem; line-height: 1.45; color: #1C1917; max-height: 130px; overflow-y: auto; white-space: pre-wrap; user-select: all;">${message}</div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="btn-copy-order-direct" class="btn btn-outline" style="flex: 1; min-width: 140px; justify-content: center; padding: 12px 16px; font-size: 0.82rem; font-weight: 600; border-color: #AE3712; color: #AE3712;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span id="btn-copy-text-label">Copy Order Text</span>
            </button>

            <a href="${igUrl}" target="_blank" id="btn-open-ig-now" class="btn btn-dm" style="flex: 1.3; min-width: 170px; justify-content: center; text-decoration: none; padding: 12px 18px; font-size: 0.82rem; font-weight: 600;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Open Instagram Now
            </a>
          </div>

        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = document.getElementById("close-ig-transfer-btn");
    const stopCountdown = () => {
      if (this.redirectTimer) {
        clearInterval(this.redirectTimer);
        this.redirectTimer = null;
      }
      modal.remove();
    };

    if (closeBtn) closeBtn.onclick = stopCountdown;
    modal.onclick = (e) => {
      if (e.target === modal) stopCountdown();
    };

    // Manual Copy Button
    const copyBtn = document.getElementById("btn-copy-order-direct");
    const copyLabel = document.getElementById("btn-copy-text-label");
    if (copyBtn) {
      copyBtn.onclick = async () => {
        await this.copyToClipboard(message);
        if (copyLabel) copyLabel.textContent = "Copied to Clipboard! ✓";
        copyBtn.style.backgroundColor = "#F0FDF4";
        copyBtn.style.borderColor = "#166534";
        copyBtn.style.color = "#166534";
        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = "Copy Order Text";
          copyBtn.style.backgroundColor = "";
          copyBtn.style.borderColor = "#AE3712";
          copyBtn.style.color = "#AE3712";
        }, 2500);
      };
    }

    // Direct Open Button
    const openNowBtn = document.getElementById("btn-open-ig-now");
    if (openNowBtn) {
      openNowBtn.onclick = () => {
        if (this.redirectTimer) {
          clearInterval(this.redirectTimer);
          this.redirectTimer = null;
        }
        setTimeout(() => {
          modal.remove();
        }, 600);
      };
    }

    // Start 5-Second Countdown
    this.redirectTimer = setInterval(() => {
      timeLeft--;
      const countdownEl = document.getElementById("ig-countdown-val");
      const progressEl = document.getElementById("ig-progress-bar");
      
      if (countdownEl) countdownEl.textContent = timeLeft;
      if (progressEl) progressEl.style.width = `${((5 - timeLeft) / 5) * 100}%`;

      if (timeLeft <= 0) {
        clearInterval(this.redirectTimer);
        this.redirectTimer = null;
        window.open(igUrl, "_blank");
        setTimeout(() => {
          modal.remove();
        }, 1000);
      }
    }, 1000);
  },

  /**
   * Direct DM trigger: opens transfer popup with countdown
   */
  openDM(message, modalTitle = "Order Copied! Transferring to Instagram...") {
    this.showTransferModal(message, modalTitle);
  },

  // Alias for backward compatibility
  openWhatsApp(message) {
    this.openDM(message);
  },

  /**
   * 1. Quick 1-Click Order for an individual product / modal selection
   */
  orderSingleProduct(product, options = {}) {
    const stemOption = options.stemOption || (product.stemOptions ? product.stemOptions.find(o => o.default) || product.stemOptions[0] : null);
    const boxColor = options.boxColor || (product.boxColors ? product.boxColors[0] : "Signature Luxury Wrap");
    const price = stemOption ? stemOption.price : product.price;

    const deliveryInfo = typeof getProductDeliveryInfo === "function" ? getProductDeliveryInfo(product) : { timeline: "1-3 days", detailText: "Fast dispatch", badgeText: "Delivery in 1 Day" };

    let msg = `🌸 *NEW ORDER REQUEST — YA.WARDA FRESH FLOWERS*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💐 *Bouquet:* ${product.name}\n`;
    if (product.subtitle) msg += `🌿 *Style:* ${product.subtitle}\n`;
    if (stemOption) msg += `📏 *Size / Stems:* ${stemOption.label}\n`;
    if (boxColor) msg += `🎨 *Wrap / Box Color:* ${boxColor}\n`;
    msg += `💰 *Price:* ₹${price.toLocaleString('en-IN')}\n`;
    msg += `⏱️ *Timeline:* ${deliveryInfo.badgeText || "Delivery in 1 Day"}\n\n`;

    msg += `📋 *DELIVERY & GIFT DETAILS:*\n`;
    if (options.deliveryDate && options.deliveryDate.trim() !== '') {
      msg += `📅 *Preferred Date:* ${options.deliveryDate}\n`;
    } else {
      msg += `📅 *Preferred Date:* [Please enter preferred date / ASAP]\n`;
    }

    if (options.deliverySlot && options.deliverySlot.trim() !== '') {
      msg += `⏰ *Time Slot:* ${options.deliverySlot}\n`;
    }

    if (options.location && options.location.trim() !== '') {
      msg += `📍 *Delivery Area / Pincode:* ${options.location}\n`;
    } else {
      msg += `📍 *Delivery Area:* Kuttiady / Kozhikode / Kannur\n`;
    }

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello @${YA_WARDA_IG_USERNAME}, I would like to place this order! Please confirm availability and share payment link ✨`;

    this.openDM(msg, `Ordering: ${product.name}`);
  },

  /**
   * 2. Order from Custom Bouquet / Box Studio
   */
  orderCustomBouquet(customData) {
    let msg = `🎨 *BESPOKE CUSTOM FLOWER ORDER — YA.WARDA STUDIO*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🎀 *Presentation Style:* ${customData.boxTypeTitle || "Custom Arrangement"}\n`;
    msg += `🎨 *Box / Wrap Shade:* ${customData.boxColor || "Signature"}\n`;
    msg += `💐 *Flower Selection:* ${customData.bloomTitle || "Curated Blooms"}\n`;
    msg += `🌿 *Stem Density:* ${customData.stemDensity || "Standard"}\n`;
    
    if (customData.addons && customData.addons.length > 0) {
      msg += `✨ *Luxe Add-ons:* ${customData.addons.join(", ")}\n`;
    }
    
    msg += `💰 *Estimated Total:* ₹${(customData.totalPrice || 0).toLocaleString('en-IN')}\n\n`;

    msg += `📋 *DELIVERY & PERSONALIZATION:*\n`;
    if (customData.deliveryDate && customData.deliveryDate.trim() !== '') {
      msg += `📅 *Delivery Date:* ${customData.deliveryDate}\n`;
    } else {
      msg += `📅 *Delivery Date:* [Please enter date]\n`;
    }

    if (customData.deliverySlot) {
      msg += `⏰ *Time Slot:* ${customData.deliverySlot}\n`;
    }

    if (customData.deliveryCity) {
      msg += `📍 *Delivery Zone:* ${customData.deliveryCity}\n`;
    }

    if (customData.recipientName) {
      msg += `👤 *Recipient:* ${customData.recipientName}\n`;
    }

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello @${YA_WARDA_IG_USERNAME}, I created this bespoke arrangement on your website and would love to finalize the order. Please confirm availability! 💐`;

    this.openDM(msg, "Bespoke Studio Arrangement Order");
  },

  /**
   * 3. Complete Cart Checkout via Instagram DM
   */
  checkoutCart(cartState) {
    if (!cartState.items || cartState.items.length === 0) {
      if (typeof App !== "undefined" && App.showToast) {
        App.showToast("Your cart is empty.", "error");
      } else {
        alert("Your cart is empty.");
      }
      return;
    }

    let msg = `🛒 *ONLINE CART ORDER — YA.WARDA FRESH FLOWERS*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    cartState.items.forEach((item, index) => {
      msg += `${index + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      if (item.selectedStem) msg += `   📏 Size: ${item.selectedStem}\n`;
      if (item.selectedColor) msg += `   🎨 Color: ${item.selectedColor}\n`;
      msg += `   💰 Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    msg += `\n💵 *Subtotal:* ₹${(cartState.subtotal || 0).toLocaleString('en-IN')}\n`;
    if (cartState.discount > 0) {
      msg += `🏷️ *Discount:* -₹${cartState.discount.toLocaleString('en-IN')}\n`;
    }
    msg += `🚚 *Delivery Fee:* ${cartState.shipping === 0 ? 'FREE (Kozhikode & Kannur)' : '₹' + cartState.shipping}\n`;
    msg += `💎 *TOTAL AMOUNT:* ₹${(cartState.total || 0).toLocaleString('en-IN')}\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *DELIVERY & GIFT DETAILS:*\n`;
    if (cartState.deliveryDate && cartState.deliveryDate.trim() !== '') {
      msg += `📅 *Delivery Date:* ${cartState.deliveryDate}\n`;
    } else {
      msg += `📅 *Delivery Date:* [Please enter preferred date]\n`;
    }

    if (cartState.deliverySlot) msg += `⏰ *Delivery Slot:* ${cartState.deliverySlot}\n`;
    if (cartState.deliveryAddress) msg += `📍 *Address:* ${cartState.deliveryAddress}\n`;
    if (cartState.deliveryCity) msg += `🏙️ *Area / Pincode:* ${cartState.deliveryCity}\n`;
    if (cartState.recipientName) msg += `👤 *Recipient:* ${cartState.recipientName}\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello @${YA_WARDA_IG_USERNAME}, please confirm my order, slot reservation, and send payment QR / link! 🌹`;

    this.openDM(msg, `Shopping Bag Checkout (${cartState.items.length} Bouquets)`);
  },

  /**
   * 4. VIP DM Consultation Request
   */
  inquireConcierge(data) {
    let msg = `👑 *VIP FLORAL CONCIERGE INQUIRY — YA.WARDA*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Client Name:* ${data.name || "Valued Client"}\n`;
    msg += `📞 *Phone / Contact:* ${data.phone || "Instagram DM"}\n`;
    msg += `🎉 *Occasion / Event:* ${data.occasion || "Special Celebration"}\n`;
    msg += `📍 *Delivery Location:* ${data.location || "Kuttiady / Kozhikode"}\n`;
    if (data.budget) msg += `💰 *Target Budget:* ${data.budget}\n`;
    if (data.notes) msg += `📝 *Special Requests:* ${data.notes}\n`;

    msg += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Hello @${YA_WARDA_IG_USERNAME}, I would like to consult with your Master Florist for a bespoke luxury arrangement. Please get in touch! ✨`;

    this.openDM(msg, "VIP Floral Concierge Consultation");
  }
};

// Aliases for backward compatibility
const WhatsAppEngine = InstagramEngine;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { InstagramEngine, WhatsAppEngine, YA_WARDA_IG_USERNAME };
}
