import { prisma } from "../prisma";

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
      data.baseSalary +
      data.stock +
      data.bonus;

    return prisma.salary.create({
      data: {
        ...data,
        totalComp,
      },
    });
  }

  static async getSalaries(params: {
    page: number;
    limit: number;
    company?: string;
    role?: string;
    location?: string;
    minSalary?: number;
    maxSalary?: number;
    sortBy?: string;
    order?: "asc" | "desc";
  }) {
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

    const where: any = {};

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

    const [data, total] =
      await Promise.all([
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
      data,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    };
  }

  static async compareSalaries(
    ids: number[]
  ) {
    const salaries =
      await prisma.salary.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

    const highest = salaries.reduce(
      (prev, current) =>
        prev.totalComp >
        current.totalComp
          ? prev
          : current
    );

    const lowest = salaries.reduce(
      (prev, current) =>
        prev.totalComp <
        current.totalComp
          ? prev
          : current
    );

    return {
      salaries,

      highestTC: highest,

      compensationGap:
        highest.totalComp -
        lowest.totalComp,
    };
  }

  static async getCompanyStats(
    company: string
  ) {
    const stats =
      await prisma.salary.aggregate({
        where: {
          company,
        },

        _avg: {
          baseSalary: true,
          stock: true,
          bonus: true,
          totalComp: true,
        },

        _count: true,
      });

    return {
      company,

      averageBaseSalary:
        stats._avg.baseSalary,

      averageStock:
        stats._avg.stock,

      averageBonus:
        stats._avg.bonus,

      averageTotalComp:
        stats._avg.totalComp,

      totalEntries: stats._count,
    };
  }
}