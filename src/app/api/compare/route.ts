import { NextRequest, NextResponse } from "next/server";

import { compareSchema } from "@/lib/validation";
import { SalaryService } from "@/lib/services/salary.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validated =
      compareSchema.parse(body);

    const comparison =
      await SalaryService.compareSalaries(
        validated.ids
      );

    return NextResponse.json({
      success: true,
      data: comparison,
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