import { desc, inArray } from "drizzle-orm";
import { getDb } from "../../../db";
import { questions } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select().from(questions).orderBy(desc(questions.id));
    return Response.json({ questions: rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "读取题库失败" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { questions?: Array<Record<string, unknown>> };
    const values = (Array.isArray(body.questions) ? body.questions : []).map((item) => ({
      content: String(item.content ?? "").trim(), answer: String(item.answer ?? "").trim(), analysis: String(item.analysis ?? "").trim(),
      subject: String(item.subject ?? "数学"), grade: String(item.grade ?? "九年级"), type: String(item.type ?? "解答题"),
      difficulty: String(item.difficulty ?? "中等"), source: String(item.source ?? "手动录入"),
    })).filter((item) => item.content);
    if (!values.length) return Response.json({ error: "请至少填写一道题目" }, { status: 400 });
    const created = await getDb().insert(questions).values(values).returning();
    return Response.json({ questions: created }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "保存题目失败" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json() as { ids?: number[] };
    const ids = (body.ids ?? []).filter(Number.isInteger);
    if (!ids.length) return Response.json({ error: "请选择题目" }, { status: 400 });
    await getDb().delete(questions).where(inArray(questions.id, ids));
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "删除失败" }, { status: 500 });
  }
}
