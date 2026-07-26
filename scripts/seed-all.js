const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const initialServices = [
  {
    slug: "hvac-systems",
    title: "HVAC Systems",
    icon: "Wind",
    shortDesc: "End-to-end HVAC design, installation, and commissioning for pharmaceutical plants, hospitals, and industrial facilities — built for regulatory compliance and lifetime reliability.",
    fullDesc: "Our HVAC solutions are designed by ISHRAE and ASHRAE-certified engineers who understand the critical importance of air quality in pharmaceutical and healthcare environments. We deliver systems that meet WHO-GMP, US-FDA, and EU-GMP standards.",
    image: "/images/projects/project-2.png",
    specs: JSON.stringify(["Dew point control down to -40°C", "HEPA H14 filtration (≥99.995% efficiency)", "Laminar and turbulent airflow design", "AHU selection and duct design per ASHRAE 62.1", "Energy-optimized VRF/VRV systems", "BMS integration and SCADA monitoring"]),
    standards: JSON.stringify(["ISO 14644", "WHO-GMP", "US-FDA 21 CFR Part 11", "ASHRAE 62.1"]),
    faq: JSON.stringify([
      { question: "What filtration levels do you provide?", answer: "We install multi-stage filtration from G4 pre-filters to F9 secondary filters and HEPA H14 final filters achieving 99.995% efficiency down to 0.3 microns." },
      { question: "Can you handle explosive environments?", answer: "Yes, we specify Flameproof (ATEX/IECEx certified) electrical motors, non-sparking fan impellers, and explosion-vented ductwork for chemical plants." }
    ]),
    industriesServed: JSON.stringify(["Pharmaceuticals", "Biotechnology", "Healthcare & Hospitals"]),
    serviceLocations: "Mumbai, Vadodara, Hyderabad, Ambala, Baddi, Pan-India",
    relatedServices: JSON.stringify(["cleanroom-solutions", "bms-electrical"]),
    metaTitle: "Turnkey Industrial HVAC Systems | Thermopharm Engineering",
    metaDesc: "GMP-compliant industrial HVAC design, HEPA filtration & dew point control across India.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "cleanroom-solutions",
    title: "Cleanroom Solutions",
    icon: "Shield",
    shortDesc: "Turnkey cleanroom design, construction, and validation for pharmaceutical manufacturing and sterile fill-finish — zero audit failures, guaranteed.",
    fullDesc: "We design, construct, and validate cleanrooms to ISO 14644 classifications (ISO 5 to ISO 8), delivering fully compliant environments for pharmaceutical API synthesis, sterile fill-finish, medical device manufacturing, and semiconductor fabrication.",
    image: "/images/projects/project-3.png",
    specs: JSON.stringify(["ISO 5 to ISO 8 classification", "Modular and stick-built construction", "PVC, GRP, and powder-coated steel panels", "Positive and negative pressure cascades", "Air shower and pass-box integration", "Particle count validation per ISO 14644-1"]),
    standards: JSON.stringify(["ISO 14644-1/2", "EU-GMP Annex 1", "NADCA standards", "cGMP"]),
    faq: JSON.stringify([
      { question: "Do you supply DQ/IQ/OQ/PQ validation documentation?", answer: "Yes, our validation team provides a complete cGMP-compliant qualification protocol package ready for regulatory inspection." }
    ]),
    industriesServed: JSON.stringify(["Pharmaceuticals", "Biotechnology", "Medical Devices"]),
    serviceLocations: "Pan-India & International Projects",
    relatedServices: JSON.stringify(["hvac-systems", "bim-modelling"]),
    metaTitle: "ISO Cleanroom Design & Validation | Thermopharm Engineering",
    metaDesc: "Turnkey ISO 5 - ISO 8 modular cleanroom construction for pharma & sterile manufacturing.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "bim-modelling",
    title: "BIM Modelling",
    icon: "Layers",
    shortDesc: "Advanced 3D Building Information Modelling for clash detection, MEP coordination, and facility lifecycle management.",
    fullDesc: "Our in-house BIM team uses Autodesk Revit and Navisworks to create high-detail LOD 400 models for complex MEP and cleanroom installations, eliminating on-site spatial conflicts before fabrication begins.",
    image: "/images/projects/project-4.png",
    specs: JSON.stringify(["LOD 300 to LOD 500 modelling", "3D MEP clash detection & resolution", "As-built digital twin generation", "Constructability analysis", "4D scheduling & 5D cost estimating"]),
    standards: JSON.stringify(["ISO 19650", "PAS 1192", "USIBD standards"]),
    faq: JSON.stringify([
      { question: "What level of detail do you model?", answer: "We model up to LOD 400 with fabrication-ready MEP ducting, piping spools, and structural supports." }
    ]),
    industriesServed: JSON.stringify(["Pharmaceuticals", "Heavy Industrial", "Healthcare"]),
    serviceLocations: "Global Remote & On-Site",
    relatedServices: JSON.stringify(["hvac-systems", "cleanroom-solutions"]),
    metaTitle: "3D BIM MEP Clash Detection & LOD 400 | Thermopharm Engineering",
    metaDesc: "Autodesk Revit 3D BIM MEP clash detection for pharmaceutical cleanrooms & factories.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "bms-electrical",
    title: "BMS & Electrical",
    icon: "Zap",
    shortDesc: "Integrated Building Management Systems and complete electrical engineering from concept to commissioning.",
    fullDesc: "We design and commission BMS platforms (Schneider EcoStruxure, Siemens Desigo, Honeywell) that give you real-time control of HVAC, lighting, access control, and energy metering from a single pane of glass.",
    image: "/images/bms.jpg",
    specs: JSON.stringify(["SCADA and HMI panel design", "21 CFR Part 11 audit trail compliance", "BACnet/Modbus/LON integration", "UPS, DG, and LT panel engineering", "Energy metering and sub-metering", "Alarm management and trending"]),
    standards: JSON.stringify(["IEC 60364", "IS 732", "21 CFR Part 11", "ASHRAE 135"]),
    faq: JSON.stringify([
      { question: "Is your BMS compliant with FDA 21 CFR Part 11?", answer: "Yes, our systems include encrypted audit trails, multi-level electronic signatures, and password aging policies." }
    ]),
    industriesServed: JSON.stringify(["Pharmaceuticals", "Healthcare", "Data Centers"]),
    serviceLocations: "Pan-India",
    relatedServices: JSON.stringify(["hvac-systems", "cleanroom-solutions"]),
    metaTitle: "21 CFR Part 11 BMS & Electrical Automation | Thermopharm",
    metaDesc: "Centralized BMS & SCADA environmental automation for cleanrooms & critical spaces.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "pharmaceutical-engineering",
    title: "Pharmaceutical Engineering",
    icon: "FlaskConical",
    shortDesc: "Complete pharma facility engineering — from API block design to sterile zone validation — meeting WHO, US-FDA, and EU-GMP standards.",
    fullDesc: "We act as a single point of responsibility for complete pharmaceutical facility projects, including process equipment layout, clean utility systems (WFI, PW, clean steam), and regulatory documentation packages.",
    image: "/images/projects/project-5.png",
    specs: JSON.stringify(["Purified Water (PW) and WFI system design", "Clean steam generation and distribution", "Containment systems for potent APIs (OEL down to 1µg/m³)", "Process flow diagram (PFD) and P&ID development", "Validation Master Plan (VMP) and DQ/IQ/OQ/PQ protocols"]),
    standards: JSON.stringify(["WHO TRS 961", "US-FDA 21 CFR Part 210/211", "EU-GMP Vol. 4", "ICH Q9/Q10"]),
    faq: JSON.stringify([
      { question: "What regulatory bodies do you design for?", answer: "We design facilities compliant with WHO-GMP, US-FDA, EU-GMP, PIC/S, and UK-MHRA requirements." }
    ]),
    industriesServed: JSON.stringify(["Pharmaceuticals", "Biotechnology"]),
    serviceLocations: "Pan-India & International",
    relatedServices: JSON.stringify(["cleanroom-solutions", "hvac-systems"]),
    metaTitle: "Pharmaceutical Facility Engineering & Validation | Thermopharm",
    metaDesc: "Turnkey API block design, clean utilities & cGMP validation for pharmaceutical plants.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "chemical-plant-engineering",
    title: "Chemical Plant Engineering",
    icon: "Atom",
    shortDesc: "Process design, equipment selection, and plant layout for chemical manufacturing with emphasis on safety and efficiency.",
    fullDesc: "Our chemical plant engineering team delivers HAZOP-reviewed process designs, equipment datasheets, and full mechanical completion packages for fine chemical, API, and specialty chemical facilities.",
    image: "/images/chiller.jpg",
    specs: JSON.stringify(["Process simulation (HYSYS/CHEMCAD)", "HAZOP and LOPA facilitation", "Pressure vessel and heat exchanger design", "Piping stress analysis", "Relief valve sizing and flare design"]),
    standards: JSON.stringify(["ASME B31.3", "API 510/570", "OSHA PSM", "IS 2825"]),
    faq: JSON.stringify([
      { question: "Do you handle explosive zone classification?", answer: "Yes, we perform hazardous area classification per IS 5572 and IEC 60079." }
    ]),
    industriesServed: JSON.stringify(["Chemical & Process Plants"]),
    serviceLocations: "Gujarat, Maharashtra, Pan-India",
    relatedServices: JSON.stringify(["hvac-systems", "bim-modelling"]),
    metaTitle: "Chemical Plant Process Engineering & HAZOP | Thermopharm",
    metaDesc: "HAZOP-reviewed chemical process engineering, piping stress analysis & plant layout.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  }
];

const initialIndustries = [
  {
    slug: "pharmaceutical-biotech",
    title: "Pharmaceutical & Biotech",
    icon: "FlaskConical",
    shortDesc: "GMP-certified HVAC, cleanrooms, and sterile containment facilities for API synthesis and formulation plants.",
    fullDesc: "Thermopharm delivers WHO-GMP, US-FDA, and EU-GMP compliant cleanrooms, HVAC systems, and clean utility piping for pharmaceutical API blocks, sterile fill-finish suites, and biotechnology research centers.",
    image: "/images/projects/project-1.png",
    specs: JSON.stringify(["ISO 5 to ISO 8 Cleanroom", "Dew point control down to -40°C", "HEPA H14 Filtration", "21 CFR Part 11 Audit Trail"]),
    standards: JSON.stringify(["WHO TRS 961", "US-FDA 21 CFR Part 210/211", "EU-GMP Annex 1", "ISO 14644"]),
  },
  {
    slug: "healthcare-hospitals",
    title: "Healthcare & Hospitals",
    icon: "Activity",
    shortDesc: "NABH and ASHRAE 170 compliant HVAC for operating theatres, isolation ICUs, and CSSD departments.",
    fullDesc: "We engineer precise pressure-cascaded HVAC networks for super-specialty hospitals, maintaining positive pressure in operating rooms and negative pressure in infectious disease isolation wards.",
    image: "/images/projects/project-4.png",
    specs: JSON.stringify(["Modular OT HVAC", "Negative Pressure Isolation Wards", "Laminar Airflow Workstations", "NABH Accreditation Support"]),
    standards: JSON.stringify(["ASHRAE 170-2021", "NABH Guidelines", "CDC Isolation Standards"]),
  },
  {
    slug: "solar-electronics",
    title: "Solar & Electronics Cleanrooms",
    icon: "Cpu",
    shortDesc: "Ultra-low humidity (<25% RH) and ESD-protected cleanrooms for semiconductor wafer and solar panel production.",
    fullDesc: "Precision environmental control systems tailored for semiconductor assembly, PCB micro-electronics, and thin-film solar cell deposition lines with desiccant dehumidification.",
    image: "/images/projects/project-3.png",
    specs: JSON.stringify(["Ultra-Low Humidity (<25% RH)", "ESD Epoxy Flooring", "ISO 6 Cleanroom", "Vibration-Isolated Equipment Pads"]),
    standards: JSON.stringify(["ISO 14644-1", "ESD STM11.11", "ASHRAE TC 9.9"]),
  },
  {
    slug: "chemical-process-plants",
    title: "Chemical & Process Plants",
    icon: "Atom",
    shortDesc: "HAZOP-reviewed ventilation, hazardous gas extraction, and process chiller plants for chemical manufacturing.",
    fullDesc: "Heavy-duty chemical plant ventilation systems built for corrosive air handling, explosive zone electrical isolation, and process heat extraction.",
    image: "/images/chiller.jpg",
    specs: JSON.stringify(["Flameproof AHU & Fan Assembly", "Scrubber Systems", "Heavy Duty Process Chillers", "HAZOP Safety Review"]),
    standards: JSON.stringify(["ASME B31.3", "API 510/570", "OSHA PSM", "IS 2825"]),
  },
  {
    slug: "food-dairy-processing",
    title: "Food & Dairy Processing",
    icon: "Utensils",
    shortDesc: "HACCP-compliant hygiene ventilation and cold storage temperature management for dairy and food manufacturing.",
    fullDesc: "Specialized sanitary airflow design for milk powder processing, cheese rooms, confectionery packaging, and cold chain refrigeration.",
    image: "/images/projects/project-5.png",
    specs: JSON.stringify(["HACCP Air Quality Control", "Positive Pressure Packaging", "Condensation Prevention", "Cleanable Ductwork"]),
    standards: JSON.stringify(["FSSAI Guidelines", "HACCP Principles", "ISO 22000"]),
  },
];

const initialProjects = [
  {
    slug: "cipla-pune",
    title: "Cipla Biotech Sterile Fill-Finish Cleanroom",
    location: "Pune, Maharashtra",
    year: "2024",
    client: "Cipla Biotech",
    category: "Cleanrooms",
    image: "/images/projects/project-1.png",
    imageAlt: "Cipla Biotech sterile cleanroom installation",
    gallery: JSON.stringify([{ url: "/images/projects/picture-1.jpg", alt: "Sterile filling suite" }]),
    description: "Turnkey ISO 5 modular cleanroom execution with integrated HEPA H14 ceiling grid and positive pressure cascades for sterile injectable production.",
    challenge: "Maintaining strict ISO 5 particle counts with continuous 24/7 HVAC operation while minimizing energy consumption.",
    solution: "Installed variable-speed EC fan filter units paired with desiccant dehumidifiers and automated BMS pressure control.",
    results: JSON.stringify(["Zero particle exceedances during validation", "22% energy reduction compared to conventional AHUs", "Passed US-FDA audit first time"]),
    tags: JSON.stringify(["ISO 5", "Sterile Fill-Finish", "BMS Integration"]),
    faq: JSON.stringify([{ question: "What was the validation timeline?", answer: "Complete DQ to PQ validation was finished within 21 days." }]),
    facilitySize: "32,000 sq. ft.",
    industrySector: "Vaccines & Injectables",
    complianceStandards: JSON.stringify(["ISO 14644 Class 5", "US-FDA 21 CFR Part 11", "EU-GMP Grade A"]),
    technologiesUsed: JSON.stringify(["3D BIM Modeling", "HEPA H14", "EC Fan Filter Units"]),
    testimonialQuote: "Thermopharm delivered our ISO Class 5 sterile suite 2 weeks ahead of schedule with 100% audit pass rate.",
    testimonialAuthor: "Dr. Rajesh Sharma - VP Operations, Cipla Biotech",
    relatedServices: JSON.stringify(["Cleanroom Solutions", "BMS & Electrical"]),
    metaTitle: "Cipla Sterile Cleanroom Case Study | Thermopharm",
    metaDesc: "Turnkey ISO 5 cleanroom construction for Cipla Biotech with 100% US-FDA compliance.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "iol-chemical",
    title: "IOL Chemical API & Process Plant HVAC",
    location: "Ambala, Punjab",
    year: "2023",
    client: "IOL Chemicals and Pharmaceuticals Ltd.",
    category: "Pharmaceutical",
    image: "/images/projects/project-3.png",
    imageAlt: "IOL Chemical API process plant ventilation",
    gallery: JSON.stringify([]),
    description: "Complete API block environmental control, hazardous fume exhaust, and clean utility design for large scale manufacturing.",
    challenge: "Handling corrosive solvent fumes and dust extraction in high-potency chemical blocks.",
    solution: "Flameproof SS 316 exhaust fans, wet scrubbers, and 21 CFR Part 11 compliant SCADA BMS.",
    results: JSON.stringify(["Zero solvent exposure levels", "Passed international cGMP quality audits"]),
    tags: JSON.stringify(["API", "Chemical", "HVAC", "USFDA"]),
    faq: JSON.stringify([{ question: "How were corrosive fumes handled?", answer: "Using Flameproof SS 316 exhaust fans and wet scrubbers." }]),
    facilitySize: "50,000 sq. ft.",
    industrySector: "API Manufacturing",
    complianceStandards: JSON.stringify(["US-FDA cGMP", "WHO-GMP"]),
    technologiesUsed: JSON.stringify(["Flameproof SS 316", "Wet Scrubbers", "21 CFR Part 11 BMS"]),
    metaTitle: "IOL Chemical API Plant HVAC | Thermopharm Engineering",
    metaDesc: "Hazardous solvent exhaust & API clean utility engineering for IOL Chemical Punjab.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "niper-hyderabad",
    title: "NIPER Biomedical Research Cleanroom",
    location: "Hyderabad, Telangana",
    year: "2023",
    client: "National Institute of Pharmaceutical Education & Research",
    category: "BSL-3",
    image: "/images/projects/project-4.png",
    imageAlt: "NIPER BSL-3 laboratory cleanroom",
    gallery: JSON.stringify([]),
    description: "ISO 5 containment laboratory with 100% fresh air single pass HVAC and double-HEPA exhaust filtration.",
    challenge: "Extreme negative pressure requirements with fail-safe automatic fan switchover.",
    solution: "Installed dual redundant centrifugal exhaust fans with UPS battery backup and instant alarms.",
    results: JSON.stringify(["Certified for national biomedical research", "Passed CDC containment guidelines"]),
    tags: JSON.stringify(["R&D", "BSL-3", "Biomedical", "Containment"]),
    faq: JSON.stringify([{ question: "What safety level was achieved?", answer: "BSL-3 negative pressure containment certified under CDC guidelines." }]),
    facilitySize: "18,000 sq. ft.",
    industrySector: "Biomedical R&D",
    complianceStandards: JSON.stringify(["BSL-3 Guidelines", "ISO 14644-1"]),
    technologiesUsed: JSON.stringify(["Double-HEPA Exhaust", "Fail-safe Centrifugal Fans"]),
    metaTitle: "NIPER BSL-3 Cleanroom Engineering | Thermopharm",
    metaDesc: "Negative pressure BSL-3 containment cleanroom design for NIPER Hyderabad.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "niper-kolkata",
    title: "NIPER Advanced R&D Clean Lab",
    location: "Kolkata, West Bengal",
    year: "2023",
    client: "National Institute of Pharmaceutical Education & Research",
    category: "BSL-3",
    image: "/images/projects/project-5.png",
    imageAlt: "NIPER Kolkata clean lab facility",
    gallery: JSON.stringify([]),
    description: "Modular cleanroom facility for drug delivery development and nanotechnology research.",
    challenge: "Vibration sensitive laser optical table positioning requiring zero micro-vibrations from AHUs.",
    solution: "Spring isolated AHU pads and remote duct attenuators with precision temperature control (±0.5°C).",
    results: JSON.stringify(["Sub-micron optical alignment preserved", "ISO 6 cleanroom certification"]),
    tags: JSON.stringify(["R&D", "Pharma", "Cleanroom", "ISO 6"]),
    faq: JSON.stringify([{ question: "How were vibrations suppressed?", answer: "Using spring isolated AHU pads and remote acoustic duct attenuators." }]),
    facilitySize: "12,000 sq. ft.",
    industrySector: "Nanotechnology R&D",
    complianceStandards: JSON.stringify(["ISO 14644-1 Class 6"]),
    technologiesUsed: JSON.stringify(["Spring Isolation", "Duct Attenuators"]),
    metaTitle: "NIPER Kolkata Clean Lab | Thermopharm Engineering",
    metaDesc: "Zero-vibration ISO 6 cleanroom engineering for NIPER Kolkata R&D.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "suprima-cosmo-tech",
    title: "Suprima Cosmo Tech Precision Cleanroom",
    location: "Ambernath, Mumbai",
    year: "2023",
    client: "Suprima Cosmo Tech",
    category: "Industrial",
    image: "/images/projects/project-1.png",
    imageAlt: "Suprima Cosmo Tech cleanroom facility",
    gallery: JSON.stringify([]),
    description: "Turnkey ESD cleanroom for precision electronic packaging and high-tech cosmeceutical formulations.",
    challenge: "Static charge buildup and particulate control in high-speed filling lines.",
    solution: "ESD anti-static epoxy flooring, ionized air curtain pass boxes, and ISO 7 HEPA modules.",
    results: JSON.stringify(["Static discharge risk eliminated", "Product yield increased by 22%"]),
    tags: JSON.stringify(["Industrial", "Cleanroom", "ESD", "HVAC"]),
    faq: JSON.stringify([{ question: "How was static electricity eliminated?", answer: "Via ESD anti-static epoxy flooring and ionized air curtain pass boxes." }]),
    facilitySize: "22,000 sq. ft.",
    industrySector: "Cosmeceuticals & Electronics",
    complianceStandards: JSON.stringify(["ISO 14644-1 Class 7", "ESD STM11.11"]),
    technologiesUsed: JSON.stringify(["ESD Epoxy Flooring", "Ionized Air Curtains"]),
    metaTitle: "Suprima Cosmo Tech Cleanroom | Thermopharm",
    metaDesc: "ESD anti-static ISO 7 cleanroom construction in Ambernath, Mumbai.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "globela-pharma",
    title: "Globela Pharma Sterile Export Suite",
    location: "Surat, Gujarat",
    year: "2023",
    client: "Globela Pharma Pvt. Ltd.",
    category: "Pharmaceutical",
    image: "/images/projects/project-2.png",
    imageAlt: "Globela Pharma sterile export suite",
    gallery: JSON.stringify([]),
    description: "Turnkey formulation cleanrooms meeting EU-GMP Annex 1 guidelines for sterile injectable export.",
    challenge: "Strict RH control (<40%) in Surat's coastal monsoon climate.",
    solution: "Desiccant dehumidification wheel integrated with 10,000 CFM chilled water AHU.",
    results: JSON.stringify(["EU-GMP audit success", "RH maintained continuously at 35%"]),
    tags: JSON.stringify(["Export GMP", "Sterile Fill", "HVAC", "EU-GMP"]),
    faq: JSON.stringify([{ question: "Was relative humidity maintained during monsoon?", answer: "Yes, continuously at 35% RH using desiccant dehumidification rotors." }]),
    facilitySize: "28,000 sq. ft.",
    industrySector: "Sterile Injectables Export",
    complianceStandards: JSON.stringify(["EU-GMP Annex 1", "WHO-GMP"]),
    technologiesUsed: JSON.stringify(["Desiccant Dehumidification", "Chilled Water AHU"]),
    metaTitle: "Globela Pharma EU-GMP Sterile Cleanroom | Thermopharm",
    metaDesc: "EU-GMP Annex 1 compliant sterile cleanroom suite in Surat, Gujarat.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "livguard-pune",
    title: "Livguard Battery & Energy Storage Cleanroom",
    location: "Pune, Maharashtra",
    year: "2022",
    client: "Livguard Energy Technologies",
    category: "Solar",
    image: "/images/projects/project-3.png",
    imageAlt: "Livguard energy storage cleanroom",
    gallery: JSON.stringify([]),
    description: "Ultra-low humidity dry room (<1% RH) for advanced lithium cell assembly and battery manufacturing.",
    challenge: "Maintaining dew point down to -40°C in continuous operation.",
    solution: "Seibu Giken desiccant wheel dry room system with hermetically sealed wall panels.",
    results: JSON.stringify(["Achieved -45°C dew point", "Zero cell degradation during assembly"]),
    tags: JSON.stringify(["Energy", "ESD", "Ultra-low Humidity", "Cleanroom"]),
    faq: JSON.stringify([{ question: "What dew point was achieved?", answer: "-45°C dew point dry room environment." }]),
    facilitySize: "16,000 sq. ft.",
    industrySector: "Lithium Battery Energy Storage",
    complianceStandards: JSON.stringify(["ISO 14644-1 Class 6", "ESD STM11.11"]),
    technologiesUsed: JSON.stringify(["Seibu Giken Desiccant Wheel", "Hermetic Wall Panels"]),
    metaTitle: "Livguard Battery Ultra-Low Humidity Cleanroom | Thermopharm",
    metaDesc: "-45°C dew point ultra-low humidity dry room construction for Livguard Pune.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "globela-industries",
    title: "Globela Industries Fine Chemical HVAC",
    location: "Bharuch, Gujarat",
    year: "2022",
    client: "Globela Industries",
    category: "Chemical",
    image: "/images/projects/project-4.png",
    imageAlt: "Globela Industries fine chemical HVAC",
    gallery: JSON.stringify([]),
    description: "Process plant ventilation, toxic gas scrubber integration, and explosion-proof electrical design.",
    challenge: "Hazardous Class 1 Div 1 explosive atmosphere requiring ATEX compliance.",
    solution: "ATEX certified explosion-proof motors, spark-proof fan impellers, and stainless ducting.",
    results: JSON.stringify(["Passed safety hazard audit", "100% airborne containment of chemical vapors"]),
    tags: JSON.stringify(["Chemical", "Fume Exhaust", "HVAC", "Safety"]),
    faq: JSON.stringify([{ question: "Was ATEX certification provided?", answer: "Yes, all electrical motors and fan impellers are ATEX explosion-proof certified." }]),
    facilitySize: "35,000 sq. ft.",
    industrySector: "Fine Chemicals",
    complianceStandards: JSON.stringify(["ATEX Class 1 Div 1", "OSHA PSM"]),
    technologiesUsed: JSON.stringify(["ATEX Motors", "Spark-proof Impellers", "SS Ducting"]),
    metaTitle: "Globela Chemical HVAC & Scrubber System | Thermopharm",
    metaDesc: "ATEX explosion-proof ventilation & scrubber engineering for Globela Chemical Bharuch.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "shah-brothers",
    title: "Shah Brothers Logistics & Clean Storage",
    location: "Bhiwandi, Mumbai",
    year: "2022",
    client: "Shah Brothers",
    category: "Industrial",
    image: "/images/projects/project-5.png",
    imageAlt: "Shah Brothers cold chain warehouse",
    gallery: JSON.stringify([]),
    description: "Controlled temperature warehouse (15-25°C) and cold storage rooms (2-8°C) for pharma distribution.",
    challenge: "Large volume warehouse space with high ceiling heat gain during Mumbai summers.",
    solution: "High-throw jet diffusers and VRF chilled water system with IoT temperature mapping.",
    results: JSON.stringify(["Uniform temperature across 40,000 sq ft", "WHO GDP compliance achieved"]),
    tags: JSON.stringify(["Logistics", "Cold Chain", "HVAC", "Warehouse"]),
    faq: JSON.stringify([{ question: "Is the warehouse WHO GDP compliant?", answer: "Yes, fully compliant with continuous IoT temperature mapping." }]),
    facilitySize: "40,000 sq. ft.",
    industrySector: "Pharma Cold Chain & Logistics",
    complianceStandards: JSON.stringify(["WHO GDP", "FSSAI Storage"]),
    technologiesUsed: JSON.stringify(["High-throw Jet Diffusers", "IoT Temperature Mapping"]),
    metaTitle: "Shah Brothers Pharma Cold Storage Warehouse | Thermopharm",
    metaDesc: "WHO GDP compliant controlled temperature warehouse HVAC in Bhiwandi, Mumbai.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "tata-consumer",
    title: "Tata Consumer Products Clean Packaging Unit",
    location: "Hebbal, Bangalore",
    year: "2022",
    client: "Tata Consumer Products Ltd.",
    category: "Food & Beverage",
    image: "/images/projects/project-1.png",
    imageAlt: "Tata Consumer Products packaging unit",
    gallery: JSON.stringify([]),
    description: "Hygienic food packaging cleanroom with positive pressurization and HEPA filtration.",
    challenge: "Preventing micro-particulate contamination during high-speed tea and spice blending.",
    solution: "Positive pressure cascade with stainless steel washable ceiling panels and HEPA filtration.",
    results: JSON.stringify(["FSSAI hygiene audit score 99/100", "Zero dust buildup on automated lines"]),
    tags: JSON.stringify(["Food Grade", "HVAC", "Cleanroom", "FSSAI"]),
    faq: JSON.stringify([{ question: "What hygiene score was achieved?", answer: "99/100 in FSSAI food safety audit." }]),
    facilitySize: "25,000 sq. ft.",
    industrySector: "Food & Beverage Packaging",
    complianceStandards: JSON.stringify(["FSSAI Guidelines", "HACCP Principles", "ISO 22000"]),
    technologiesUsed: JSON.stringify(["SS Washable Panels", "HEPA Air Cascade"]),
    metaTitle: "Tata Consumer Clean Packaging Suite | Thermopharm",
    metaDesc: "FSSAI & HACCP compliant food-grade cleanroom construction for Tata Consumer Bangalore.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "kcpl-turbhe",
    title: "KCPL Specialty Chemical & Cleanroom Facility",
    location: "Turbhe, Mumbai",
    year: "2021",
    client: "KCPL Chemical",
    category: "Chemical",
    image: "/images/projects/project-2.png",
    imageAlt: "KCPL chemical cleanroom facility",
    gallery: JSON.stringify([]),
    description: "Cleanroom and specialized air handling for active ingredient packaging.",
    challenge: "Cross-contamination prevention between multi-product synthesis lines.",
    solution: "Independent AHUs per block with dedicated pass boxes and interlock doors.",
    results: JSON.stringify(["Cross-contamination risk zeroed", "Operational efficiency up 18%"]),
    tags: JSON.stringify(["Chemical", "Cleanroom", "HVAC"]),
    faq: JSON.stringify([{ question: "How was cross-contamination prevented?", answer: "By isolating blocks with dedicated AHUs and interlocked pass boxes." }]),
    facilitySize: "20,000 sq. ft.",
    industrySector: "Specialty Chemicals",
    complianceStandards: JSON.stringify(["ISO 14644-1 Class 8", "cGMP"]),
    technologiesUsed: JSON.stringify(["Independent Block AHUs", "Interlock Pass Boxes"]),
    metaTitle: "KCPL Specialty Chemical Cleanroom | Thermopharm",
    metaDesc: "Turnkey cleanroom & dedicated AHU design for KCPL Chemical Turbhe, Mumbai.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "hershey-bhopal",
    title: "Hershey Confectionery Clean HVAC System",
    location: "Bhopal, Madhya Pradesh",
    year: "2021",
    client: "Hershey India",
    category: "Food & Beverage",
    image: "/images/projects/project-3.png",
    imageAlt: "Hershey confectionery HVAC facility",
    gallery: JSON.stringify([]),
    description: "Process cooling and clean air conditioning for chocolate molding and packaging halls.",
    challenge: "Strict relative humidity control (<45% RH) to prevent sugar bloom on chocolate product lines.",
    solution: "Precision chilled water AHUs with secondary cooling coils and BACnet BMS control.",
    results: JSON.stringify(["Sugar bloom defects eliminated", "24/7 continuous operation without downtime"]),
    tags: JSON.stringify(["Confectionery", "Chilled Water", "HVAC", "ISO 22000"]),
    faq: JSON.stringify([{ question: "Was sugar bloom prevented?", answer: "Yes, 100% eliminated by maintaining continuous <45% RH." }]),
    facilitySize: "30,000 sq. ft.",
    industrySector: "Confectionery Manufacturing",
    complianceStandards: JSON.stringify(["ISO 22000", "HACCP"]),
    technologiesUsed: JSON.stringify(["Precision Chilled Water AHUs", "BACnet BMS"]),
    metaTitle: "Hershey Confectionery Process HVAC | Thermopharm",
    metaDesc: "Sub-45% RH clean air conditioning for Hershey India chocolate packaging facility.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "hanuchem-parwanoo",
    title: "Hanuchem Sterile Formulations Facility",
    location: "Parwanoo, Himachal Pradesh",
    year: "2021",
    client: "Hanuchem Laboratories",
    category: "Pharmaceutical",
    image: "/images/projects/project-4.png",
    imageAlt: "Hanuchem sterile formulations facility",
    gallery: JSON.stringify([]),
    description: "Grade A laminar airflow workstation and Grade B cleanrooms for liquid injectables.",
    challenge: "Extreme winter temperature drops requiring reliable dual heating/cooling coils.",
    solution: "Hot water heating coils combined with DX cooling and automatic winter/summer changeover.",
    results: JSON.stringify(["WHO-GMP audit cleared", "Stable year-round room temperature"]),
    tags: JSON.stringify(["Formulations", "Sterile", "Cleanroom", "WHO-GMP"]),
    faq: JSON.stringify([{ question: "What cleanroom grade was achieved?", answer: "Grade A laminar airflow workstation within Grade B cleanroom." }]),
    facilitySize: "18,000 sq. ft.",
    industrySector: "Liquid Injectables",
    complianceStandards: JSON.stringify(["WHO-GMP", "EU-GMP Grade A/B"]),
    technologiesUsed: JSON.stringify(["Laminar Airflow Workstation", "Dual Heating/DX Coils"]),
    metaTitle: "Hanuchem Sterile Cleanroom Suite | Thermopharm",
    metaDesc: "Grade A/B cleanroom suite & year-round HVAC for Hanuchem Himachal Pradesh.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  },
  {
    slug: "vip-baddi",
    title: "VIP Pharma Formulations Facility",
    location: "Baddi, Haryana",
    year: "2020",
    client: "VIP Pharma",
    category: "Pharmaceutical",
    image: "/images/projects/project-5.png",
    imageAlt: "VIP Pharma tablet formulations plant",
    gallery: JSON.stringify([]),
    description: "Turnkey HVAC for solid dosage tablet and capsule manufacturing block.",
    challenge: "High dust generation during powder compression and tablet coating.",
    solution: "Dust extraction hoods coupled to reverse pulse jet bag filters and HEPA return AHUs.",
    results: JSON.stringify(["Worker health safety assured", "Cleanroom air quality Grade D maintained"]),
    tags: JSON.stringify(["Formulations", "HVAC", "Tablet Block", "Cleanroom"]),
    faq: JSON.stringify([{ question: "How was dust extracted?", answer: "Via pulse jet bag filters and HEPA return air handling units." }]),
    facilitySize: "22,000 sq. ft.",
    industrySector: "Solid Dosage Formulations",
    complianceStandards: JSON.stringify(["WHO-GMP Grade D"]),
    technologiesUsed: JSON.stringify(["Reverse Pulse Jet Bag Filters", "HEPA Return AHU"]),
    metaTitle: "VIP Pharma Solid Dosage HVAC | Thermopharm",
    metaDesc: "Dust extraction & Grade D HVAC engineering for VIP Pharma tablet block in Baddi.",
    publisher: "Thermopharm Engineering",
    author: "Ashish Jha - Founder & Director",
    status: "PUBLISHED"
  }
];

const initialBlogs = [
  {
    slug: "understanding-iso-14644-cleanroom-standards",
    title: "Understanding ISO 14644 Cleanroom Standards: A Complete Guide",
    excerpt: "ISO 14644 is the global benchmark for cleanroom classification and monitoring. This guide breaks down every clause you need to know before designing or qualifying your facility.",
    content: "ISO 14644 is a multi-part standard that defines cleanroom classification, monitoring, and design requirements. Understanding its structure is essential for any pharmaceutical or semiconductor facility engineer...\n\n## Part 1: Classification\nISO 14644-1 defines cleanliness classes based on airborne particle counts per cubic metre. The most common classes used in pharma are ISO 5 (Grade A/B) and ISO 7/8 (Grade C/D).",
    image: "/images/projects/project-3.png",
    category: "Cleanroom",
    author: "Ashish Jha (Founder & Director)",
    date: "2024-01-15",
    readTime: "8 min read",
    faq: JSON.stringify([
      { question: "What is the difference between ISO 5 and Grade A/B?", answer: "ISO 14644-1 Class 5 corresponds broadly to EU GMP Grade A and Grade B (at-rest)." }
    ])
  },
  {
    slug: "benefits-of-bim-in-cleanroom-design",
    title: "Benefits of BIM in Cleanroom Design: Reducing Cost and Risk",
    excerpt: "Building Information Modelling (BIM) has transformed cleanroom and pharmaceutical facility design. Here's how LOD 300+ models prevent costly on-site surprises.",
    content: "BIM adoption in cleanroom projects has proven to reduce construction rework by up to 40% and cut project delivery timelines by 15–20%. Here's why every pharma facility owner should demand BIM from their engineering partner...",
    image: "/images/projects/project-4.png",
    category: "BIM",
    author: "Sudip Yadav (Design Manager)",
    date: "2024-02-20",
    readTime: "6 min read",
    faq: JSON.stringify([
      { question: "What LOD is required for cleanroom projects?", answer: "LOD 400 is recommended for fabrication-ready MEP ducting and cleanroom panels." }
    ])
  },
  {
    slug: "hvac-validation-guidelines-who-gmp",
    title: "HVAC Validation Guidelines for WHO-GMP Compliance",
    excerpt: "A step-by-step walkthrough of DQ, IQ, OQ, and PQ validation protocols for pharmaceutical air handling systems.",
    content: "Validating an industrial HVAC system for WHO-GMP compliance requires structured Qualification Protocol execution...",
    image: "/images/projects/project-2.png",
    category: "HVAC Validation",
    author: "Ashish Jha (Founder & Director)",
    date: "2024-03-10",
    readTime: "7 min read",
    faq: JSON.stringify([
      { question: "What parameters are tested during OQ?", answer: "Airflow velocity, air change rates, differential pressure, filter integrity (DOP/PAO test), and recovery time." }
    ])
  }
];

const initialTestimonials = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Director of Operations",
    company: "Cipla Biotech Labs",
    content: "Thermopharm's engineering team executed our ISO 5 sterile cleanroom flawlessly. Their deep understanding of WHO-GMP guidelines ensured we passed our international audit with zero observations.",
    rating: 5,
    status: "PUBLISHED"
  },
  {
    name: "Vikram Malhotra",
    role: "VP Engineering & Facilities",
    company: "Sun Pharmaceutical Industries",
    content: "The BIM MEP coordination and chilled water system overhaul executed by Thermopharm reduced our facility energy footprint by 22% while keeping tight humidity tolerances.",
    rating: 5,
    status: "PUBLISHED"
  },
  {
    name: "Amitabh Roy",
    role: "Plant Head",
    company: "IOL Chemicals",
    content: "Thermopharm designed our API block ventilation and solvent scrubber systems. Their flameproof engineering and 21 CFR Part 11 SCADA monitoring passed US-FDA audit seamlessly.",
    rating: 5,
    status: "PUBLISHED"
  }
];

