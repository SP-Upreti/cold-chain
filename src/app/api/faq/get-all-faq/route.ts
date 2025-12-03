import { NextRequest, NextResponse } from "next/server";
import { IFAQResponse } from "@/types/IFAQ";

export async function GET(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    // Construct URL with query parameters
    const url = new URL("/faq/get-all-faq", API_BASE_URL);
    url.searchParams.set("page", page);
    url.searchParams.set("limit", limit);

    // Fetch from backend API
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }

    const data: IFAQResponse = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    
    return NextResponse.json(
      {
        status: 500,
        message: error instanceof Error ? error.message : "Internal Server Error",
        data: {
          faqs: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0
        }
      },
      { status: 500 }
    );
  }
}
