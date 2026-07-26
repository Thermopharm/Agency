const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

async function main() {
  for (const ind of initialIndustries) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }
  console.log("SUCCESS: Initial industries seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
