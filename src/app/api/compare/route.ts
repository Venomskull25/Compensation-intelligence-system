import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { compareSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated = compareSchema.parse(body);

    const salaries = await prisma.salary.findMany({
      where: {
        id: {
          in: validated.ids,
        },
      },
    });

    if (salaries.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No salaries found",
        },
        {
          status: 404,
        }
      );
    }

    const highestTC = salaries.reduce(
      (prev, current) =>
        prev.totalComp > current.totalComp
          ? prev
          : current
    );

    const lowestTC = salaries.reduce(
      (prev, current) =>
        prev.totalComp < current.totalComp
          ? prev
          : current
    );

    return NextResponse.json({
      success: true,

      data: {
        salaries,

        highestTC,

        compensationGap:
          highestTC.totalComp -
          lowestTC.totalComp,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 400,
      }
    );
  }
}