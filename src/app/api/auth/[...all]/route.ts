import { getAuth } from "@/lib/auth-server";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

// Handler function that lazily initializes auth
async function handleRequest(request: NextRequest) {
  const auth = getAuth();

  if (!auth) {
    return NextResponse.json(
      { error: "Authentication is not configured. Please set DATABASE_URL." },
      { status: 503 }
    );
  }

  const handlers = toNextJsHandler(auth);
  return handlers.GET ? handlers.GET(request) : handlers.POST!(request);
}

export async function GET(request: NextRequest) {
  const auth = getAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication is not configured. Please set DATABASE_URL." },
      { status: 503 }
    );
  }
  const handlers = toNextJsHandler(auth);
  return handlers.GET!(request);
}

export async function POST(request: NextRequest) {
  const auth = getAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Authentication is not configured. Please set DATABASE_URL." },
      { status: 503 }
    );
  }
  const handlers = toNextJsHandler(auth);
  return handlers.POST!(request);
}
