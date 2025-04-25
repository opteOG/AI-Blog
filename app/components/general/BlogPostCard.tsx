"use client";
import formatTime from "@/app/utils/formatTime";
import formatViewCount from "@/app/utils/formatViewCount";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface BlogPostCardProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    views: number;
    authorImage: string;
    createAt: Date;
    updatedAt: Date;
  };
  children?: ReactNode;
}

const BlogPostCard = ({ data, children }: BlogPostCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
      <Link href={`/post/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="Image for block"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          ></Image>
        </div>

        <div className="p-4">
          <h3 className="flex justify-between mb-2 text-lg font-semibold text-gray-900">
            <div>{data.title}</div>
            <p className="mb-4 text-sm text-gray-600 line-clamp-2">
              阅读量：{formatViewCount(data.views)}
            </p>
          </h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {data.content}
          </p>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={data.authorImage}
                  alt={data.authorName}
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {data.authorName}
              </p>
            </div>
            {children}
            <time className="text-xs text-gray-500">
              {formatTime(data.createAt)}
            </time>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;
