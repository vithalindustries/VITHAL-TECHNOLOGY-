/* ============================================================
   VITHAL TECHNOLOGY — WhatsApp Integration
   Reusable messaging system for every CTA on the site.
   ============================================================ */

const WHATSAPP_NUMBER = '917498846061';

/**
 * Build a clean, professional English message per item type.
 * @param {'service'|'product'|string} itemType
 * @param {string} itemName
 * @returns {string}
 */
function buildWhatsAppMessage(itemType, itemName) {
  const name = (itemName || '').trim();
  switch (itemType) {
    case 'service':
      return `Hello Vithal Technology, I need ${name}. I would like to discuss my requirement.`;
    case 'product':
      return `Hello Vithal Technology, I need the ${name} product. I would like to discuss my requirement.`;
    default:
      return 'Hello Vithal Technology, I would like to discuss my requirement.';
  }
}

/**
 * Open WhatsApp chat with a pre-filled, URL-encoded message.
 * @param {'service'|'product'|string} itemType
 * @param {string} itemName
 */
function openWhatsApp(itemType, itemName) {
  const message = buildWhatsAppMessage(itemType, itemName);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
  return url;
}

/* Expose globally so HTML onclick-style bindings and other
   scripts can call it without module loaders. */
window.openWhatsApp = openWhatsApp;
