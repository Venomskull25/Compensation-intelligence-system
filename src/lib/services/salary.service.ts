import { prisma } from "../prisma";

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
    const totalComp =
      data.baseSalary + data.stock + data.bonus;

    return prisma.salary.create({
      data: {
        ...data,
        totalComp,
      },
    });
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

    const where: {
      company?: {
        contains: string;
      };

      role?: {
        contains: string;
      };

      location?: {
        contains: string;
      };

      totalComp?: {
        gte?: number;
        lte?: number;
      };
    } = {};

    if (company) {
      where.company = {
        contains: company,
      };
    }

    if (role) {
      where.role = {
        contains: role,
      };
    }

    if (location) {
      where.location = {
        contains: location,
      };
    }

    if (minSalary || maxSalary) {
      where.totalComp = {};

      if (minSalary) {
        where.totalComp.gte = minSalary;
      }

      if (maxSalary) {
        where.totalComp.lte = maxSalary;
      }
    }

    const [data, total] = await Promise.all([
      prisma.salary.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
      }),

      prisma.salary.count({
        where,
      }),
    ]);

    return {
      success: true,

      data,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}