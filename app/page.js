"use client"; // app/page.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/landing");
  }, [router]);

  return null; // Optionally, you can return a loading indicator here
}
