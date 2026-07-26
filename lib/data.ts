// ─── Services ────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "hvac",
    slug: "hvac-systems",
    icon: "Wind",
    title: "HVAC Systems",
    shortDesc:
      "End-to-end HVAC design, installation, and commissioning for pharmaceutical plants, hospitals, and industrial facilities — built for regulatory compliance and lifetime reliability.",
    fullDesc:
      "Our HVAC solutions are designed by ISHRAE and ASHRAE-certified engineers who understand the critical importance of air quality in pharmaceutical and healthcare environments. We deliver systems that meet WHO-GMP, US-FDA, and EU-GMP standards.",
    specs: [
      "Dew point control down to -40°C",
      "HEPA H14 filtration (≥99.995% efficiency)",
      "Laminar and turbulent airflow design",
      "AHU selection and duct design per ASHRAE 62.1",
      "Energy-optimized VRF/VRV systems",
      "BMS integration and SCADA monitoring",
    ],
    standards: ["ISO 14644", "WHO-GMP", "US-FDA 21 CFR Part 11", "ASHRAE 62.1"],
    image: "/images/projects/project-2.png",
    keyApplications: [
      "Pharmaceutical manufacturing",
      "Cleanroom HVAC",
      "Hospital & healthcare",
    ],
  },
  {
    id: "cleanroom",
    slug: "cleanroom-solutions",
    icon: "Shield",
    title: "Cleanroom Solutions",
    shortDesc:
      "Turnkey cleanroom design, construction, and validation for pharmaceutical manufacturing and sterile fill-finish — zero audit failures, guaranteed.",
    fullDesc:
      "We design, construct, and validate cleanrooms to ISO 14644 classifications (ISO 5 to ISO 8), delivering fully compliant environments for pharmaceutical API synthesis, sterile fill-finish, medical device manufacturing, and semiconductor fabrication.",
    specs: [
      "ISO 5 to ISO 8 classification",
      "Modular and stick-built construction",
      "PVC, GRP, and powder-coated steel panels",
      "Positive and negative pressure cascades",
      "Air shower and pass-box integration",
      "Particle count validation per ISO 14644-1",
    ],
    standards: ["ISO 14644-1/2", "EU-GMP Annex 1", "NADCA standards", "cGMP"],
    image: "/images/projects/project-3.png",
    keyApplications: [
      "Pharma manufacturing",
      "Sterile fill-finish",
      "Medical device production",
    ],
  },
  {
    id: "bim",
    slug: "bim-modelling",
    icon: "Layers",
    title: "BIM Modelling",
    shortDesc:
      "Advanced 3D Building Information Modelling for clash detection, MEP coordination, and facility lifecycle management.",
    fullDesc:
      "Our BIM team uses Revit and Navisworks to create LOD 300–400 models that detect clashes before site work begins, reducing change orders and construction delays by up to 40%.",
    specs: [
      "LOD 200 to LOD 500 deliverables",
      "Clash detection and coordination",
      "MEP routing optimisation",
      "As-built model handover",
      "4D construction sequencing",
      "COBie data export for FM",
    ],
    standards: ["ISO 19650", "PAS 1192", "BEP Protocol"],
    image: "/images/projects/project-4.png",
    keyApplications: [
      "Clash detection",
      "MEP coordination",
      "Digital twin creation",
    ],
  },
  {
    id: "bms",
    slug: "bms-electrical",
    icon: "Zap",
    title: "BMS & Electrical",
    shortDesc:
      "Integrated Building Management Systems and complete electrical engineering from concept to commissioning.",
    fullDesc:
      "We design and commission BMS platforms (Schneider EcoStruxure, Siemens Desigo, Honeywell) that give you real-time control of HVAC, lighting, access control, and energy metering from a single pane of glass.",
    specs: [
      "SCADA and HMI panel design",
      "21 CFR Part 11 audit trail compliance",
      "BACnet/Modbus/LON integration",
      "UPS, DG, and LT panel engineering",
      "Energy metering and sub-metering",
      "Alarm management and trending",
    ],
    standards: ["IEC 60364", "IS 732", "21 CFR Part 11", "ASHRAE 135"],
    image: "/images/bms.jpg",
    keyApplications: [
      "SCADA systems",
      "Energy management",
      "Automation controls",
    ],
  },
  {
    id: "pharma",
    slug: "pharmaceutical-engineering",
    icon: "FlaskConical",
    title: "Pharmaceutical Engineering",
    shortDesc:
      "Complete pharma facility engineering — from API block design to sterile zone validation — meeting WHO, US-FDA, and EU-GMP standards.",
    fullDesc:
      "We act as a single point of responsibility for complete pharmaceutical facility projects, including process equipment layout, clean utility systems (WFI, PW, clean steam), and regulatory documentation packages.",
    specs: [
      "Purified Water (PW) and WFI system design",
      "Clean steam generation and distribution",
      "Containment systems for potent APIs (OEL down to 1µg/m³)",
      "Process flow diagram (PFD) and P&ID development",
      "Validation Master Plan (VMP) and DQ/IQ/OQ/PQ protocols",
      "Change control and SOP development",
    ],
    standards: ["WHO TRS 961", "US-FDA 21 CFR Part 210/211", "EU-GMP Vol. 4", "ICH Q9/Q10"],
    image: "/images/projects/project-5.png",
    keyApplications: [
      "API block design",
      "Clean utility systems",
      "Validation protocols",
    ],
  },
  {
    id: "chemical",
    slug: "chemical-plant-engineering",
    icon: "Atom",
    title: "Chemical Plant Engineering",
    shortDesc:
      "Process design, equipment selection, and plant layout for chemical manufacturing with emphasis on safety and efficiency.",
    fullDesc:
      "Our chemical plant engineering team delivers HAZOP-reviewed process designs, equipment datasheets, and full mechanical completion packages for fine chemical, API, and specialty chemical facilities.",
    specs: [
      "Process simulation (HYSYS/CHEMCAD)",
      "HAZOP and LOPA facilitation",
      "Pressure vessel and heat exchanger design",
      "Piping stress analysis",
      "Relief valve sizing and flare design",
      "Safety instrumented system (SIS) design",
    ],
    standards: ["ASME B31.3", "API 510/570", "OSHA PSM", "IS 2825"],
    image: "/images/chiller.jpg",
    keyApplications: [
      "Process simulation",
      "Safety systems",
      "Equipment engineering",
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "aurangabad-api",
    slug: "aurangabad-api-block",
    title: "API Manufacturing Block — Aurangabad",
    client: "Confidential Pharma Client",
    location: "Aurangabad, Maharashtra",
    year: "2023",
    category: "Pharmaceutical",
    tags: ["API", "HVAC", "Cleanroom", "GMP"],
    description:
      "Complete HVAC and cleanroom design for a 15,000 sq ft API manufacturing block. Delivered ISO 7 and ISO 8 cleanrooms with dedicated AHUs, differential pressure cascade from +20 Pa to -20 Pa, and full BMS integration with audit trail.",
    challenge:
      "The existing facility had a legacy system with no BMS, leading to uncontrolled temperature excursions that risked batch failures during summer months.",
    solution:
      "We implemented a redundant AHU system with DX-coil backup, Schneider EcoStruxure BMS with 21 CFR Part 11 audit trail, and re-piped the entire chilled water loop to eliminate single points of failure.",
    results: ["Zero temperature excursion events in 18 months post-commissioning", "40% energy savings via VFD on AHU fans", "Passed US-FDA inspection without observations"],
    image: "/images/projects/project-1.png",
    gallery: [
      "/images/projects/picture-1.jpg",
      "/images/projects/picture-2.jpg",
    ],
    faq: [
      {
        question: "What cleanroom classification was achieved?",
        answer: "The facility achieved ISO 7 (Grade C) in manufacturing areas and ISO 8 (Grade D) in corridors, validated per ISO 14644-1 using HEPA H14 filters.",
      },
      {
        question: "How long did the project take?",
        answer: "From design freeze to qualified handover: 9 months, including a 3-month validation and qualification phase.",
      },
    ],
  },
  {
    id: "hyderabad-bsl3",
    slug: "hyderabad-bsl3-laboratory",
    title: "BSL-3 Containment Laboratory — Hyderabad",
    client: "National Research Institute",
    location: "Hyderabad, Telangana",
    year: "2023",
    category: "BSL-3",
    tags: ["BSL-3", "Containment", "HVAC", "BMS"],
    description:
      "Design and installation of a BSL-3 containment HVAC system with 100% single-pass air, negative pressure cascade, and HEPA-filtered exhaust for a national biomedical research laboratory.",
    challenge:
      "Strict containment requirements mandated negative pressure at all times, even during power failure — requiring a fail-safe design with redundant exhaust fans and emergency power.",
    solution:
      "Installed dual-exhaust fan system with automatic standby switchover (<15 seconds), UPS-backed controls, and a Siemens Desigo BMS with real-time pressure alarms to the facility manager's mobile device.",
    results: [
      "NIH design criteria fully met",
      "Passed CDC/USDA inspection with zero critical findings",
      "Validated negative pressure maintained during 3 simulated power outages",
    ],
    image: "/images/projects/project-2.png",
    gallery: [
      "/images/projects/picture-3.jpg",
    ],
    faq: [
      {
        question: "What negative pressure levels were maintained?",
        answer: "The core BSL-3 lab maintained -12.5 Pa relative to the anteroom, and -25 Pa relative to the corridor, per NIH/CDC guidelines.",
      },
    ],
  },
  {
    id: "vadodara-solar",
    slug: "vadodara-solar-panel-facility",
    title: "Solar Panel Manufacturing Cleanroom — Vadodara",
    client: "Confidential Solar OEM",
    location: "Vadodara, Gujarat",
    year: "2022",
    category: "Solar",
    tags: ["Solar", "Cleanroom", "ESD", "HVAC"],
    description:
      "Turnkey ISO 6 cleanroom for thin-film solar cell deposition, featuring ESD-protected flooring, ultra-low humidity control (RH <30%), and vibration-isolated equipment pads.",
    challenge:
      "Solar cell deposition processes are highly sensitive to humidity and particulate contamination. Any excursion above 35% RH caused yield loss of >15%.",
    solution:
      "Designed a desiccant dehumidification system integrated with chilled water AHUs, achieving RH <25% year-round. Installed ISO 6 cleanroom with ESD epoxy flooring and grounded work surfaces.",
    results: [
      "Yield improved from 74% to 91% post-handover",
      "RH maintained at 22–28% in all seasons",
      "ISO 6 cleanroom qualified first attempt",
    ],
    image: "/images/projects/project-3.png",
    gallery: [],
    faq: [
      {
        question: "How was ultra-low humidity achieved in Gujarat's summer?",
        answer: "We used a two-stage desiccant rotor system (Munters/Seibu Giken) with a pre-cool coil, achieving outlet conditions of 22°C / 20% RH even when outdoor air was 42°C / 70% RH.",
      },
    ],
  },
  {
    id: "faridabad-hospital",
    slug: "faridabad-hospital-hvac",
    title: "500-Bed Hospital HVAC — Faridabad",
    client: "Multi-Specialty Hospital Group",
    location: "Faridabad, Haryana",
    year: "2022",
    category: "Healthcare",
    tags: ["Hospital", "HVAC", "OT", "CSSD"],
    description:
      "Complete HVAC for a 500-bed multi-specialty hospital including 8 operating theatres (OT), ICU, CSSD, pharmacy, and general wards. Designed to NABH and ASHRAE 170 standards.",
    challenge:
      "The OT complex required positive pressure with laminar airflow while the isolation ICU required negative pressure — both served by the same riser duct shaft, creating a complex zone pressure management challenge.",
    solution:
      "Designed separate AHU systems for positive-pressure and negative-pressure zones with motorised dampers and a hospital-grade BMS managing pressure relationships dynamically based on door status sensors.",
    results: [
      "NABH accreditation achieved without HVAC-related observations",
      "OT infection rate <0.5% (national benchmark: 2.1%)",
      "ASHRAE 170 compliant ACH rates in all zones",
    ],
    image: "/images/projects/project-4.png",
    gallery: [],
    faq: [
      {
        question: "What air change rates were delivered in operating theatres?",
        answer: "25 ACH total with minimum 20% outside air, per ASHRAE 170-2021 Table 7.1 for Class B operating rooms.",
      },
    ],
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────
export const team = [
  {
    name: "Rahul Sharma",
    role: "Managing Director",
    bio: "15+ years in HVAC and cleanroom engineering across pharma, healthcare, and industrial sectors. ISHRAE Certified HVAC Engineer.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    linkedin: "#",
  },
  {
    name: "Priya Mehta",
    role: "Head of Design & BIM",
    bio: "Autodesk Revit Certified Professional with expertise in MEP coordination and ISO 19650-compliant BIM delivery.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    linkedin: "#",
  },
  {
    name: "Amit Kulkarni",
    role: "Lead Validation Engineer",
    bio: "Specialist in DQ/IQ/OQ/PQ validation protocols for WHO-GMP and US-FDA regulated facilities. 10+ successful FDA inspections.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    linkedin: "#",
  },
];

// ─── Clients / Trust bar (with logo images) ────────────────────────────────────
export const clients = [
  "AIIMS", "AMMRO DAIRY", "IOL CHEMICAL", "NIPER", "SUPRA COSMO TECH",
  "GLOBELA PHARMA", "LIVGUARD", "SHAH BROTHERS", "KCPL", "HERSHEY",
  "HANUCHEM", "VIP",
];

export const clientLogos = [
  { name: "AMIS", logo: "/images/clients/amis.png" },
  { name: "AMMRO DAIRY", logo: "/images/clients/ammro-dairy.png" },
  { name: "HERSHEY", logo: "/images/clients/hershey-logo.png" },
  { name: "KCPL", logo: "/images/clients/kcpl.png" },
  { name: "LIVGUARD", logo: "/images/clients/livguard.png" },
  { name: "SHAH BROTHERS", logo: "/images/clients/shah-brothers.png" },
  { name: "SUPRIMA", logo: "/images/clients/suprima.png" },
  { name: "VIP PHARMA", logo: "/images/clients/vip-pharma.png" },
];

// ─── Blog posts ───────────────────────────────────────────────────────────────
export const blogPosts = [
  {
    id: "iso-14644-guide",
    slug: "understanding-iso-14644-cleanroom-standards",
    title: "Understanding ISO 14644 Cleanroom Standards: A Complete Guide",
    excerpt:
      "ISO 14644 is the global benchmark for cleanroom classification and monitoring. This guide breaks down every clause you need to know before designing or qualifying your facility.",
    date: "2024-01-15",
    author: "Rahul Sharma",
    category: "Cleanroom",
    readTime: "8 min read",
    image: "/images/projects/project-3.png",
    content: `ISO 14644 is a multi-part standard that defines cleanroom classification, monitoring, and design requirements. Understanding its structure is essential for any pharmaceutical or semiconductor facility engineer.\n\n## Part 1: Classification\n\nISO 14644-1 defines cleanliness classes based on airborne particle counts per cubic metre. The most common classes used in pharma are ISO 5 (Grade A/B) and ISO 7/8 (Grade C/D).\n\n## Part 2: Monitoring\n\nISO 14644-2 establishes monitoring intervals and methods to maintain classification between full re-qualifications. It specifies the number of sample locations based on room area.\n\n## Design Implications\n\nEvery HVAC system serving a cleanroom must be designed with the ISO class target in mind from day one. Filter efficiency, air change rates, pressurisation strategy, and garment protocols all flow from the classification requirement.`,
    faq: [
      {
        question: "What is the difference between ISO 5 and Grade A/B?",
        answer: "ISO 14644-1 Class 5 corresponds broadly to EU GMP Grade A and Grade B (at-rest). Grade A and B are regulatory classifications under EU GMP Annex 1, while ISO classes are based purely on particle counts per cubic metre.",
      },
      {
        question: "How often must cleanrooms be re-qualified under ISO 14644?",
        answer: "ISO 14644-2 recommends re-qualification at least every 12 months for ISO Classes 5–8 in typical pharmaceutical applications, though GMP regulations may require more frequent monitoring based on risk assessment.",
      },
      {
        question: "Who performs the classification testing?",
        answer: "Classification testing should be performed by a third-party accredited laboratory (NABL/UKAS accredited) or a competent in-house team using calibrated, certified particle counters.",
      },
    ],
  },
  {
    id: "bim-cleanroom",
    slug: "benefits-of-bim-in-cleanroom-design",
    title: "Benefits of BIM in Cleanroom Design: Reducing Cost and Risk",
    excerpt:
      "Building Information Modelling (BIM) has transformed cleanroom and pharmaceutical facility design. Here's how LOD 300+ models prevent costly on-site surprises.",
    date: "2024-02-20",
    author: "Priya Mehta",
    category: "BIM",
    readTime: "6 min read",
    image: "/images/projects/project-4.png",
    content: `BIM adoption in cleanroom projects has proven to reduce construction rework by up to 40% and cut project delivery timelines by 15–20%. Here's why every pharma facility owner should demand BIM from their engineering partner.\n\n## Clash Detection Saves Lakhs\n\nIn a typical cleanroom project, HVAC ductwork, piping, electrical cable trays, and structure all compete for the same ceiling plenum space. Without BIM, these clashes are discovered during site work — at enormous cost. With Navisworks clash detection, conflicts are resolved on screen before a single hammer swings.\n\n## As-Built Models for FM\n\nA LOD 500 as-built BIM model handed over at project close gives your facility management team a digital twin of your plant. Every valve, damper, and filter has a location, specification, and maintenance schedule embedded in the model.`,
    faq: [
      {
        question: "What LOD (Level of Development) is required for cleanroom projects?",
        answer: "For detailed design and clash detection, LOD 300 is the minimum. For construction and handover, LOD 400 (fabrication-ready) is recommended. For facility management digital twins, LOD 500 (as-built) should be specified.",
      },
      {
        question: "Does BIM add significant cost to my project?",
        answer: "BIM modelling typically adds 2–4% to engineering fees but saves 8–15% of total project cost through reduced rework, fewer RFIs, and faster construction. The ROI is consistently positive on projects over ₹2 Crore.",
      },
    ],
  },
];

// ─── Company Info ─────────────────────────────────────────────────────────────
export const companyInfo = {
  name: "Thermopharm Pvt. Ltd.",
  tagline: "An engineering company for tomorrow",
  description:
    "Mumbai-based HVAC and cleanroom engineering specialist delivering end-to-end facility solutions for pharmaceutical, healthcare, and industrial sectors since 2018.",
  phone: "+91 63 9663 3736",
  email: "info@thermopharm.in",
  address: "Office No 319, Infinity Square Building, Chinchpada, Vasai East, Mumbai — 401208",
  certifications: ["ISHRAE Member", "ASHRAE Member", "GMP Certified"],
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "250+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "0", label: "Audit Failures" },
  ],
  socialLinks: {
    linkedin: "https://linkedin.com",
    email: "mailto:info@thermopharm.in",
  },
};

// ─── Navigation ───────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Blog", href: "/blog" },
];

