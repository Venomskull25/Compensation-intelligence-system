import { NextRequest, NextResponse } from "next/server";

import { createSalarySchema } from "@/lib/validation";
import { normalizeCompanyName } from "@/lib/normalize";
import { SalaryService } from "@/lib/services/salary.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit =
      Number(searchParams.get("limit")) || 10;

    const result = await SalaryService.getSalaries({
      page,
      limit,

      company:
        searchParams.get("company") || undefined,

      role: searchParams.get("role") || undefined,

      location:
        searchParams.get("location") || undefined,

      minSalary: searchParams.get("minSalary")
        ? Number(searchParams.get("minSalary"))
        : undefined,

      maxSalary: searchParams.get("maxSalary")
        ? Number(searchParams.get("maxSalary"))
        : undefined,

      sortBy:
        searchParams.get("sortBy") || "createdAt",

      order:
        (searchParams.get("order") as
          | "asc"
          | "desc") || "desc",
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch salaries",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated =
      createSalarySchema.parse(body);

    validated.company = normalizeCompanyName(
      validated.company
    );

    const salary =
      await SalaryService.createSalary(validated);

    return NextResponse.json(
      {
        success: true,
        data: salary,
      },
      {
        status: 201,
      }
    );
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