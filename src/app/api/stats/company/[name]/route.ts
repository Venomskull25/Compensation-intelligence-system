import { NextRequest, NextResponse } from "next/server";

import { normalizeCompanyName } from "@/lib/normalize";
import { SalaryService } from "@/lib/services/salary.service";

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{
      name: string;
    }>;
  }
) {
  try {
    const params =
      await context.params;

    const company =
      normalizeCompanyName(
        params.name
      );

    const result =
      await SalaryService.getCompanyStats(
        company
      );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch company stats",
      },
      {
        status: 500,
      }
    );
  }
}