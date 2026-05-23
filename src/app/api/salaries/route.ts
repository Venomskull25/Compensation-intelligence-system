import { NextRequest, NextResponse } from "next/server";

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

      role:
        searchParams.get("role") || undefined,

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
  } catch (error: unknown) {
    console.error("SALARIES API ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",

        fullError: String(error),
      },
      {
        status: 500,
      }
    );
  }
}