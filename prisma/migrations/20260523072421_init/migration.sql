-- CreateTable
CREATE TABLE "Salary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "baseSalary" REAL NOT NULL,
    "stock" REAL NOT NULL,
    "bonus" REAL NOT NULL,
    "totalComp" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Salary_company_idx" ON "Salary"("company");

-- CreateIndex
CREATE INDEX "Salary_role_idx" ON "Salary"("role");

-- CreateIndex
CREATE INDEX "Salary_location_idx" ON "Salary"("location");

-- CreateIndex
CREATE INDEX "Salary_totalComp_idx" ON "Salary"("totalComp");
