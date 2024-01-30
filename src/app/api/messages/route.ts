import { db } from "@/database/db";
import { messageTable } from "@/database/schema";
import dayjs from "dayjs";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// TODO: Auth. Internal services want to communicate with this
// Some "token" implementation can work - i.e. just share a long string

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topicIdQueryParam = searchParams.get("topicId");
  const topicId = parseInt(topicIdQueryParam!);

  if (!topicIdQueryParam && Number.isNaN(topicId)) {
    return new Response(null, {
      status: 400,
      statusText: "topicId required",
    });
  }

  const messages = await db.query.messageTable.findMany({
    where: eq(messageTable.topicId, topicId),
    orderBy: [asc(messageTable.createdAt)],
  });

  return Response.json(messages);
}

export async function POST(request: Request) {
  // This endpoint only serves our own queue worker, so a long-lived token should do.

  let params;
  try {
    params = await request.json();
    // Missing step: Validate request structure. Zod?
  } catch (e) {
    return new Response(null, {
      status: 400,
      statusText: "Request body required in JSON format",
    });
  }

  const topicId = params.topicId;
  const content = params.content;
  const userId = params.userId;

  const newMessage = (
    await db
      .insert(messageTable)
      .values({
        createdAt: dayjs().toISOString(), // This should sit on a "serializer". Should be built in
        topicId,
        userId,
        text: content,
      })
      .returning()
  )[0];

  return NextResponse.json(newMessage, { status: 200 });
}
