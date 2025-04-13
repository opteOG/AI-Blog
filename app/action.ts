"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// 处理博客文章提交
export async function handleSubmisstion(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: url as string,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  return redirect("/dashboard");
}
// 处理博客文章删除
export async function handleDelete(formData: FormData) {
  const postId = formData.get('id')
  await prisma.blogPost.delete({
    where: {
      id: postId?.toString()
    }
  })
  revalidatePath('/dashboard')
}
