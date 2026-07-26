const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("Ashish@1998", salt);
  
  const user = await prisma.user.upsert({
    where: { email: "ashish@thermopharm.in" },
    update: { passwordHash },
    create: { email: "ashish@thermopharm.in", passwordHash },
  });

  console.log("SUCCESS: Admin user seeded/updated ->", user.email);
}

main()
  .catch((e) => console.error("SEED ERROR:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
