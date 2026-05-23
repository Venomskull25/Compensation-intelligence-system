import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.salary.createMany({
    data: [
      {
        company: "Google",
        role: "Software Engineer",
        level: "L4",
        location: "Bangalore",

        baseSalary: 2500000,
        stock: 1200000,
        bonus: 300000,
        totalComp: 4000000,
      },

      {
        company: "Google",
        role: "Senior Software Engineer",
        level: "L5",
        location: "Hyderabad",

        baseSalary: 3200000,
        stock: 1800000,
        bonus: 500000,
        totalComp: 5500000,
      },

      {
        company: "Amazon",
        role: "SDE 2",
        level: "L5",
        location: "Hyderabad",

        baseSalary: 2200000,
        stock: 900000,
        bonus: 250000,
        totalComp: 3350000,
      },

      {
        company: "Microsoft",
        role: "Software Engineer",
        level: "63",
        location: "Bangalore",

        baseSalary: 2400000,
        stock: 1000000,
        bonus: 200000,
        totalComp: 3600000,
      },

      {
        company: "Meta",
        role: "Backend Engineer",
        level: "E5",
        location: "Remote",

        baseSalary: 3500000,
        stock: 2500000,
        bonus: 700000,
        totalComp: 6700000,
      },

      {
        company: "Netflix",
        role: "Platform Engineer",
        level: "Senior",
        location: "Remote",

        baseSalary: 5000000,
        stock: 0,
        bonus: 1000000,
        totalComp: 6000000,
      },
    ],
  });

  console.log(
    "Seed data inserted successfully."
  );
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });