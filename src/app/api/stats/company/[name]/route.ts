import { NextRequest, NextResponse } from "next/server";

import { normalizeCompanyName } from "@/lib/normalize";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: {
    params: Promise<{
      name: string;
    }>;
  }
) {
  try {
    const params = await context.params;

    const company = normalizeCompanyName(
      params.name
    );

    const stats = await prisma.salary.aggregate({
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

    return NextResponse.json({
      success: true,

      data: {
        company,

        averageBaseSalary:
          stats._avg.baseSalary,

        averageStock: stats._avg.stock,

        averageBonus: stats._avg.bonus,

        averageTotalComp:
          stats._avg.totalComp,

        totalEntries: stats._count,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch company stats",
      },
      {
        status: 500,
      }
    );
  }
}