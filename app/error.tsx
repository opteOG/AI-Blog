"use client";

import { useEffect } from "react";
import { buttonVariants } from "./components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center mb-4 font-bold text-3xl">出错了!</h2>
      <button className={buttonVariants()} onClick={() => reset()}>
        重新尝试
      </button>
    </main>
  );
}
