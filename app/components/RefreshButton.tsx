"use client"

import { useRouter } from 'next/navigation';

export default function RefreshButton() {
    const router = useRouter();
    function handleRefresh() {
        router.refresh();
    }
    return (
        <div>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      );
}