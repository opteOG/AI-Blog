import { prisma } from "@/app/utils/db";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { streamText } from "ai";
import { redirect } from "next/navigation";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.BASE_URL,
});
// 上传消息给大模型
export async function POST(req: Request) {
  const { messages, sessionId } = await req.json();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/register");
  }
  // 添加会话
  await prisma.session.upsert({
    where: { id: sessionId },
    update: {}, // 如果存在，不更新任何字段
    create: { id: sessionId, userId: sessionId }, // 如果不存在，就创建
  });
  // 添加消息数据
  await prisma.message.create({
    data: {
      content: messages[messages.length - 1].content,
      role: messages[messages.length - 1].role,
      sessionId: sessionId,
    },
  });

  // 向AI大模型发送数据
  const result = streamText({
    model: deepseek("deepseek-v3"),
    system: "You are a helpful assistant.",
    messages,
    onFinish: async (response) => {
      // 存储AI回复信息
      await prisma.message.create({
        data: {
          content: response.text,
          role: "assistant",
          sessionId: sessionId,
        },
      });
    },
  });
  return result.toDataStreamResponse();
}
// 获取历史消息
export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const historys = await prisma.message.findMany({
    select: {
      content: true,
      role: true,
      createdAt: true,
      id: true,
    },
    where: {
      sessionId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return Response.json(historys);
}

// 清空历史
export async function DELETE() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user.id;

  await prisma.message.deleteMany({
    where: {
      sessionId: userId,
    },
  });
  return Response.json({ code: 200 });
}
