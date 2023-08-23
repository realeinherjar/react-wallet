"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function RefreshButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-secondary dark:bg-primary text-2xl text-primary dark:text-secondary mr-2 md:mr-16 rounded-lg p-1 px-3 absolute right-0 hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:hover:text-primary"
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
}
