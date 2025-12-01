"use client";

import Loading from "@/app/components/Loading";
import { setToken } from "@/utils/authUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function GoogleSuccessInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setToken(token);
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [token, router]);

  return <Loading />;
}

export default function GoogleSuccess() {
  return (
    <Suspense fallback={<Loading />}>
      <GoogleSuccessInner />
    </Suspense>
  );
}
