"use client";

import React, { useEffect } from "react";

interface ViewMonitorProps {
  postId: string;
}

const ViewMonitor = React.memo(({ postId }: ViewMonitorProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`/api/watch?postId=${postId}`, { method: "POST" });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return <div></div>;
});

ViewMonitor.displayName = "ViewMonitor";

export default ViewMonitor;
