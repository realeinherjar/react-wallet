"use client";

import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SyncButton() {
  const router = useRouter();
  function handleRefresh() {
    router.refresh();
  }
  return (
    <button
      onClick={handleRefresh}
      className="bg-secondary dark:bg-primary text-2xl text-primary dark:text-secondary ml-2 md:ml-16 rounded-lg p-1 px-3 absolute left-0 hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:hover:text-primary"
    >
      <ArrowsUpDownIcon className="h-6 w-6" />
    </button>
  );
}
