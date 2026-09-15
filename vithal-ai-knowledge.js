/* ============================================================
   VITHAL AI — Structured Knowledge Base
   Single source of truth for the assistant. Update this file
   to add/edit services, products, FAQs or contact details.
   Loaded before js/vithal-ai.js
   ============================================================ */

window.VITHAL_AI_KB = {

  company: {
    name: 'Vithal Technology',
    legalName: 'Vithal Technology Private Limited',
    tagline: "Technology for today's business. Intelligence for tomorrow.",
    focuses: ['Software', 'Artificial Intelligence', 'AI Agents', 'SaaS', 'Cybersecurity',
              'Digital Solutions', 'IoT', 'Electronics', 'Robotics', 'Intelligent Machines',
              'Technology Manufacturing']
  },

  contact: {
    whatsappDisplay: '+91 7498846061',
    whatsappNumber: '917498846061',
    email: 'vithaltechnology@gmail.com'
  },

  /* ----------------------------------------------------------
     SERVICES — keywords drive intent matching.
     whatsapp: pre-filled message template used by CTAs.
     ---------------------------------------------------------- */
  services: [
    {
      id: 'website-development', name: 'Website Development',
      keywords: ['website', 'web site', 'site', 'landing page', 'ecommerce', 'e-commerce',
                 'web portal', 'portal', 'corporate website', 'business website', 'portfolio',
                 'web application', 'dashboard', 'blog'],
      what: 'We create modern, responsive and business-focused websites designed for companies, startups, professionals and organizations.',
      builds: ['Corporate websites', 'Business websites', 'Landing pages', 'Portfolio websites', 'E-commerce websites', 'Custom web applications', 'Admin dashboards'],
      benefits: ['Mobile responsive design', 'Modern UI/UX', 'SEO-ready structure', 'Fast performance', 'Custom functionality'],
      bestFor: 'Businesses, startups, professionals and organizations of every size.',
      useCases: ['Company presence online', 'Product/service showcase', 'Online sales', 'Lead capture pages'],
      whatsapp: 'Hello Vithal Technology, I need Website Development. I would like to discuss my requirement.'
    },
    {
      id: 'app-development', name: 'App Development',
      keywords: ['app', 'application', 'android', 'ios', 'mobile app', 'apk', 'play store',
                 'booking app', 'customer app'],
      what: 'We build smooth, reliable mobile applications for Android and cross-platform use — designed around real user journeys.',
      builds: ['Android apps', 'Business apps', 'Customer apps', 'Booking apps', 'E-commerce apps', 'Utility apps'],
      benefits: ['Intuitive UI/UX', 'Fast performance', 'Push notifications', 'Payment integration', 'Play Store launch support'],
      bestFor: 'Businesses and startups reaching customers on mobile.',
      useCases: ['Customer engagement', 'Mobile bookings & orders', 'Field workforce tools', 'Brand apps'],
      whatsapp: 'Hello Vithal Technology, I need App Development. I would like to discuss my requirement.'
    },
    {
      id: 'ai-development', name: 'AI Development',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'automation',
                 'document intelligence', 'business intelligence', 'ai workflow'],
      what: 'We build practical AI systems — from intelligent chatbots to document intelligence — that automate work and unlock your data.',
      builds: ['AI applications', 'AI chatbots', 'AI automation', 'Document intelligence', 'Business intelligence', 'AI-powered workflows'],
      benefits: ['24/7 automated capability', 'Data-driven insight', 'Reduced manual work', 'Scalable AI systems', 'Human-in-the-loop control'],
      bestFor: 'Companies ready to automate decisions and unlock their data.',
      useCases: ['Customer support chatbots', 'Document processing', 'Data analysis assistants', 'Workflow automation'],
      whatsapp: 'Hello Vithal Technology, I need AI Development. I would like to discuss my requirement.'
    },
    {
      id: 'ai-agent-development', name: 'AI Agent Development',
      keywords: ['agent', 'agents', 'ai agent', 'sales agent', 'support agent', 'autonomous agent',
                 'lead qualification', 'ai assistant', 'workflow agent'],
      what: 'We design AI agents — autonomous digital workers that qualify leads, support customers and run business tasks around the clock.',
      builds: ['Sales agents', 'Customer support agents', 'Lead qualification agents', 'Task automation', 'AI assistants', 'Business workflow agents'],
      benefits: ['Works 24/7', 'Handles volume without headcount', 'Integrates with your CRM & tools', 'Escalates to humans when needed'],
      bestFor: 'Sales and support teams who need scale without adding headcount.',
      useCases: ['WhatsApp AI sales agent', 'Website support agent', 'Lead qualification pipeline', 'Back-office task automation'],
      whatsapp: 'Hello Vithal Technology, I need AI Agent Development. I would like to discuss my requirement.'
    },
    {
      id: 'e-visiting-card', name: 'E-Visiting Card Development',
      keywords: ['visiting card', 'e-card', 'digital card', 'digital visiting', 'qr card', 'business card', 'vcard'],
      what: 'A digital visiting card puts your business identity in a pocket — QR code, contact buttons, WhatsApp and social links in one shareable link.',
      builds: ['Digital profile pages', 'QR code integration', 'Contact buttons', 'WhatsApp integration', 'Social media links', 'Lead capture forms'],
      benefits: ['One-tap contact save', 'Instant WhatsApp connect', 'Always up to date', 'Lead capture built in'],
      bestFor: 'Professionals, sales teams and networking-focused businesses.',
      useCases: ['Networking events', 'Sales teams', 'Personal branding'],
      whatsapp: 'Hello Vithal Technology, I need an E-Visiting Card. I would like to discuss my requirement.'
    },
    {
      id: 'custom-software', name: 'Custom Software Development',
      keywords: ['software', 'custom software', 'crm', 'erp', 'billing software', 'inventory',
                 'management software', 'desktop software', 'saas development'],
      what: 'We build business software shaped exactly around how your organization works — CRM, ERP, billing, inventory and dashboards.',
      builds: ['CRM systems', 'ERP solutions', 'Billing software', 'Inventory management', 'Booking systems', 'Employee management', 'Business dashboards'],
      benefits: ['Fits your exact process', 'Your data, your ownership', 'Integrates with existing tools', 'Scales as you grow'],
      bestFor: 'Growing businesses outgrowing spreadsheets and generic tools.',
      useCases: ['Sales CRM', 'Inventory & billing', 'Operations dashboards', 'Booking management'],
      whatsapp: 'Hello Vithal Technology, I need Custom Software Development. I would like to discuss my requirement.'
    },
    {
      id: 'game-development', name: 'Game Development',
      keywords: ['game', 'gaming', 'mobile game', 'educational game', 'interactive', 'gamification'],
      what: 'We build engaging interactive experiences with real gameplay mechanics — mobile games, educational games and business gamification.',
      builds: ['Mobile games', 'Educational games', 'Business games', 'Interactive experiences'],
      benefits: ['High engagement medium', 'Measurable outcomes', 'Cross-platform builds', 'Analytics built-in'],
      bestFor: 'Brands, educators and publishers seeking engagement.',
      useCases: ['Learning games', 'Brand engagement games', 'Training simulations'],
      whatsapp: 'Hello Vithal Technology, I need Game Development. I would like to discuss my requirement.'
    },
    {
      id: 'iot-software', name: 'IoT Software Development',
      keywords: ['iot', 'internet of things', 'sensor', 'device monitoring', 'remote control',
                 'telemetry', 'connected device', 'smart device'],
      what: 'We build the software layer for connected devices — dashboards, monitoring, control and analytics for your hardware.',
      builds: ['Sensor dashboards', 'Device monitoring systems', 'Remote control apps', 'IoT analytics', 'Connected device platforms'],
      benefits: ['Real-time telemetry', 'Fleet-wide visibility', 'Alerting & rules', 'Cloud integration'],
      bestFor: 'Hardware teams and industries deploying connected devices.',
      useCases: ['Factory sensor monitoring', 'Smart building dashboards', 'Fleet tracking'],
      whatsapp: 'Hello Vithal Technology, I need IoT Software Development. I would like to discuss my requirement.'
    },
    {
      id: 'ads', name: 'Google Ads / Meta Ads',
      keywords: ['google ads', 'meta ads', 'facebook ads', 'instagram ads', 'advertising',
                 'ad campaign', 'ppc', 'paid ads', 'marketing'],
      what: 'We run performance campaigns on Google and Meta — structured, tested and optimized for leads and conversions, not just clicks.',
      builds: ['Google Ads campaigns', 'Meta Ads campaigns', 'Campaign management', 'Lead generation campaigns', 'Conversion optimization'],
      benefits: ['Measurable ROI', 'Precise targeting', 'Continuous testing', 'Transparent reporting'],
      bestFor: 'Businesses that need predictable, measurable pipeline.',
      useCases: ['Lead generation', 'E-commerce sales', 'Local business promotion'],
      whatsapp: 'Hello Vithal Technology, I need Google Ads / Meta Ads services. I would like to discuss my requirement.'
    },
    {
      id: 'lead-generation', name: 'Lead Generation',
      keywords: ['lead', 'leads', 'lead generation', 'prospects', 'b2b leads', 'database',
                 'outreach', 'customers chahiye', 'clients'],
      what: 'We build targeted prospect pipelines and qualify them — so your sales team talks only to real opportunities.',
      builds: ['B2B leads', 'Targeted prospects', 'Lead databases', 'Lead qualification', 'Campaign support'],
      benefits: ['Consistent pipeline', 'Qualified prospects', 'CRM-ready handoff', 'Targeted to your ICP'],
      bestFor: 'B2B companies and sales teams needing pipeline.',
      useCases: ['Sales pipeline building', 'New market entry', 'Event promotion'],
      whatsapp: 'Hello Vithal Technology, I need Lead Generation. I would like to discuss my requirement.'
    },
    {
      id: 'cybersecurity', name: 'Cybersecurity Services',
      keywords: ['security', 'cyber', 'cybersecurity', 'hacking', 'hacker', 'vulnerability',
                 'secure website', 'ssl', 'firewall', 'protection', 'breach'],
      what: 'We assess, harden and monitor your websites, networks and cloud environments with pragmatic, prioritized security action.',
      builds: ['Website security', 'Security assessment', 'Vulnerability assessment', 'Network security consulting', 'Cloud security consulting', 'Security monitoring concepts'],
      benefits: ['Reduced risk exposure', 'Prioritized remediation', 'Hardening playbooks', 'Incident response planning'],
      bestFor: 'Any organization that handles customer data or runs critical systems.',
      useCases: ['Website hardening', 'Pre-launch audits', 'Cloud security review'],
      whatsapp: 'Hello Vithal Technology, I need Cybersecurity Services. I would like to discuss my requirement.'
    },
    {
      id: 'vithal-ai-saas', name: 'Vithal AI SaaS',
      keywords: ['saas', 'subscription software', 'vithal ai', 'ai tools', 'software subscription',
                 'monthly software', 'ai product'],
      what: 'Vithal AI SaaS is our subscription software line — AI business tools, automation and assistants available on a monthly plan.',
      builds: ['AI business tools', 'Automation software', 'AI assistants', 'Monthly subscription software', 'Business productivity tools'],
      benefits: ['Start immediately', 'No upfront build cost', 'Continuous updates', 'Cloud-based access'],
      bestFor: 'Businesses wanting AI capability today, without a custom build.',
      useCases: ['AI assistant for teams', 'Document automation', 'Productivity tooling'],
      whatsapp: 'Hello Vithal Technology, I want to know about Vithal AI SaaS. I would like to discuss my requirement.'
    }
  ],

  /* ----------------------------------------------------------
     MANUFACTURING / PRODUCTS
     ---------------------------------------------------------- */
  products: [
    {
      id: 'led-lights', name: 'LED Lights',
      keywords: ['led', 'light', 'lights', 'lighting', 'bulb', 'street light', 'smart light'],
      what: 'High-efficiency LED lighting engineered for residential, commercial, industrial, street and smart lighting applications.',
      applications: ['Residential lighting', 'Commercial lighting', 'Industrial lighting', 'Street lighting', 'Smart lighting'],
      whatsapp: 'Hello Vithal Technology, I need the LED Lights product. I would like to discuss my requirement.'
    },
    {
      id: 'ai-cctv', name: 'AI CCTV Cameras',
      keywords: ['cctv', 'camera', 'surveillance', 'security camera', 'ai camera', 'monitoring camera'],
      what: 'AI CCTV systems with intelligent detection concepts, remote monitoring and instant alerts for connected security.',
      applications: ['Smart surveillance', 'AI-based detection concepts', 'Remote monitoring', 'Instant alerts', 'Connected security'],
      whatsapp: 'Hello Vithal Technology, I need the AI CCTV Camera product. I would like to discuss my requirement.'
    },
    {
      id: 'drones', name: 'Drones',
      keywords: ['drone', 'drones', 'uav', 'aerial', 'flying', 'mapping drone'],
      what: 'Engineered drone platforms for inspection, mapping, industrial applications and permitted commercial use.',
      applications: ['Inspection', 'Mapping', 'Industrial applications', 'Research', 'Permitted commercial applications'],
      whatsapp: 'Hello Vithal Technology, I need the Drones product. I would like to discuss my requirement.'
    },
    {
      id: 'robots', name: 'Robots',
      keywords: ['robot', 'robots', 'robotics', 'machine', 'automation robot', 'educational robot'],
      what: 'Robots that teach, assist and automate — educational robots, service robots, industrial automation and research prototypes.',
      applications: ['Educational robots', 'Service robots', 'Security concepts', 'Industrial automation', 'Research prototypes'],
      whatsapp: 'Hello Vithal Technology, I need the Robots product. I would like to discuss my requirement.'
    },
    {
      id: 'autonomous-vehicles', name: 'Autonomous Vehicles',
      keywords: ['autonomous', 'vehicle', 'agv', 'rover', 'self driving', 'self-driving', 'transport robot'],
      what: 'Self-navigating rovers and AGVs for industrial transport, inspection, automation and research.',
      applications: ['Industrial transport', 'Inspection', 'Automation', 'Research', 'Autonomous mobility'],
      whatsapp: 'Hello Vithal Technology, I need the Autonomous Vehicles product. I would like to discuss my requirement.'
    },
    {
      id: 'iot-devices', name: 'IoT Devices',
      keywords: ['iot device', 'sensor device', 'controller', 'smart sensor', 'connected electronics', 'gadget'],
      what: 'Smart sensors, controllers and connected electronics that link the physical world to your dashboards.',
      applications: ['Smart sensors', 'Controllers', 'Monitoring devices', 'Connected electronics', 'Automation'],
      whatsapp: 'Hello Vithal Technology, I need the IoT Devices product. I would like to discuss my requirement.'
    }
  ],

  /* ----------------------------------------------------------
     SMART FAQ — keywords drive matching. Answers stay factual;
     nothing is invented beyond provided company information.
     ---------------------------------------------------------- */
  faqs: [
    {
      id: 'what-is-vithal', keys: ['who are you', 'what is vithal', 'about company', 'about vithal', 'vithal technology kya'],
      answer: 'Vithal Technology (Vithal Technology Private Limited) is an integrated technology and manufacturing company focused on software, artificial intelligence, cybersecurity, SaaS, IoT, electronics, robotics and intelligent machines.\n\nWe build both digital solutions and hardware products — one technology partner, multiple capabilities.',
      chips: [{ label: 'Explore Services', action: 'services' }, { label: 'View Products', action: 'products' }]
    },
    {
      id: 'ai-agents', keys: ['ai agent', 'agents', 'chatbot for business', 'automation agent'],
      answer: 'Yes — AI Agent Development is one of our core services.\n\nWe build:\n• Sales agents\n• Customer support agents\n• WhatsApp AI agents\n• Lead qualification agents\n• Business workflow agents\n\nThey work 24/7, integrate with your tools and hand over to humans when needed.',
      chips: [{ label: 'Discuss AI Agents', action: 'service', value: 'ai-agent-development' }, { label: 'WhatsApp AI Agent Idea', action: 'whatsapp-service', value: 'ai-agent-development' }]
    },
    {
      id: 'cyber-faq', keys: ['cybersecurity', 'security service', 'website secure', 'vulnerability'],
      answer: 'Yes. Our Cybersecurity Services include:\n• Website security\n• Security assessment\n• Vulnerability assessment\n• Network & cloud security consulting\n• Security monitoring concepts',
      chips: [{ label: 'Discuss Security', action: 'service', value: 'cybersecurity' }, { label: 'Talk on WhatsApp', action: 'whatsapp-service', value: 'cybersecurity' }]
    },
    {
      id: 'custom-soft-faq', keys: ['custom software', 'crm', 'erp', 'billing', 'management system'],
      answer: 'Absolutely. We build custom software shaped around your exact process:\n• CRM systems\n• ERP solutions\n• Billing & inventory\n• Booking systems\n• Employee management\n• Business dashboards',
      chips: [{ label: 'Discuss Software', action: 'service', value: 'custom-software' }, { label: 'Get Quote', action: 'quote' }]
    },
    {
      id: 'app-faq', keys: ['build app', 'make app', 'mobile application', 'android app'],
      answer: 'Yes, we develop mobile apps — Android and cross-platform business apps, booking apps, e-commerce apps and utility apps, with Play Store launch support.',
      chips: [{ label: 'Discuss App', action: 'service', value: 'app-development' }, { label: 'Get Quote', action: 'quote' }]
    },
    {
      id: 'website-faq', keys: ['build website', 'make website', 'website banv', 'website chahiye', 'need website'],
      answer: 'Yes! We build modern, responsive websites — corporate sites, business websites, landing pages, e-commerce stores, portfolios and web portals. SEO-ready and fast.',
      chips: [{ label: 'Discuss Website', action: 'service', value: 'website-development' }, { label: 'Get Quote', action: 'quote' }]
    },
    {
      id: 'saas-faq', keys: ['saas', 'subscription', 'vithal ai saas'],
      answer: 'Vithal AI SaaS is our subscription software line — AI business tools, automation and assistants on a monthly plan. Start using AI capability today without a custom build.',
      chips: [{ label: 'Know More', action: 'service', value: 'vithal-ai-saas' }, { label: 'Get Quote', action: 'quote' }]
    },
    {
      id: 'contact-faq', keys: ['contact', 'phone', 'email', 'reach you', 'number', 'call', 'mail'],
      answer: 'You can reach Vithal Technology here:\n\n• WhatsApp: +91 7498846061\n• Email: vithaltechnology@gmail.com\n\nFastest response is on WhatsApp — tap below to start a chat.',
      chips: [{ label: 'Chat on WhatsApp', action: 'whatsapp-general' }, { label: 'Send Email', action: 'email' }]
    },
    {
      id: 'quote-faq', keys: ['quote', 'price', 'pricing', 'cost', 'kitna', 'charges', 'rate', 'budget'],
      answer: 'I can help you get a quote right here. Every project is scoped individually — tell me what you need and our team will respond with a proper estimate on WhatsApp.',
      chips: [{ label: 'Get a Quote', action: 'quote' }]
    },
    {
      id: 'whatsapp-faq', keys: ['whatsapp', 'discuss project', 'talk to team', 'human'],
      answer: 'Of course! You can discuss your project directly with the Vithal Technology team on WhatsApp.',
      chips: [{ label: 'Talk to Vithal Technology', action: 'whatsapp-general' }]
    },
    {
      id: 'time-faq', keys: ['time', 'delivery', 'kitne din', 'how long', 'deadline', 'duration'],
      answer: 'Timelines depend on the scope and features of your project. Share your requirement and the team will give you a realistic delivery plan on WhatsApp.',
      chips: [{ label: 'Discuss on WhatsApp', action: 'whatsapp-general' }]
    }
  ],

  /* ----------------------------------------------------------
     WHATSAPP MESSAGE TEMPLATES
     {name}      = service or product name
     {requirement} = visitor's requirement text (when available)
     ---------------------------------------------------------- */
  whatsapp: {
    service: 'Hello Vithal Technology, I need {name}. I would like to discuss my requirement.',
    product: 'Hello Vithal Technology, I need the {name} product. I would like to discuss my requirement.',
    general: 'Hello Vithal Technology, I need a service or product. I would like to discuss my requirement.',
    withRequirement: '\n\nMy requirement: {requirement}'
  },

  /* ----------------------------------------------------------
     UI COPY
     ---------------------------------------------------------- */
  ui: {
    welcome: "Hello! 👋\nI'm Vithal AI, the intelligent assistant of Vithal Technology.\n\nI can help you understand our services, products, solutions and help you start your project.\n\nWhat would you like to explore?",
    welcomeChips: [
      { label: 'Website Development', action: 'service', value: 'website-development' },
      { label: 'App Development', action: 'service', value: 'app-development' },
      { label: 'AI & AI Agents', action: 'ai' },
      { label: 'Cybersecurity', action: 'service', value: 'cybersecurity' },
      { label: 'Software Development', action: 'service', value: 'custom-software' },
      { label: 'Manufacturing', action: 'products' },
      { label: 'Products', action: 'products' },
      { label: 'Get a Quote', action: 'quote' }
    ],
    fallback: "I don't have enough information to answer that accurately. I can connect you with the Vithal Technology team on WhatsApp.",
    askRequirement: 'Great choice! 👋 I can help you with {name}.\n\nWhat would you like to build? Please describe your requirement briefly.',
    quoteAsk: 'What would you like a quote for?',
    quoteCategories: [
      { label: 'Website', action: 'quote-for', value: 'Website Development' },
      { label: 'App', action: 'quote-for', value: 'App Development' },
      { label: 'AI', action: 'quote-for', value: 'AI Development' },
      { label: 'AI Agent', action: 'quote-for', value: 'AI Agent Development' },
      { label: 'Software', action: 'quote-for', value: 'Custom Software' },
      { label: 'Cybersecurity', action: 'quote-for', value: 'Cybersecurity Services' },
      { label: 'Digital Marketing', action: 'quote-for', value: 'Google / Meta Ads' },
      { label: 'Product', action: 'quote-for', value: 'a Hardware Product' },
      { label: 'Other', action: 'quote-for', value: 'a Project' }
    ],
    quoteDetailAsk: 'Please briefly describe your requirement for {name} — what should it do, who is it for, and when do you want to start? (Budget is optional)',
    quoteDone: "Thanks! I have understood your requirement.\n\nYou can continue the discussion with the Vithal Technology team on WhatsApp.",
    servicesIntro: 'We provide technology solutions across software, AI, cybersecurity, digital marketing and IoT.\n\nOur major services include:\n\n• Website Development\n• App Development\n• AI Development\n• AI Agent Development\n• Custom Software\n• E-Visiting Cards\n• Game Development\n• IoT Software\n• Google / Meta Ads\n• Lead Generation\n• Cybersecurity\n• Vithal AI SaaS\n\nWould you like details about any specific service?',
    productsIntro: 'Vithal Technology is also developing technology products and intelligent hardware solutions.\n\nOur product categories include:\n\n• LED Lights\n• AI CCTV Cameras\n• Drones\n• Robots\n• Autonomous Vehicles\n• IoT Devices\n\nSelect a product to learn more.',
    aiIntro: 'Our AI capabilities cover two areas:\n\n• AI Development — chatbots, automation, document intelligence, business intelligence\n• AI Agent Development — sales agents, support agents, WhatsApp agents, workflow agents\n\nWhat would you like to explore?',
    aiChips: [
      { label: 'Customer Support Agent', action: 'whatsapp-custom', value: 'a Customer Support AI Agent' },
      { label: 'WhatsApp AI Agent', action: 'whatsapp-custom', value: 'a WhatsApp AI Agent' },
      { label: 'Business Automation Agent', action: 'whatsapp-custom', value: 'a Business Automation AI Agent' },
      { label: 'Custom AI Agent', action: 'whatsapp-custom', value: 'a Custom AI Agent' },
      { label: 'Talk to Team', action: 'whatsapp-general' }
    ]
  }
};
