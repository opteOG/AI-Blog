import { Skeleton } from "@/app/components/ui/skeleton";
import React from "react";

const loading = () => {
  return <Skeleton className="w-full h-[400px]"></Skeleton>;
};

export default loading;
