/* ============================================================
   VITHAL AI — Proprietary AI Assistant Engine
   ------------------------------------------------------------
   ARCHITECTURE — two modes:

   MODE 1 (Demo / GitHub Pages):
     Runs fully in the browser using the structured knowledge
     base in data/vithal-ai-knowledge.js + local intent matching.
     No backend, no database, no API keys.

   MODE 2 (Production AI):
     Replace the body of `sendMessageToAI()` with a call to your
     secure backend endpoint which forwards to an AI API.

       async function sendMessageToAI(message, context) {
         // NEVER expose secret API keys in frontend JavaScript.
         const res = await fetch('https://your-backend.example.com/api/vithal-ai', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ message, context })
         });
         return await res.json(); // { text, chips }
       }

   SECURITY NOTES:
     • No API keys exist anywhere in this file.
     • No personal data is collected or stored permanently.
     • Only a lightweight, non-sensitive chat transcript is kept
       in sessionStorage so the conversation survives refreshes.
     • All WhatsApp messages open via https://wa.me/ — nothing is
       sent without the visitor explicitly tapping a button.
   ============================================================ */

(() => {
  'use strict';

  const KB = window.VITHAL_AI_KB;
  if (!KB) { console.error('Vithal AI: knowledge base missing.'); return; }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_SEEN = 'va_seen';
  const STORAGE_CHAT = 'va_chat_session';

  /* ==========================================================
     LANGUAGE SUPPORT — English / Hindi / Hinglish / Marathi
     ========================================================== */
  function detectLanguage(text) {
    const t = (text || '').toLowerCase();
    if (/[\u0900-\u097F]/.test(t)) {
      // Devanagari: Marathi-specific markers vs Hindi
      return /ळ|आहे|आहेत|माझ|कसं|कशी|हवं|हवी|काय/.test(t) ? 'mr' : 'hi';
    }
    const hindiRoman = ['hai', 'hain', 'kya', 'kaise', 'kitna', 'kitne', 'chahiye', 'batao',
                        'banwana', 'banvani', 'banao', 'mujhe', 'mera', 'aap', 'accha', 'theek'];
    const hits = hindiRoman.filter((w) => new RegExp('\\b' + w + '\\b').test(t)).length;
    return hits >= 2 ? 'hinglish' : 'en';
  }

  const T = {
    en: {
      hereIs: 'Here are the details:', weBuild: 'We can build:', benefits: 'Benefits:',
      bestFor: 'Best for', discussQ: 'Would you like to discuss your requirement?',
      productApps: 'Applications:', productWant: 'Would you like to enquire about this product?',
      continueWA: 'Continue on WhatsApp', discussWA: 'Discuss on WhatsApp', getQuote: 'Get Quote',
      backServices: 'Back to Services', backProducts: 'Back to Products', allServices: 'All Services',
      talkTeam: 'Talk to Vithal Technology', thanks: 'Thanks! Anything else I can help you with?',
      servicesQ: 'Would you like details about any specific service?',
      selectProduct: 'Select a product to learn more.',
      quoteStart: 'What would you like a quote for?',
      quoteDetail: 'Please briefly describe your requirement for {name} — what should it do, who is it for, and when do you want to start? (Budget is optional)',
      quoteDone: 'Thanks! I have understood your requirement.\n\nYou can continue the discussion with the Vithal Technology team on WhatsApp.',
      reqAck: 'Got it — I have noted your requirement.',
      fallback: "I don't have enough information to answer that accurately. I can connect you with the Vithal Technology team on WhatsApp."
    },
    hi: {
      hereIs: 'विवरण यहाँ है:', weBuild: 'हम ये बना सकते हैं:', benefits: 'फायदे:',
      bestFor: 'किसके लिए', discussQ: 'क्या आप अपनी ज़रूरत पर चर्चा करना चाहेंगे?',
      productApps: 'उपयोग:', productWant: 'क्या आप इस उत्पाद के बारे में पूछताछ करना चाहेंगे?',
      continueWA: 'WhatsApp पर जारी रखें', discussWA: 'WhatsApp पर चर्चा करें', getQuote: 'कोट पाएँ',
      backServices: 'सेवाओं पर वापस', backProducts: 'उत्पादों पर वापस', allServices: 'सभी सेवाएँ',
      talkTeam: 'Vithal Technology से बात करें', thanks: 'धन्यवाद! और कुछ मदद कर सकता हूँ?',
      servicesQ: 'क्या आप किसी विशेष सेवा के बारे में विवरण चाहेंगे?',
      selectProduct: 'और जानने के लिए कोई उत्पाद चुनें।',
      quoteStart: 'आपको किस चीज़ का कोट चाहिए?',
      quoteDetail: 'कृपया {name} के लिए अपनी ज़रूरत संक्षेप में बताएं — यह क्या करेगा, किसके लिए है, और कब शुरू करना चाहते हैं? (बजट वैकल्पिक है)',
      quoteDone: 'धन्यवाद! मैंने आपकी ज़रूरत समझ ली है।\n\nआप Vithal Technology टीम के साथ WhatsApp पर चर्चा जारी रख सकते हैं।',
      reqAck: 'समझ गया — मैंने आपकी ज़रूरत नोट कर ली है।',
      fallback: 'मेरे पास इसका सटीक उत्तर देने के लिए पर्याप्त जानकारी नहीं है। मैं आपको Vithal Technology टीम से WhatsApp पर जोड़ सकता हूँ।'
    },
    mr: {
      hereIs: 'तपशील येथे आहे:', weBuild: 'आम्ही हे बनवू शकतो:', benefits: 'फायदे:',
      bestFor: 'कोणासाठी', discussQ: 'तुम्हाला तुमच्या गरजेवर चर्चा करायची आहे का?',
      productApps: 'वापर:', productWant: 'तुम्हाला या उत्पादनाबद्दल चौकशी करायची आहे का?',
      continueWA: 'WhatsApp वर पुढे जा', discussWA: 'WhatsApp वर चर्चा करा', getQuote: 'भाव मिळवा',
      backServices: 'सेवांकडे परत', backProducts: 'उत्पादनांकडे परत', allServices: 'सर्व सेवा',
      talkTeam: 'Vithal Technology शी बोला', thanks: 'धन्यवाद! आणखी काही मदत करू?',
      servicesQ: 'तुम्हाला कोणत्याही विशिष्ट सेवेचा तपशील हवा आहे का?',
      selectProduct: 'अधिक जाणून घेण्यासाठी एक उत्पादन निवडा.',
      quoteStart: 'तुम्हाला कोणत्या गोष्टीचा भाव हवा आहे?',
      quoteDetail: 'कृपया {name} साठी तुमची गरज थोडक्यात सांगा — ते काय करेल, कोणासाठी आहे, आणि कधी सुरू करायचे आहे? (बजेट वैकल्पिक)',
      quoteDone: 'धन्यवाद! मी तुमची गरज समजून घेतली आहे.\n\nतुम्ही Vithal Technology टीमसोबत WhatsApp वर चर्चा सुरू ठेवू शकता.',
      reqAck: 'समजले — मी तुमची गरज नोंदवली आहे.',
      fallback: 'याचे अचूक उत्तर देण्यासाठी माजकडे पुरेशी माहिती नाही. मी तुम्हाला Vithal Technology टीमशी WhatsApp वर जोडू शकतो.'
    },
    hinglish: {
      hereIs: 'Details yahan hain:', weBuild: 'Hum ye bana sakte hain:', benefits: 'Benefits:',
      bestFor: 'Kiske liye', discussQ: 'Kya aap apni requirement par discuss karna chahenge?',
      productApps: 'Applications:', productWant: 'Kya aap is product ke baare mein poochna chahenge?',
      continueWA: 'WhatsApp par continue karein', discussWA: 'WhatsApp par discuss karein', getQuote: 'Quote paayein',
      backServices: 'Services par wapas', backProducts: 'Products par wapas', allServices: 'All Services',
      talkTeam: 'Vithal Technology se baat karein', thanks: 'Shukriya! Aur kuch madad kar sakta hoon?',
      servicesQ: 'Kya aap kisi specific service ke details chahenge?',
      selectProduct: 'Aur jaanne ke liye ek product select karein.',
      quoteStart: 'Aapko kis cheez ka quote chahiye?',
      quoteDetail: 'Please {name} ke liye apni requirement thodi detail mein batayein — kya karna hai, kiske liye, aur kab start karna hai? (Budget optional hai)',
      quoteDone: 'Shukriya! Maine aapki requirement samajh li hai.\n\nAap Vithal Technology team se WhatsApp par discuss kar sakte hain.',
      reqAck: 'Samajh gaya — aapki requirement note kar li hai.',
      fallback: "Mere paas iska accurate jawab dene ke liye kaafi information nahi hai. Main aapko Vithal Technology team se WhatsApp par connect kar sakta hoon."
    }
  };
  const t = (lang, key) => (T[lang] && T[lang][key]) || T.en[key];

  /* ==========================================================
     STATE
     ========================================================== */
  const state = {
    lang: 'en',
    flow: null,        // { kind:'quote'|'lead', itemName, requirement }
    history: [],       // non-sensitive transcript for session restore
    greeted: false
  };

  /* ==========================================================
     WHATSAPP HELPERS (build on top of js/whatsapp.js pattern)
     ========================================================== */
  function waUrl(message) {
    return `https://wa.me/${KB.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  function openWaUrl(url) { window.open(url, '_blank', 'noopener'); }

  function serviceWa(service, requirement) {
    let msg = service.whatsapp || KB.whatsapp.service.replace('{name}', service.name);
    if (requirement) msg += KB.whatsapp.withRequirement.replace('{requirement}', requirement);
    return waUrl(msg);
  }
  function productWa(product, requirement) {
    let msg = product.whatsapp || KB.whatsapp.product.replace('{name}', product.name);
    if (requirement) msg += KB.whatsapp.withRequirement.replace('{requirement}', requirement);
    return waUrl(msg);
  }
  const generalWa = (requirement) => waUrl(
    KB.whatsapp.general + (requirement ? KB.whatsapp.withRequirement.replace('{requirement}', requirement) : '')
  );
  const customWa = (name, requirement) => waUrl(
    `Hello Vithal Technology, I need ${name}. I would like to discuss my requirement.` +
    (requirement ? KB.whatsapp.withRequirement.replace('{requirement}', requirement) : '')
  );

  /* ==========================================================
     RESPONSE BUILDERS
     ========================================================== */
  const bullets = (arr) => arr.map((i) => '• ' + i).join('\n');
  const serviceById = (id) => KB.services.find((s) => s.id === id);
  const productById = (id) => KB.products.find((p) => p.id === id);

  function serviceDetailResponse(service, lang) {
    return {
      text: `${service.name}\n\n${service.what}\n\n${t(lang, 'weBuild')}\n${bullets(service.builds)}\n\n${t(lang, 'benefits')}\n${bullets(service.benefits)}\n\n${t(lang, 'bestFor')}: ${service.bestFor}\n\n${t(lang, 'discussQ')}`,
      chips: [
        { label: t(lang, 'discussWA'), action: 'whatsapp-service', value: service.id, style: 'wa' },
        { label: t(lang, 'getQuote'), action: 'quote-for', value: service.name },
        { label: t(lang, 'backServices'), action: 'services', style: 'back' }
      ]
    };
  }

  function productDetailResponse(product, lang) {
    return {
      text: `${product.name}\n\n${product.what}\n\n${t(lang, 'productApps')}\n${bullets(product.applications)}\n\n${t(lang, 'productWant')}`,
      chips: [
        { label: t(lang, 'discussWA'), action: 'whatsapp-product', value: product.id, style: 'wa' },
        { label: t(lang, 'backProducts'), action: 'products', style: 'back' }
      ]
    };
  }

  function servicesListResponse(lang) {
    return {
      text: KB.ui.servicesIntro + '\n\n' + t(lang, 'servicesQ'),
      chips: [
        ...KB.services.slice(0, 6).map((s) => ({ label: s.name, action: 'service', value: s.id })),
        { label: t(lang, 'allServices'), action: 'services-all' }
      ]
    };
  }

  function allServicesChips() {
    return KB.services.map((s) => ({ label: s.name, action: 'service', value: s.id }));
  }

  function productsListResponse(lang) {
    return {
      text: KB.ui.productsIntro,
      chips: [...KB.products.map((p) => ({ label: p.name, action: 'product', value: p.id }))]
    };
  }

  function quoteStartResponse(lang) {
    state.flow = { kind: 'quote-pick', itemName: null, requirement: null };
    return { text: t(lang, 'quoteStart'), chips: KB.ui.quoteCategories.map((c) => ({ ...c })) };
  }

  /* ==========================================================
     LOCAL INTENT ENGINE (demo-mode brain)
     ========================================================== */
  const GREET_RE = /\b(hello|hi|hey|namaste|namaskar|hii+|yo)\b|नमस्ते|हाय|हॅलो|हॅलो|नमस्कार/;
  const THANKS_RE = /\b(thanks|thank you|thankyou|great|awesome|ok(ay)?|nice|cool)\b|धन्यवाद|शुक्रिया|ठीक आहे|ठीक/;
  const SERVICES_RE = /service|what.*(do|offer|provide)|सेवा|काय-काय|kya.*(karte|milta)/;
  const PRODUCTS_RE = /product|manufactur|hardware|उत्पादन|हार्डवेअर|banavta|बनवता/;
  const QUOTE_RE = /\b(quote|pricing|price|cost|estimate|budget)\b|भाव|किंमत|कीमत|kitna|kitne/;
  const CONTACT_RE = /contact|phone|email|number|reach|call|संपर्क|फोन|ईमेल|मेल|मोबाईल/;
  const QUOTE_FLOW_RE = /quote|भाव|किंमत|kitna|kitne/;
  const HUMAN_RE = /\b(human|agent|person|real|team)\b.*(talk|speak|chat)|talk.*(human|person|team)|माणूस|व्यक्ती/;

  function scoreKeywords(text, keywords) {
    let score = 0;
    for (const k of keywords) {
      if (text.includes(k)) score += k.length > 5 ? 2 : 1;
    }
    return score;
  }

  function localBrain(rawMessage, context) {
    const lang = state.lang;
    const text = ' ' + rawMessage.toLowerCase().trim() + ' ';

    /* --- Active conversational flow: capture requirement --- */
    if (state.flow && state.flow.step === 'collect') {
      state.flow.requirement = rawMessage.trim();
      const done = { kind: state.flow.kind, itemName: state.flow.itemName, requirement: state.flow.requirement };
      state.flow = null;
      const waTarget = done.itemName
        ? { action: 'whatsapp-custom', value: done.itemName, requirement: done.requirement }
        : { action: 'whatsapp-general', requirement: done.requirement };
      return Promise.resolve({
        text: t(lang, 'quoteDone'),
        chips: [
          { label: t(lang, 'continueWA'), ...waTarget, style: 'wa' },
          { label: t(lang, 'getQuote'), action: 'quote', style: 'back' },
          { label: t(lang, 'backServices'), action: 'services', style: 'back' }
        ]
      });
    }

    /* --- Explicit context passed from the website (e.g. user
         clicked "Discuss This Service" on a card or modal) --- */
    if (context && context.type === 'service' && context.id) {
      const s = serviceById(context.id);
      if (s) {
        state.flow = { kind: 'lead', itemName: s.name, step: 'collect', requirement: null };
        return Promise.resolve({
          text: KB.ui.askRequirement.replace('{name}', s.name),
          chips: [
            { label: t(lang, 'discussWA'), action: 'whatsapp-service', value: s.id, style: 'wa' },
            { label: t(lang, 'getQuote'), action: 'quote-for', value: s.name }
          ]
        });
      }
    }
    if (context && context.type === 'product' && context.id) {
      return Promise.resolve(productDetailResponse(productById(context.id), lang));
    }

    /* --- Human handover --- */
    if (HUMAN_RE.test(text)) {
      return Promise.resolve({
        text: lang === 'hi' ? 'बिल्कुल! आप Vithal Technology टीम से सीधे WhatsApp पर बात कर सकते हैं।'
             : lang === 'mr' ? 'नक्कीच! तुम्ही Vithal Technology टीमशी थेट WhatsApp वर बोलू शकता.'
             : 'Of course! You can talk to the Vithal Technology team directly on WhatsApp.',
        chips: [{ label: t(lang, 'talkTeam'), action: 'whatsapp-general', style: 'wa' }]
      });
    }

    /* --- FAQ matching (highest priority after flows) --- */
    let bestFaq = null, bestScore = 0;
    for (const faq of KB.faqs) {
      const sc = scoreKeywords(text, faq.keys);
      if (sc > bestScore) { bestScore = sc; bestFaq = faq; }
    }
    if (bestFaq && bestScore >= 2) {
      return Promise.resolve({ text: bestFaq.answer, chips: bestFaq.chips.map((c) => ({ ...c })) });
    }

    /* --- Service matching --- */
    let bestSvc = null, svcScore = 0;
    for (const s of KB.services) {
      const sc = scoreKeywords(text, s.keywords);
      if (sc > svcScore) { svcScore = sc; bestSvc = s; }
    }
    /* --- Product matching --- */
    let bestProd = null, prodScore = 0;
    for (const p of KB.products) {
      const sc = scoreKeywords(text, p.keywords);
      if (sc > prodScore) { prodScore = sc; bestProd = p; }
    }

    /* Greeting */
    if (GREET_RE.test(text)) {
      return Promise.resolve({
        text: lang === 'hi' ? 'नमस्ते! 👋 मैं Vithal AI हूँ। मैं आपकी सेवाओं, उत्पादों और प्रोजेक्ट से जुड़ी मदद कर सकता हूँ। आप क्या देखना चाहेंगे?'
             : lang === 'mr' ? 'नमस्कार! 👋 मी Vithal AI आहे. मी तुम्हाला सेवा, उत्पादनं आणि प्रोजेक्टबद्दल मदत करू शकतो. तुम्हाला काय पाहायचे आहे?'
             : KB.ui.welcome,
        chips: KB.ui.welcomeChips.map((c) => ({ ...c }))
      });
    }

    if (THANKS_RE.test(text)) {
      return Promise.resolve({
        text: t(lang, 'thanks'),
        chips: [{ label: t(lang, 'talkTeam'), action: 'whatsapp-general', style: 'wa' }]
      });
    }

    /* Explicit list questions */
    if (SERVICES_RE.test(text) || /services?$/.test(text.trim())) {
      return Promise.resolve(servicesListResponse(lang));
    }
    if (PRODUCTS_RE.test(text)) {
      if (bestProd && prodScore >= 2) return Promise.resolve(productDetailResponse(bestProd, lang));
      return Promise.resolve(productsListResponse(lang));
    }
    if (QUOTE_FLOW_RE.test(text) && svcScore < 2) {
      return Promise.resolve(quoteStartResponse(lang));
    }
    if (CONTACT_RE.test(text)) {
      return Promise.resolve({
        text: `You can reach Vithal Technology here:\n\n• WhatsApp: ${KB.contact.whatsappDisplay}\n• Email: ${KB.contact.email}\n\nFastest response is on WhatsApp.`,
        chips: [{ label: 'Chat on WhatsApp', action: 'whatsapp-general', style: 'wa' }, { label: 'Send Email', action: 'email' }]
      });
    }

    /* Specific service/product detail wins */
    if (bestSvc && svcScore >= 2 && svcScore >= prodScore) {
      return Promise.resolve(serviceDetailResponse(bestSvc, lang));
    }
    if (bestProd && prodScore >= 2) {
      return Promise.resolve(productDetailResponse(bestProd, lang));
    }

    /* Fallback — never invent information */
    return Promise.resolve({
      text: t(lang, 'fallback'),
      chips: [{ label: t(lang, 'talkTeam'), action: 'whatsapp-general', style: 'wa' },
              { label: t(lang, 'allServices'), action: 'services' }]
    });
  }

  /* ==========================================================
     sendMessageToAI — THE BRAIN BOUNDARY.
     ------------------------------------------------------------
     Demo mode returns a Promise from the local intent engine.
     PRODUCTION: replace the return statement below with a fetch
     to your secure backend AI API. Keep the same return shape:
       { text: string, chips: [{ label, action, value, style }] }
     Never place API keys in this file — proxy through a server.
     ========================================================== */
  async function sendMessageToAI(message, context = {}) {
    // --- Connect this function to a secure backend AI API in production. ---
    // const response = await fetch('https://your-backend.example.com/api/vithal-ai', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message, context, lang: state.lang })
    // });
    // return await response.json();
    return localBrain(message, context);
  }

  /* ==========================================================
     UI CONTROLLER
     ========================================================== */
  const chat = document.getElementById('vithal-ai-chat');
  const fab = document.getElementById('vithal-ai-fab');
  if (!chat || !fab) return; // chatbot markup not present — fail silent

  const els = {
    body: chat.querySelector('.va-body'),
    input: document.getElementById('vithal-ai-input'),
    send: document.getElementById('vithal-ai-send'),
    close: document.getElementById('va-close'),
    minimize: document.getElementById('va-minimize'),
    notify: fab.querySelector('.va-notify'),
    tooltip: fab.querySelector('.va-tooltip')
  };

  const AVATAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.1"/><circle cx="4.5" cy="6" r="1.4"/><circle cx="19.5" cy="6" r="1.4"/><circle cx="4.5" cy="18" r="1.4"/><circle cx="19.5" cy="18" r="1.4"/><path d="M6 7.4 9.6 10M18 7.4 14.4 10M6 16.6 9.6 14M18 16.6 14.4 14"/></svg>';

  /* ---------- session transcript (non-sensitive only) ---------- */
  function saveSession() {
    try {
      sessionStorage.setItem(STORAGE_CHAT, JSON.stringify({
        history: state.history.slice(-40),
        greeted: state.greeted
      }));
    } catch (e) { /* storage unavailable — chat simply won't persist */ }
  }
  function loadSession() {
    try {
      const raw = sessionStorage.getItem(STORAGE_CHAT);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data.history)) {
        state.history = data.history;
        state.greeted = !!data.greeted;
        state.history.forEach((m) => renderMessage(m.role, m.text, [], true)); // chips are not restored — keeps actions accurate
        scrollBottom();
      }
    } catch (e) { /* corrupted state — start fresh */ }
  }

  /* ---------- rendering ---------- */
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderMessage(role, text, chips = [], instant = false) {
    const wrap = document.createElement('div');
    wrap.className = `va-msg va-msg--${role}`;
    if (instant && prefersReducedMotion) wrap.style.animation = 'none';

    const avatar = role === 'bot' ? `<div class="va-msg-avatar">${AVATAR_SVG}</div>` : '';
    const bubble = document.createElement('div');
    bubble.className = 'va-bubble';
    bubble.textContent = ''; // text appended as plain text node (pre-line CSS handles \n)
    bubble.appendChild(document.createTextNode(text));

    wrap.innerHTML = avatar;
    wrap.appendChild(bubble);

    if (chips && chips.length) {
      const chipWrap = document.createElement('div');
      chipWrap.className = 'va-chips';
      chips.forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'va-chip' + (c.style ? ` va-chip--${c.style}` : '');
        btn.textContent = c.label;
        btn.dataset.action = c.action;
        btn.dataset.value = c.value || '';
        btn.dataset.requirement = c.requirement || '';
        btn.addEventListener('click', () => handleChip(c));
        chipWrap.appendChild(btn);
      });
      bubble.appendChild(chipWrap);
    }
    els.body.appendChild(wrap);
    scrollBottom();
  }

  function scrollBottom() {
    requestAnimationFrame(() => { els.body.scrollTop = els.body.scrollHeight; });
  }

  let typingEl = null;
  function showTyping() {
    hideTyping();
    typingEl = document.createElement('div');
    typingEl.className = 'va-msg va-msg--bot';
    typingEl.innerHTML = `<div class="va-msg-avatar">${AVATAR_SVG}</div>
      <div class="va-bubble"><span class="va-typing" role="status" aria-label="Vithal AI is thinking">
      <i></i><i></i><i></i><span class="va-typing-label">Vithal AI is thinking...</span></span></div>`;
    els.body.appendChild(typingEl);
    scrollBottom();
  }
  function hideTyping() { if (typingEl) { typingEl.remove(); typingEl = null; } }

  async function botRespond(message, context = {}) {
    showTyping();
    const delay = prefersReducedMotion ? 60 : (450 + Math.min(700, message.length * 8));
    const [response] = await Promise.all([
      sendMessageToAI(message, context),
      new Promise((r) => setTimeout(r, delay))
    ]);
    hideTyping();
    renderMessage('bot', response.text, response.chips || []);
    state.history.push({ role: 'bot', text: response.text, chips: (response.chips || []).map(({ label }) => ({ label })) });
    saveSession();
  }

  function sendUserMessage(text) {
    const msg = (text || '').trim();
    if (!msg) return;
    state.lang = detectLanguage(msg);
    renderMessage('user', msg);
    state.history.push({ role: 'user', text: msg, chips: [] });
    saveSession();
    botRespond(msg);
  }

  /* ---------- chip actions ---------- */
  function handleChip(chip) {
    renderMessage('user', chip.label);
    state.history.push({ role: 'user', text: chip.label, chips: [] });
    saveSession();
    const lang = state.lang;
    switch (chip.action) {
      case 'service': {
        const s = serviceById(chip.value);
        if (!s) return;
        // Enter conversational lead mode, then show detail
        state.flow = { kind: 'lead', itemName: s.name, step: 'collect', requirement: null };
        renderMessage('bot', KB.ui.askRequirement.replace('{name}', s.name), [
          { label: t(lang, 'discussWA'), action: 'whatsapp-service', value: s.id, style: 'wa' },
          { label: t(lang, 'getQuote'), action: 'quote-for', value: s.name }
        ]);
        break;
      }
      case 'services': {
        const r = servicesListResponse(lang);
        renderMessage('bot', r.text, r.chips);
        break;
      }
      case 'services-all': {
        renderMessage('bot', lang === 'hi' ? 'हमारी सभी सेवाएँ:' : 'All Vithal Technology services:', allServicesChips());
        break;
      }
      case 'products': {
        const r = productsListResponse(lang);
        renderMessage('bot', r.text, r.chips);
        break;
      }
      case 'product': {
        const p = productById(chip.value);
        if (p) { const r = productDetailResponse(p, lang); renderMessage('bot', r.text, r.chips); }
        break;
      }
      case 'ai': {
        renderMessage('bot', KB.ui.aiIntro, KB.ui.aiChips.map((c) => ({ ...c })));
        break;
      }
      case 'quote': {
        const r = quoteStartResponse(lang);
        renderMessage('bot', r.text, r.chips);
        break;
      }
      case 'quote-for': {
        state.flow = { kind: 'quote', itemName: chip.value, step: 'collect', requirement: null };
        renderMessage('bot', t(lang, 'quoteDetail').replace('{name}', chip.value));
        break;
      }
      case 'whatsapp-service': {
        const s = serviceById(chip.value);
        if (s) openWaUrl(serviceWa(s, chip.requirement || state.flow?.requirement));
        break;
      }
      case 'whatsapp-product': {
        const p = productById(chip.value);
        if (p) openWaUrl(productWa(p));
        break;
      }
      case 'whatsapp-general':
        openWaUrl(generalWa(chip.requirement || ''));
        break;
      case 'whatsapp-custom':
        openWaUrl(customWa(chip.value, chip.requirement || ''));
        break;
      case 'email':
        window.location.href = `mailto:${KB.contact.email}?subject=${encodeURIComponent('Enquiry - Vithal Technology')}`;
        break;
      default:
        break;
    }
    saveSession();
  }

  /* ---------- open / close / minimize ---------- */
  function openChat(context) {
    chat.classList.remove('is-minimized');
    chat.classList.add('is-open');
    chat.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');
    if (els.notify) els.notify.remove();

    if (!state.greeted) {
      state.greeted = true;
      if (context && context.type) {
        // Website-triggered context (service card, product card, modal CTA):
        // short greeting first, then the contextual reply from the brain.
        renderMessage('bot', KB.ui.welcome.split('\n\n')[0], []);
        botRespond('__context__', context);
      } else {
        renderMessage('bot', KB.ui.welcome, KB.ui.welcomeChips.map((c) => ({ ...c })));
      }
      saveSession();
    } else if (context && context.type) {
      botRespond('__context__', context);
    }
    setTimeout(() => els.input.focus(), 350);
  }

  function closeChat() {
    chat.classList.remove('is-open');
    chat.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  function minimizeChat() {
    const min = chat.classList.toggle('is-minimized');
    els.minimize.setAttribute('aria-label', min ? 'Restore chat' : 'Minimize chat');
  }

  /* ---------- events ---------- */
  fab.addEventListener('click', () => {
    chat.classList.contains('is-open') ? closeChat() : openChat();
  });
  fab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openChat(); }
  });
  els.close.addEventListener('click', closeChat);
  els.minimize.addEventListener('click', minimizeChat);
  els.send.addEventListener('click', () => { sendUserMessage(els.input.value); els.input.value = ''; });
  els.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); sendUserMessage(els.input.value); els.input.value = ''; }
  });

  // Quick action bar (static buttons in markup)
  chat.querySelectorAll('.va-quick').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'services') handleChip({ label: 'Services', action: 'services' });
      else if (action === 'products') handleChip({ label: 'Products', action: 'products' });
      else if (action === 'quote') handleChip({ label: 'Get a Quote', action: 'quote' });
      else if (action === 'whatsapp') handleChip({ label: 'WhatsApp', action: 'whatsapp-general' });
    });
  });

  // ESC closes the chat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chat.classList.contains('is-open')) closeChat();
  });

  // Tooltip copy per state
  fab.setAttribute('data-tip', 'Ask Vithal AI');
  fab.addEventListener('mouseenter', () => { els.tooltip.textContent = 'Chat with Vithal AI'; });

  // Seen flag + session restore
  try {
    if (localStorage.getItem(STORAGE_SEEN)) { if (els.notify) els.notify.remove(); }
    else localStorage.setItem(STORAGE_SEEN, '1');
  } catch (e) {}
  loadSession();

  /* ==========================================================
     PUBLIC API — used by the website (service cards, modals)
     ========================================================== */
  window.VithalAI = {
    /** Open the assistant, optionally with a service/product context.
     *  @param {{type:'service'|'product', id:string}} [context] */
    open(context) { openChat(context); },
    close: closeChat
  };
})();
