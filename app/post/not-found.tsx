import Link from "next/link";
import { Frown } from "lucide-react";
import { buttonVariants } from "../components/ui/button";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>没有找到请求的文章！</p>
      <Link href="/dashboard" className={buttonVariants()}>
        返回
      </Link>
    </main>
  );
}