// ─── Homepage FAQ ──────────────────────────────────────────────────────────────
export const homepageFaq = [
  {
    question: "What industries does Thermopharm serve?",
    answer:
      "We serve pharmaceutical manufacturing (API, formulation, sterile fill-finish), biotech, hospitals and healthcare, chemical plants, food processing, semiconductor fabrication, and solar panel manufacturing.",
  },
  {
    question: "Are your cleanrooms WHO-GMP and US-FDA compliant?",
    answer:
      "Yes. All cleanroom and HVAC systems we design are compliant with WHO TRS 961, US-FDA 21 CFR Part 210/211, EU-GMP Annex 1, and ISO 14644. Our validation engineers prepare complete DQ/IQ/OQ/PQ documentation packages.",
  },
  {
    question: "Do you offer turnkey project execution?",
    answer:
      "Yes. We offer end-to-end services from initial concept design, detailed engineering, procurement, supply, installation, commissioning, qualification, and ongoing AMC support — all under one contract.",
  },
  {
    question: "What is your project turnaround time?",
    answer:
      "Typical HVAC-only projects take 3–6 months from design to commissioning. Turnkey cleanroom projects typically take 8–12 months depending on scope. We provide detailed project schedules at the proposal stage.",
  },
  {
    question: "Where are you based and which geographies do you serve?",
    answer:
      "Our head office is in Vasai East, Mumbai. We have executed projects across Maharashtra, Gujarat, Telangana, Haryana, and Rajasthan, and we have a growing presence in East Africa.",
  },
];
