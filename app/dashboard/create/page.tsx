import { handleSubmisstion } from "@/app/action";
import SubmitButton from "@/app/components/general/SubmitButton";
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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const CreateBlog = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const message = await prisma.message.findFirst({
    where: {
      sessionId: user.id,
      role: "assistant",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex items-center justify-center flex-1 pb-4">
      <Card className="max-w-lg mx-auto w-lg">
        <CardHeader>
          <CardTitle>创建文章</CardTitle>
          <CardDescription>发布一篇文章与世界分享</CardDescription>
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
    </div>
  );
};

export default CreateBlog;
