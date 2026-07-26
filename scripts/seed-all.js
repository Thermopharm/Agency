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
    ])
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
    ])
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
    ])
  },
  {
    slug: "bms-automation",
    title: "BMS & Automation",
    icon: "Cpu",
    shortDesc: "Centralized Building Management Systems with 21 CFR Part 11 compliant audit trails, alarm logging, and energy optimization.",
    fullDesc: "We implement SCADA and PLC-based BMS solutions to continuously monitor differential pressure, temperature, relative humidity, and air velocity in critical spaces with 21 CFR Part 11 compliance.",
    image: "/images/bms.jpg",
    specs: JSON.stringify(["21 CFR Part 11 compliant audit trail", "BACnet & Modbus protocol integration", "Real-time alarm management & SMS alerts", "Energy metering & optimization dashboard", "Redundant server failover architecture"]),
    standards: JSON.stringify(["US-FDA 21 CFR Part 11", "GAMP 5", "IEEE 802.3"]),
    faq: JSON.stringify([
      { question: "Is your BMS compliant with FDA 21 CFR Part 11?", answer: "Yes, our systems include encrypted audit trails, multi-level electronic signatures, and password aging policies." }
    ])
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
    slug: "cipla-biotech-facility",
    title: "Cipla Sterile Fill-Finish Cleanroom",
    location: "Pune, Maharashtra",
    year: "2024",
    client: "Cipla Biotech",
    category: "Cleanroom & HVAC",
    image: "/images/projects/project-1.png",
    description: "Turnkey ISO 5 modular cleanroom execution with integrated HEPA H14 ceiling grid and positive pressure cascades for sterile injectable production.",
    challenge: "Maintaining strict ISO 5 particle counts with continuous 24/7 HVAC operation while minimizing energy consumption.",
    solution: "Installed variable-speed EC fan filter units paired with desiccant dehumidifiers and automated BMS pressure control.",
    results: JSON.stringify(["Zero particle exceedances during validation", "22% energy reduction compared to conventional AHUs", "Passed US-FDA audit first time"]),
    tags: JSON.stringify(["ISO 5", "Sterile Fill-Finish", "BMS Integration"]),
    faq: JSON.stringify([{ question: "What was the validation timeline?", answer: "Complete DQ to PQ validation was finished within 21 days." }])
  },
  {
    slug: "sun-pharma-hvac-overhaul",
    title: "Sun Pharma Formulations Plant HVAC",
    location: "Halol, Gujarat",
    year: "2023",
    client: "Sun Pharma",
    category: "Industrial HVAC",
    image: "/images/projects/project-2.png",
    description: "Complete HVAC redesign and chilled water piping installation for a 45,000 sq. ft. oral solid dosage (OSD) manufacturing block.",
    challenge: "Executing the entire system replacement during a tight 14-day plant shutdown without disturbing adjacent operating suites.",
    solution: "Pre-fabricated modular pipe spools using 3D BIM modelling and executed 3-shift installation teams around the clock.",
    results: JSON.stringify(["Completed 36 hours ahead of scheduled shutdown", "Zero cross-contamination between processing bays", "Maintained 20°C ± 1°C and 45% ± 5% RH"]),
    tags: JSON.stringify(["OSD Block", "Chilled Water Piping", "3D BIM"]),
    faq: JSON.stringify([{ question: "Was plant downtime minimized?", answer: "Yes, pre-fabrication allowed us to complete the switchover in under 12 days." }])
  }
];

const initialBlogs = [
  {
    slug: "iso-14644-cleanroom-classification-guide",
    title: "Understanding ISO 14644-1 Cleanroom Standards for Pharma",
    excerpt: "A practical breakdown of particle count limits, air change rates, and validation requirements for ISO 5 through ISO 8 cleanroom facilities.",
    content: "Cleanrooms in pharmaceutical manufacturing must conform to ISO 14644-1 standards. This guide covers particle concentration limits (0.1µm to 5.0µm), airflow velocity thresholds, and qualification protocol strategies...",
    image: "/images/projects/project-3.png",
    category: "Cleanroom Standards",
    author: "Ashish Patel (Managing Director)",
    date: "July 20, 2024",
    readTime: "6 min read",
    faq: JSON.stringify([{ question: "What is the difference between ISO 5 and Grade A?", answer: "ISO 5 defines particle limits, while EU-GMP Grade A adds microbiological monitoring criteria under operational states." }])
  },
  {
    slug: "dew-point-control-in-hvac",
    title: "Achieving Low Dew Point Control (-40°C) in Critical HVAC",
    excerpt: "How desiccant dehumidification and precise psychrometric design prevent moisture-induced active ingredient degradation.",
    content: "Moisture control is vital in effervescent tablet production and hygroscopic chemical handling. We detail the engineering behind desiccant rotor integration...",
    image: "/images/chiller.jpg",
    category: "HVAC Engineering",
    author: "Engineering Team",
    date: "June 15, 2024",
    readTime: "8 min read",
    faq: JSON.stringify([{ question: "Why is -40°C dew point needed?", answer: "Hygroscopic API formulations absorb moisture rapidly at higher humidity, leading to caking and loss of active efficacy." }])
  }
];

const initialTestimonials = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Director of Operations",
    company: "Cipla Biotech Labs",
    content: "Thermopharm's engineering team executed our ISO 5 sterile cleanroom flawlessly. Their deep understanding of WHO-GMP guidelines ensured we passed our international audit with zero observations.",
    rating: 5
  },
  {
    name: "Vikram Malhotra",
    role: "VP Engineering",
    company: "Sun Pharmaceutical Industries",
    content: "The BIM MEP coordination and chilled water system overhaul executed by Thermopharm reduced our facility energy footprint by 22% while keeping tight humidity tolerances.",
    rating: 5
  }
];

async function main() {
  console.log("Seeding Database...");

  // 1. Admin User
  const email = process.env.ADMIN_EMAIL || "Ashish@thermopharm.in";
  const password = process.env.ADMIN_PASSWORD || "Ashish@1998";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`✓ Admin user created/updated: ${email}`);

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

  console.log("SUCCESS: All initial content successfully populated in database!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
