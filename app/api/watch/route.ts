import { prisma } from "@/app/utils/db";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const postId = params.get("postId") as string;
  // 更新文章观看量
  try {
    await prisma.blogPost.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
  return Response.json({ status: 200 });
}