const initialLeads = [
  {
    name: "Amit Patel",
    company: "Zydus Lifesciences",
    email: "amit.patel@zydus.example.com",
    phone: "+91 98765 43210",
    service: "Cleanroom Solutions",
    message: "We require a turnkey DQ/IQ/OQ/PQ validated ISO Class 6 cleanroom for our new injectable block in Ahmedabad.",
    status: "NEW"
  },
  {
    name: "Sandeep Verma",
    company: "Lupin Pharma",
    email: "sandeep.v@lupin.example.com",
    phone: "+91 98123 45678",
    service: "HVAC Systems",
    message: "Looking for an HVAC overhaul with HEPA filtration for our 25,000 sq ft API synthesis facility in Goa.",
    status: "CONTACTED"
  }
];

async function main() {
  console.log("Seeding Supabase PostgreSQL Database with ALL 14 Projects, 6 Services, 5 Industries, and Content...");

  // 1. Admin User
  const email = (process.env.ADMIN_EMAIL || "Ashish@thermopharm.in").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Ashish@1998";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`✓ Admin user ready: ${email}`);

  // 2. Services
  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✓ Seeded ${initialServices.length} Services`);

  // 3. Industries
  for (const ind of initialIndustries) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }
  console.log(`✓ Seeded ${initialIndustries.length} Industries`);

  // 4. Projects
  for (const p of initialProjects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ Seeded ${initialProjects.length} Projects`);

  // 5. Blogs
  for (const b of initialBlogs) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`✓ Seeded ${initialBlogs.length} Blog Posts`);

  // 6. Testimonials
  for (const t of initialTestimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✓ Seeded ${initialTestimonials.length} Testimonials`);

  // 7. Inquiries / Leads
  for (const l of initialLeads) {
    const existing = await prisma.lead.findFirst({ where: { email: l.email } });
    if (!existing) {
      await prisma.lead.create({ data: l });
    }
  }
  console.log(`✓ Seeded ${initialLeads.length} Inquiries / Leads`);

  console.log("SUCCESS: All 14 Projects, 6 Services, 5 Industries, Blogs & Inquiries successfully populated in Supabase!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
