import { NextRequest, NextResponse } from "next/server";

import { SalaryService } from "@/lib/services/salary.service";

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

    const stats =
      await SalaryService.getCompanyStats(
        params.name
      );

    return NextResponse.json({
      success: true,
      data: stats,
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
        status: 500,
      }
    );
  }
}