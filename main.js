/* ============================================================
   VITHAL TECHNOLOGY — Application Logic
   Navigation, service/product data, premium detail modal,
   Vithal AI hand-off, accessibility (ESC, focus trap, ARIA).
   ============================================================ */

(() => {
  'use strict';

  /* ---------------------------------------------------------
     1. MOBILE NAVIGATION — animated hamburger overlay
     --------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const body = document.body;

  function setMenu(open) {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('menu-open', open);
    if (open) {
      const first = mobileMenu.querySelector('a');
      if (first) first.focus();
    } else if (document.activeElement && mobileMenu.contains(document.activeElement)) {
      navToggle.focus();
    }
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () =>
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------------------------------------------------------
     2. SVG ICON LIBRARY — futuristic line icons (stroke style)
     --------------------------------------------------------- */
  const svg = (inner, vb = '0 0 48 48') =>
    `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const ICONS = {
    web: svg('<rect x="6" y="9" width="36" height="26" rx="2.5"/><path d="M6 16h36"/><circle cx="11" cy="12.6" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="12.6" r="1" fill="currentColor" stroke="none"/><path d="M14 23h12M14 28h8M30 22l3 3-3 3M35 22v8"/>'),
    app: svg('<rect x="14" y="6" width="20" height="36" rx="3.5"/><path d="M20 10h8"/><circle cx="24" cy="37.5" r="1.4" fill="currentColor" stroke="none"/><path d="M19 18h10M19 23h6"/>'),
    ai: svg('<circle cx="24" cy="24" r="5"/><circle cx="10" cy="12" r="2.6"/><circle cx="38" cy="12" r="2.6"/><circle cx="8" cy="34" r="2.6"/><circle cx="40" cy="34" r="2.6"/><circle cx="24" cy="8" r="2.6"/><circle cx="24" cy="40" r="2.6"/><path d="M13.5 14.2 19.8 20M34.5 14.2 28.2 20M11 31l6.5-3.8M37 31l-6.5-3.8M24 13.6V19M24 34.4V29"/>'),
    agent: svg('<circle cx="24" cy="24" r="4.5"/><circle cx="9" cy="10" r="3"/><circle cx="39" cy="10" r="3"/><circle cx="9" cy="38" r="3"/><circle cx="39" cy="38" r="3"/><path d="M12.2 12.4 20.4 20M35.8 12.4 27.6 20M12.2 35.6 20.4 28M35.8 35.6 27.6 28"/><circle cx="9" cy="10" r=".9" fill="currentColor"/><circle cx="39" cy="10" r=".9" fill="currentColor"/><circle cx="9" cy="38" r=".9" fill="currentColor"/><circle cx="39" cy="38" r=".9" fill="currentColor"/>'),
    card: svg('<rect x="8" y="12" width="32" height="24" rx="3"/><path d="M8 19h32"/><path d="M13 26h9M13 30h6"/><path d="M28 25h7M28 29h7M28 33h4"/>'),
    software: svg('<rect x="6" y="8" width="36" height="24" rx="2.5"/><path d="M6 14h36"/><path d="M12 22l4 4-4 4M24 30h10"/><path d="M18 40h12M24 32v8"/>'),
    game: svg('<path d="M14 18h20c5 0 8 4.2 8 9.5S39 37 35 37c-2.4 0-4-1.2-5.4-3.4L28 32h-8l-1.6 1.6C17 35.8 15.4 37 13 37c-4 0-7-4.8-7-9.5S9 18 14 18Z"/><path d="M13 24v6M10 27h6"/><circle cx="31" cy="24.5" r="1.4" fill="currentColor"/><circle cx="35" cy="28.5" r="1.4" fill="currentColor"/>'),
    iot: svg('<rect x="17" y="20" width="14" height="12" rx="2"/><circle cx="24" cy="26" r="2.4"/><path d="M24 20v-5M14 20a9 9 0 0 1 20 0M10 20a13 13 0 0 1 28 0"/><path d="M24 32v6h10"/>'),
    ads: svg('<path d="M8 36l9-12 7 8 6-14 10 18"/><path d="M6 40h36"/><path d="M33 10l4-2 1 4"/>'),
    lead: svg('<path d="M8 8h32l-12 14v12l-8 6V22L8 8Z"/><path d="M24 40v-4"/><circle cx="38" cy="16" r="2.2"/><circle cx="40" cy="24" r="2.2"/>'),
    cyber: svg('<path d="M24 5l15 5.5V22c0 9.5-6.4 16.6-15 21-8.6-4.4-15-11.5-15-21V10.5L24 5Z"/><path d="M17 23.5l5 5 9.5-10"/><path d="M24 11v4"/>'),
    saas: svg('<rect x="7" y="12" width="34" height="22" rx="3"/><path d="M7 19h34"/><path d="M13 28h6M13 24h3M24 24h11M24 28h7"/><path d="M17 40h14M24 34v6"/><path d="M12 9.5 24 5l12 4.5"/>'),
    led: svg('<path d="M24 6a11 11 0 0 0-7 19.5c1.4 1.2 2 2.4 2 4.5h10c0-2.1.6-3.3 2-4.5A11 11 0 0 0 24 6Z"/><path d="M20 34h8M21 38h6M24 18v-5M17.5 21l-3-3M30.5 21l3-3"/><circle cx="24" cy="21" r="3.2"/>'),
    cctv: svg('<rect x="10" y="14" width="22" height="14" rx="2.5"/><path d="M32 17l8-3v14l-8-3"/><circle cx="19" cy="21" r="3.4"/><path d="M16 32l-3 8h7"/>'),
    drone: svg('<rect x="19" y="19" width="10" height="7" rx="2"/><circle cx="9" cy="10" r="4.5"/><circle cx="39" cy="10" r="4.5"/><circle cx="9" cy="38" r="4.5"/><circle cx="39" cy="38" r="4.5"/><path d="M13 13l8 7M35 13l-8 7M13 35l8-7M35 35l-8-7"/>'),
    robot: svg('<rect x="14" y="15" width="20" height="17" rx="3"/><circle cx="20" cy="23" r="1.8"/><circle cx="28" cy="23" r="1.8"/><path d="M20 28h8M24 15V8"/><circle cx="24" cy="7" r="1.6"/><path d="M10 21h4M10 27h4M34 21h4M34 27h4M18 38h4l1 4h6l1-4h4"/>'),
    rover: svg('<path d="M10 28h28l-3 8H13l-3-8Z"/><path d="M15 28l3-8h12l3 8"/><circle cx="17" cy="38" r="3.4"/><circle cx="31" cy="38" r="3.4"/><path d="M24 20v-6"/><circle cx="24" cy="13" r="1.8"/><path d="M10 24H6M38 24h4"/>'),
    device: svg('<rect x="17" y="18" width="14" height="12" rx="2"/><circle cx="24" cy="24" r="2.2"/><path d="M24 18v-6M18 24h-8M30 24h8M24 30v8M20 38h8"/><path d="M8 20v8M36 20v8"/>')
  };

  /* ---------------------------------------------------------
     3. SERVICE CATALOG — full detail data for cards + modal
     --------------------------------------------------------- */
  const SERVICES = [
    {
      id: 'website-development', icon: 'web', name: 'Website Development',
      tagline: 'Fast, secure, conversion-focused websites engineered to represent your business at its best.',
      what: 'A professional website is your digital headquarters. We design and build everything from elegant corporate sites to complex web portals — responsive, SEO-friendly and built for speed.',
      builds: ['Business websites', 'Landing pages', 'Corporate websites', 'E-commerce stores', 'Portfolio websites', 'Web portals', 'Admin dashboards'],
      features: ['Mobile-first responsive design', 'SEO-ready structure', 'Performance optimization', 'CMS-friendly builds', 'Analytics integration'],
      bestFor: 'Businesses, startups, professionals and organizations of every size.',
      process: ['Requirement discussion', 'Wireframe & design', 'Development & content', 'Testing & launch']
    },
    {
      id: 'app-development', icon: 'app', name: 'App Development',
      tagline: 'Native-quality mobile applications designed around real user journeys.',
      what: 'We build mobile applications that people love to use — smooth, reliable and designed for the platforms your customers actually use.',
      builds: ['Android apps', 'Business apps', 'Customer apps', 'Booking apps', 'E-commerce apps', 'Utility apps'],
      features: ['Intuitive UI/UX', 'Offline-capable architecture', 'Push notifications', 'Payment integration', 'Play Store launch support'],
      bestFor: 'Businesses and startups reaching customers on mobile.',
      process: ['Discovery & scope', 'UI/UX design', 'Agile development', 'Testing & store release']
    },
    {
      id: 'ai-development', icon: 'ai', name: 'AI Development',
      tagline: 'Applied artificial intelligence that turns your data and workflows into leverage.',
      what: 'From intelligent chatbots to document intelligence, we build practical AI systems that automate work, extract insight and augment your team.',
      builds: ['AI applications', 'AI chatbots', 'AI automation', 'Document intelligence', 'Business intelligence', 'AI-powered workflows'],
      features: ['Custom model integration', 'Natural language processing', 'Document parsing & extraction', 'Workflow automation', 'Human-in-the-loop controls'],
      bestFor: 'Companies ready to automate decisions and unlock their data.',
      process: ['Use-case discovery', 'Data review', 'Prototype & iterate', 'Deployment & tuning']
    },
    {
      id: 'ai-agent-development', icon: 'agent', name: 'AI Agent Development',
      tagline: 'Autonomous digital workers that qualify leads, support customers and run tasks around the clock.',
      what: 'AI agents are software workers that perceive, decide and act. We design multi-agent systems that handle real business processes — reliably and with oversight.',
      builds: ['Sales agents', 'Customer support agents', 'Lead qualification agents', 'Task automation', 'AI assistants', 'Business workflow agents'],
      features: ['Multi-agent orchestration', 'Tool & API integrations', 'CRM hand-off', 'Escalation to humans', 'Conversation memory'],
      bestFor: 'Sales and support teams who need scale without headcount.',
      process: ['Process mapping', 'Agent design', 'Integration & testing', 'Live pilot & optimization']
    },
    {
      id: 'e-visiting-card', icon: 'card', name: 'E-Visiting Card Development',
      tagline: 'Your business identity in a pocket — shareable, trackable and always up to date.',
      what: 'A digital visiting card replaces paper with a living profile: contact buttons, QR code, social links and lead capture in one beautiful link.',
      builds: ['Digital profile pages', 'QR code integration', 'Contact buttons', 'WhatsApp integration', 'Social media links', 'Website links', 'Lead capture forms'],
      features: ['One-tap contact save', 'Instant WhatsApp connect', 'Shareable link & QR', 'Lead capture analytics', 'Always-current details'],
      bestFor: 'Professionals, sales teams and networking-focused businesses.',
      process: ['Identity & content', 'Card design', 'QR & integrations', 'Launch & sharing']
    },
    {
      id: 'custom-software', icon: 'software', name: 'Custom Software Development',
      tagline: 'Business software shaped exactly around how your organization works.',
      what: 'Off-the-shelf tools force you to adapt. We build custom systems — CRM, ERP, billing and dashboards — that adapt to you.',
      builds: ['CRM systems', 'ERP solutions', 'Billing software', 'Inventory management', 'Booking systems', 'Employee management', 'Business dashboards'],
      features: ['Role-based access', 'Reporting & dashboards', 'Third-party integrations', 'Scalable architecture', 'Data ownership'],
      bestFor: 'Growing businesses outgrowing spreadsheets and generic tools.',
      process: ['Process analysis', 'System architecture', 'Iterative development', 'Rollout & training']
    },
    {
      id: 'game-development', icon: 'game', name: 'Game Development',
      tagline: 'Engaging interactive experiences — from serious business games to mobile titles.',
      what: 'Games are the strongest engagement medium. We build polished interactive experiences with real gameplay mechanics and measurable outcomes.',
      builds: ['Mobile games', 'Educational games', 'Business games', 'Interactive experiences'],
      features: ['Game design & mechanics', '2D/3D art pipelines', 'Monetization ready', 'Cross-platform builds', 'Analytics built-in'],
      bestFor: 'Brands, educators and publishers seeking engagement.',
      process: ['Concept & GDD', 'Prototype', 'Production', 'Launch & live-ops']
    },
    {
      id: 'iot-software', icon: 'iot', name: 'IoT Software Development',
      tagline: 'From sensor to dashboard — software that gives your devices a voice.',
      what: 'Connected devices only matter when their data becomes insight. We build the monitoring, control and analytics layer for your hardware.',
      builds: ['Sensor dashboards', 'Device monitoring systems', 'Remote control apps', 'IoT analytics', 'Connected device platforms'],
      features: ['Real-time telemetry', 'Device fleet management', 'Alerting & rules engine', 'OTA update concepts', 'Cloud ingestion pipelines'],
      bestFor: 'Hardware teams and industries deploying connected devices.',
      process: ['Device & data mapping', 'Cloud architecture', 'Dashboard & app build', 'Field deployment']
    },
    {
      id: 'ads', icon: 'ads', name: 'Google Ads / Meta Ads',
      tagline: 'Performance campaigns engineered around leads and conversions — not clicks.',
      what: 'Paid media done properly: structured campaigns, disciplined testing and relentless conversion optimization across Google and Meta platforms.',
      builds: ['Google Ads campaigns', 'Meta Ads campaigns', 'Campaign management', 'Lead generation campaigns', 'Conversion optimization'],
      features: ['Audience research', 'Ad creative testing', 'Landing page alignment', 'Conversion tracking', 'Transparent reporting'],
      bestFor: 'Businesses that need predictable, measurable pipeline.',
      process: ['Account & tracking audit', 'Campaign build', 'Test & optimize', 'Scale winners']
    },
    {
      id: 'lead-generation', icon: 'lead', name: 'Lead Generation',
      tagline: 'A consistent flow of qualified prospects for your sales team.',
      what: 'We combine data, outreach and campaign support to build targeted prospect pipelines — then qualify them so your team talks only to real opportunities.',
      builds: ['B2B leads', 'Targeted prospects', 'Lead databases', 'Lead qualification', 'Campaign support'],
      features: ['ICP definition', 'Database building', 'Outreach sequences', 'Qualification frameworks', 'CRM-ready handoff'],
      bestFor: 'B2B companies and sales teams needing pipeline.',
      process: ['Ideal customer mapping', 'List & asset build', 'Outreach launch', 'Qualify & hand over']
    },
    {
      id: 'cybersecurity', icon: 'cyber', name: 'Cybersecurity Services',
      tagline: 'Practical security that protects your business without slowing it down.',
      what: 'Security is not a product — it is a practice. We assess, harden and monitor your websites, networks and cloud environments with pragmatic, prioritized action.',
      builds: ['Website security', 'Security assessment', 'Vulnerability assessment', 'Network security consulting', 'Cloud security consulting', 'Security monitoring concepts'],
      features: ['Threat modeling', 'Hardening checklists', 'Patch & config review', 'Access control design', 'Incident response planning'],
      bestFor: 'Any organization that handles customer data or runs critical systems.',
      process: ['Scope & assess', 'Risk report', 'Remediation plan', 'Harden & monitor']
    },
    {
      id: 'vithal-ai-saas', icon: 'saas', name: 'VITHAL AI SaaS',
      tagline: 'Subscription AI business tools — powerful software without the upfront build cost.',
      what: 'Our SaaS line packages proven AI capabilities into monthly-subscription tools: assistants, automation and productivity software your team can start using immediately.',
      builds: ['AI business tools', 'Automation software', 'AI assistants', 'Monthly subscription software', 'Business productivity tools'],
      features: ['Subscription pricing', 'Continuous updates', 'Cloud-based access', 'Team workspaces', 'Priority support'],
      bestFor: 'Businesses wanting AI capability today, without a custom build.',
      process: ['Tool selection', 'Workspace setup', 'Team onboarding', 'Ongoing support']
    }
  ];

  /* ---------------------------------------------------------
     4. MANUFACTURING PRODUCT CATALOG
     --------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: 'led-lights', icon: 'led', name: 'LED Lights', category: 'Smart Lighting · HW-01',
      tagline: 'Efficient, long-life illumination engineered for homes, industry and smart cities.',
      what: 'Our LED lighting range combines high-efficiency optics with robust electronics — engineered in-house for residential, commercial, industrial and street applications.',
      applications: ['Residential lighting', 'Commercial lighting', 'Industrial lighting', 'Street lighting', 'Smart lighting'],
      tech: ['High-efficacy LED engines', 'Thermal-optimized housings', 'Dimmable & smart drivers', 'Surge-protected power stages'],
      features: ['Energy efficient by design', 'Long operational life', 'Smart control ready', 'Weather-sealed options']
    },
    {
      id: 'ai-cctv', icon: 'cctv', name: 'AI CCTV Cameras', category: 'Intelligent Surveillance · HW-02',
      tagline: 'Cameras that see — and understand. On-device intelligence for real security.',
      what: 'AI CCTV systems that move beyond recording: intelligent detection concepts, remote monitoring and instant alerting for connected security.',
      applications: ['Smart surveillance', 'AI-based detection concepts', 'Remote monitoring', 'Instant alerts', 'Connected security'],
      tech: ['Edge AI inference concepts', 'HD imaging sensors', 'Night-vision optics', 'Cloud & local recording options'],
      features: ['Event-based alerts', 'Remote live view', 'Expandable camera networks', 'Privacy-aware design']
    },
    {
      id: 'drones', icon: 'drone', name: 'Drones', category: 'Aerial Systems · HW-03',
      tagline: 'Unmanned aerial platforms for inspection, mapping and industrial data collection.',
      what: 'Engineered drone platforms for permitted commercial applications — carrying sensors, cameras and payloads where people should not have to go.',
      applications: ['Inspection', 'Mapping', 'Industrial applications', 'Research', 'Permitted commercial applications'],
      tech: ['Stabilized flight controllers', 'High-endurance airframes', 'Payload integration', 'Telemetry & ground stations'],
      features: ['Mission planning', 'Repeatable flight paths', 'Data capture pipelines', 'Operator training support']
    },
    {
      id: 'robots', icon: 'robot', name: 'Robots', category: 'Intelligent Machines · HW-04',
      tagline: 'Machines that work alongside people — educational, service and industrial platforms.',
      what: 'From educational robotics kits to service and research prototypes, we engineer robots that teach, assist and automate.',
      applications: ['Educational robots', 'Service robots', 'Security concepts', 'Industrial automation', 'Research prototypes'],
      tech: ['Modular actuator systems', 'Sensor fusion stacks', 'Onboard compute modules', 'ROS-compatible software'],
      features: ['Programmable & expandable', 'Safety-first design', 'Curriculum & docs included', 'Custom payload options']
    },
    {
      id: 'autonomous-vehicles', icon: 'rover', name: 'Autonomous Vehicles', category: 'Autonomous Mobility · HW-05',
      tagline: 'Self-navigating rovers and AGVs for industrial transport and research.',
      what: 'Autonomous ground vehicles engineered for controlled environments — warehouses, factories, campuses and research sites.',
      applications: ['Industrial transport', 'Inspection', 'Automation', 'Research', 'Autonomous mobility'],
      tech: ['LiDAR & vision navigation concepts', 'SLAM software stacks', 'Safety-rated stop systems', 'Fleet scheduling software'],
      features: ['Obstacle detection', 'Route programming', 'Remote supervision', 'Payload platforms']
    },
    {
      id: 'iot-devices', icon: 'device', name: 'IoT Devices', category: 'Connected Electronics · HW-06',
      tagline: 'Sensors, controllers and connected electronics that make environments intelligent.',
      what: 'Purpose-built IoT hardware: smart sensors, monitoring devices and controllers that connect the physical world to your dashboards.',
      applications: ['Smart sensors', 'Controllers', 'Monitoring devices', 'Connected electronics', 'Automation'],
      tech: ['Low-power embedded design', 'Multi-radio connectivity', 'Edge processing options', 'Secure device provisioning'],
      features: ['Long-life field operation', 'Over-the-air updates', 'Cloud dashboard pairing', 'Industrial enclosures']
    }
  ];

  /* ---------------------------------------------------------
     5. VITHAL AI HAND-OFF — "Discuss This Service" opens the
     Vithal AI assistant with the selected item as context.
     The AI then offers WhatsApp continuation inside the chat.
     --------------------------------------------------------- */
  function discussWithAI(type, id) {
    closeModal();
    if (window.VithalAI && typeof window.VithalAI.open === 'function') {
      window.VithalAI.open({ type, id });
    } else {
      // Fallback: direct WhatsApp if the assistant failed to load
      const item = (type === 'service' ? SERVICES : PRODUCTS).find((x) => x.id === id);
      if (item && window.openWhatsApp) window.openWhatsApp(type, item.name);
    }
  }

  /* ---------------------------------------------------------
     6. DETAIL MODAL — accessible, animated, ESC to close
     --------------------------------------------------------- */
  const modal = document.getElementById('detail-modal');
  const modalContent = document.getElementById('modal-content');
  let lastFocused = null;

  const listItems = (arr, cls = '') => arr.map((i) => `<li class="${cls}">${i}</li>`).join('');
  const pillItems = (arr) => arr.map((i) => `<span class="detail-pill">${i}</span>`).join('');

  function renderServiceDetail(s) {
    return `
      <span class="detail-kicker">Technology Service</span>
      <div class="detail-head">
        <div class="detail-icon">${ICONS[s.icon]}</div>
        <div><h3 class="detail-title">${s.name}</h3>
        <p class="detail-tagline">${s.tagline}</p></div>
      </div>
      <h4>What is it?</h4><p>${s.what}</p>
      <h4>What We Can Build</h4>
      <div class="detail-pills">${pillItems(s.builds)}</div>
      <h4>Key Features</h4>
      <ul class="detail-list">${listItems(s.features)}</ul>
      <h4>Who It Is For</h4><p>${s.bestFor}</p>
      <h4>Expected Project Process</h4>
      <ol class="detail-process">${listItems(s.process)}</ol>
      <button class="btn btn-neon btn-block" data-discuss="service" data-id="${s.id}">
        Discuss This Service with Vithal AI
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="1.3"/><circle cx="19" cy="5" r="1.3"/><circle cx="5" cy="19" r="1.3"/><circle cx="19" cy="19" r="1.3"/><path d="M6.2 6.2 9.6 9.6M17.8 6.2 14.4 9.6M6.2 17.8 9.6 14.4M17.8 17.8 14.4 14.4"/></svg>
      </button>`;
  }

  function renderProductDetail(p) {
    return `
      <span class="detail-kicker">Manufacturing · ${p.category}</span>
      <div class="detail-head">
        <div class="detail-icon detail-icon--product">${ICONS[p.icon]}</div>
        <div><h3 class="detail-title">${p.name}</h3>
        <p class="detail-tagline">${p.tagline}</p></div>
      </div>
      <h4>Overview</h4><p>${p.what}</p>
      <h4>Applications</h4>
      <div class="detail-pills">${pillItems(p.applications)}</div>
      <h4>Technology Overview</h4>
      <ul class="detail-list">${listItems(p.tech)}</ul>
      <h4>Key Features</h4>
      <ul class="detail-list">${listItems(p.features)}</ul>
      <button class="btn btn-neon btn-block" data-discuss="product" data-id="${p.id}">
        Request This Product via Vithal AI
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="1.3"/><circle cx="19" cy="5" r="1.3"/><circle cx="5" cy="19" r="1.3"/><circle cx="19" cy="19" r="1.3"/><path d="M6.2 6.2 9.6 9.6M17.8 6.2 14.4 9.6M6.2 17.8 9.6 14.4M17.8 17.8 14.4 14.4"/></svg>
      </button>`;
  }

  function openModal(kind, id, trigger) {
    if (!modal || !modalContent) return;
    const item = (kind === 'service' ? SERVICES : PRODUCTS).find((x) => x.id === id);
    if (!item) return;
    lastFocused = trigger || document.activeElement;
    modalContent.innerHTML = kind === 'service' ? renderServiceDetail(item) : renderProductDetail(item);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  if (modal) {
    modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab' && modal.classList.contains('is-open')) {
        const focusables = modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }

  /* Modal "Discuss / Request" buttons -> hand off to Vithal AI */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-discuss]');
    if (!btn) return;
    e.preventDefault();
    discussWithAI(btn.dataset.discuss, btn.dataset.id);
  });

  /* Cards open the detail modal (click + keyboard) */
  document.querySelectorAll('[data-service]').forEach((card) => {
    const open = () => openModal('service', card.dataset.service, card);
    card.querySelector('.service-cta').addEventListener('click', open);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open details for ' + card.querySelector('h3').textContent);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  document.querySelectorAll('[data-product]').forEach((card) => {
    const open = () => openModal('product', card.dataset.product, card);
    card.querySelector('.product-cta').addEventListener('click', open);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open details for ' + card.querySelector('h3').textContent);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  /* ---------------------------------------------------------
     7. DELEGATED WHATSAPP BINDING — static CTAs site-wide
     --------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-whatsapp]');
    if (!btn) return;
    e.preventDefault();
    openWhatsApp(btn.dataset.whatsapp, btn.dataset.name || '');
  });
})();
