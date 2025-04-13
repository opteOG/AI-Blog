import { prisma } from "@/app/utils/db";
import formatTime from "@/app/utils/formatTime";
import { buttonVariants } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 7200;

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ id: string }>;

const IdPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await getData(id);
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants()} href="/dashboard">
        返回
      </Link>
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              ></Image>
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            {formatTime(data.createAt)}
          </p>
        </div>
      </div>
      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        ></Image>
      </div>
      <Card>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-200">{data.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdPage;
