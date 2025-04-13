import { handleSubmisstion } from "@/app/action";
import SubmitButton from "@/app/components/general/SubmitButton";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { prisma } from "@/app/utils/db";
import { generateId } from "ai";
import Link from "next/link";
import React from "react";

const CreateBlog = async ({
  searchParams,
}: {
  searchParams: Promise<{ sessionId: string }>;
}) => {
  let { sessionId } = await searchParams;

  const message = await prisma.message.findFirst({
    where: {
      sessionId: sessionId,
      role: "AI",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  sessionId = sessionId || generateId();
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>创建文章</CardTitle>
          <CardDescription>
            发布一篇文章与世界分享
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleSubmisstion}>
            <div className="flex flex-col gap-2">
              <Label>标题</Label>
              <Input
                name="title"
                required
                type="text"
                placeholder="Title"
              ></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label>内容</Label>
              <Textarea
                name="content"
                required
                placeholder="Content"
                defaultValue={message?.content}
              ></Textarea>
            </div>

            <div className="flex flex-col gap-2">
              <Label>图片地址</Label>
              <Input
                name="url"
                required
                type="url"
                placeholder="Image URL"
              ></Input>
            </div>

            <SubmitButton></SubmitButton>
          </form>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center mt-2 ">
        <p>不知道如何表达？让AI来帮助你</p>
        <Link className={buttonVariants()} href={`/chat/${sessionId}`}>
          点击前往
        </Link>
      </div>
    </div>
  );
};

export default CreateBlog;
