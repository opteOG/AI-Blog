/* eslint-disable prefer-const */
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
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch("/api/chat", { method: "GET" });
      const data = await res.json();
      return data;
    },
  });

  let { messages, input, handleInputChange, handleSubmit, stop, status } =
    useChat({
      id: params.id,
      body: {
        sessionId: params.id,
      },
      initialMessages: data,
    });

  // 处理保存
  const handleSaveClick = () => {
    router.push(`/dashboard/create?sessionId=${params.id}&jumb=${true}`);
  };
  // 处理清空
  const handleClearClick = async () => {
    await fetch("/api/chat", { method: "DELETE" });
    window.location.reload();
  };
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex-1 max-h-[550px]">
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
      <form className="flex flex-col items-center flex-1 max-h-[200px]">
        <Textarea
          className="w-[50vw] shadow-md h-[200px] max-h-"
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
            <Tooltip>
              <TooltipTrigger
                name="save"
                className={`mt-2 px-10 py-2 cursor-pointer ${buttonVariants()}`}
                type="button"
                disabled={status === "streaming" ? true : false}
                onClick={handleClearClick}
              >
                清空
              </TooltipTrigger>
              <TooltipContent>
                <p>清除所有聊天内容</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
}
