-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "baseSalary" DOUBLE PRECISION NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "bonus" DOUBLE PRECISION NOT NULL,
    "totalComp" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Salary_company_idx" ON "Salary"("company");

-- CreateIndex
CREATE INDEX "Salary_role_idx" ON "Salary"("role");

-- CreateIndex
CREATE INDEX "Salary_location_idx" ON "Salary"("location");

-- CreateIndex
CREATE INDEX "Salary_totalComp_idx" ON "Salary"("totalComp");
