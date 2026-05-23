type Salary = {
  id: number;
  company: string;
  role: string;
  level: string;
  location: string;
  baseSalary: number;
  stock: number;
  bonus: number;
  totalComp: number;
  createdAt: Date;
};

const salaries: Salary[] = [
  {
    id: 1,
    company: "Google",
    role: "Backend Engineer",
    level: "L5",
    location: "Bangalore",
    baseSalary: 3500000,
    stock: 1500000,
    bonus: 300000,
    totalComp: 5300000,
    createdAt: new Date(),
  },

  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineer",
    level: "SDE2",
    location: "Hyderabad",
    baseSalary: 2800000,
    stock: 1200000,
    bonus: 250000,
    totalComp: 4250000,
    createdAt: new Date(),
  },

  {
    id: 3,
    company: "Amazon",
    role: "Platform Engineer",
    level: "L6",
    location: "Pune",
    baseSalary: 3200000,
    stock: 1000000,
    bonus: 200000,
    totalComp: 4400000,
    createdAt: new Date(),
  },
];

type SalaryFilters = {
  page: number;
  limit: number;
  company?: string;
  role?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};

export class SalaryService {
  static async createSalary(data: {
    company: string;
    role: string;
    level: string;
    location: string;
    baseSalary: number;
    stock: number;
    bonus: number;
  }) {
    const newSalary: Salary = {
      id: salaries.length + 1,

      ...data,

      totalComp:
        data.baseSalary +
        data.stock +
        data.bonus,

      createdAt: new Date(),
    };

    salaries.push(newSalary);

    return newSalary;
  }

  static async getSalaries(params: SalaryFilters) {
    const {
      page,
      limit,
      company,
      role,
      location,
      minSalary,
      maxSalary,
      sortBy = "createdAt",
      order = "desc",
    } = params;

    let filtered = [...salaries];

    if (company) {
      filtered = filtered.filter((s) =>
        s.company
          .toLowerCase()
          .includes(company.toLowerCase())
      );
    }

    if (role) {
      filtered = filtered.filter((s) =>
        s.role
          .toLowerCase()
          .includes(role.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((s) =>
        s.location
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    if (minSalary) {
      filtered = filtered.filter(
        (s) => s.totalComp >= minSalary
      );
    }

    if (maxSalary) {
      filtered = filtered.filter(
        (s) => s.totalComp <= maxSalary
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[
        sortBy as keyof Salary
      ] as number;

      const bValue = b[
        sortBy as keyof Salary
      ] as number;

      return order === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    const start = (page - 1) * limit;

    const paginated = filtered.slice(
      start,
      start + limit
    );

    return {
      success: true,

      data: paginated,

      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(
          filtered.length / limit
        ),
      },
    };
  }

  static async compareSalaries(ids: number[]) {
    const selected = salaries.filter((s) =>
      ids.includes(s.id)
    );

    const highestTC = selected.reduce(
      (prev, current) =>
        prev.totalComp > current.totalComp
          ? prev
          : current
    );

    const lowestTC = selected.reduce(
      (prev, current) =>
        prev.totalComp < current.totalComp
          ? prev
          : current
    );

    return {
      salaries: selected,

      highestTC,

      compensationGap:
        highestTC.totalComp -
        lowestTC.totalComp,
    };
  }

  static async getCompanyStats(
    companyName: string
  ) {
    const companySalaries = salaries.filter(
      (s) =>
        s.company.toLowerCase() ===
        companyName.toLowerCase()
    );

    const total = companySalaries.length;

    if (!total) {
      return null;
    }

    const avg = (
      key: keyof Salary
    ) =>
      companySalaries.reduce(
        (sum, s) =>
          sum + (s[key] as number),
        0
      ) / total;

    return {
      company: companyName,

      averageBaseSalary:
        avg("baseSalary"),

      averageStock: avg("stock"),

      averageBonus: avg("bonus"),

      averageTotalComp:
        avg("totalComp"),

      totalEntries: total,
    };
  }
}