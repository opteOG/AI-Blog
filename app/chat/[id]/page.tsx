"use client";

import { buttonVariants } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { useChat } from "@ai-sdk/react";
import { useParams, useRouter } from "next/navigation";
import Markdown from "react-markdown";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { messages, input, handleInputChange, handleSubmit, stop, status } =
    useChat({ id: params.id, body: {
      sessionId: params.id
    }});
  const router = useRouter();

  const handleSaveClick = () => {
    router.push(`/dashboard/create?sessionId=${params.id}`);
  };
  return (
    <div>
      <div className="h-[450px]">
        <ScrollArea className="size-full flex justify-center p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full my-2 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-full w-fit px-4 py-2 mb-2 text-gray-500 rounded-lg shadow-md ${
                  message.role === "user"
                    ? "bg-gray-100  self-end"
                    : " self-start dark:text-gray-200"
                }`}
              >
                <Markdown>{message.content}</Markdown>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <form className="m-auto flex flex-col items-center">
        <Textarea
          className="w-[50vw] shadow-md"
          placeholder="添加文章内容"
          name="prompt"
          value={input}
          onChange={handleInputChange}
        />
        <div className="flex items-center gap-x-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                name="submit"
                className={`mt-2 px-10 py-2 cursor-pointer ${buttonVariants()}`}
                type="submit"
                onClick={handleSubmit}
              >
                询问
              </TooltipTrigger>
              <TooltipContent>
                <p>提交内容至AI</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                name="save"
                className={`mt-2 px-10 py-2 cursor-pointer ${buttonVariants()}`}
                type="button"
                disabled={status === "streaming" ? true : false}
                onClick={handleSaveClick}
              >
                保存
              </TooltipTrigger>
              <TooltipContent>
                <p>保存最后一次AI回复至博客文章发布</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                name="stop"
                className={`mt-2 px-10 py-2 cursor-pointer ${buttonVariants()}`}
                type="button"
                disabled={status === "streaming" ? false : true}
                onClick={() => stop()}
              >
                停止
              </TooltipTrigger>
              <TooltipContent>
                <p>停止生成</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
}
