import React, { Suspense } from "react";
import { prisma } from "./utils/db";
import BlogPostCard from "@/app/components/general/BlogPostCard";

export const revalidate = 7200;

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      views: true,
      createAt: true,
      authorId: true,
      updatedAt: true,
    },
  });
  return data;
}

// 添加 SuspenseFallback 作为 fallback 渲染的组件
const BlogPostCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200"></div>{" "}
            {/* Image Skeleton */}
            <div className="p-4">
              <div className="h-6 mb-2 bg-gray-200 rounded w-3/4"></div>{" "}
              {/* Title Skeleton */}
              <div className="h-4 mb-4 bg-gray-200 rounded w-5/6"></div>{" "}
              {/* Content Skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>{" "}
                  {/* Author Image Skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-24"></div>{" "}
                  {/* Author Name Skeleton */}
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>{" "}
                {/* Date Skeleton */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

async function BlogPosts() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {data.map((item) => {
        return <BlogPostCard data={item} key={item.id}></BlogPostCard>;
      })}
    </div>
  );
}

const Home = () => {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">最新文章</h1>
      <Suspense fallback={<BlogPostCardSkeleton />}>
        <BlogPosts></BlogPosts>
      </Suspense>
    </div>
  );
};

export default Home;
