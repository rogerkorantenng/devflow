"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useUsername() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("devflow_username");
    if (!stored) {
      router.replace("/");
    } else {
      setUsername(stored);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("devflow_username");
    router.replace("/");
  };

  return { username, logout };
}
