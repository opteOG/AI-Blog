import { Button, buttonVariants } from "@/app/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import BlogPostCard from "@/app/components/general/BlogPostCard";
import { handleDelete } from "../action";
import { Pointer } from "lucide-react";

async function getData(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return data;
}

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);
  return (
    <div>
      {data.length ? (
        <div>
          <div className="flex mb-4 items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight mb-8">您的文章</h2>
            <div className="flex items-center gap-4">
              <Link className={buttonVariants()} href="/dashboard/create">
                创建文章
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => {
              return (
                <BlogPostCard data={item} key={item.id}>
                  <form action={handleDelete}>
                    <input
                      type="text"
                      hidden
                      name="id"
                      defaultValue={item.id}
                    />
                    <Button className="cursor-pointer">删除</Button>
                  </form>
                </BlogPostCard>
              );
            })}
          </div>
        </div>
      ) : (
        <Link
          href="/dashboard/create"
          className="mt-40 flex items-center justify-center gap-4"
        >
          <p className="text-gray-700 text-xl dark:text-gray-200">
            您还没有发布过文章，点击前往
          </p>
          <Pointer></Pointer>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
