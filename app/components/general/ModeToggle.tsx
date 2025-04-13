"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 解决 Hydration 问题，确保组件在客户端挂载后再显示
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 避免 SSR 与客户端渲染不匹配问题

  return (
    <button
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export default ModeToggle;
