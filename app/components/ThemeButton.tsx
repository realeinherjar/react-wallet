import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function RefreshButton() {
  return (
    <button
      // onClick={}
      className="bg-secondary text-2xl text-primary mr-2 md:mr-16 rounded-lg p-1 px-3 absolute right-0 hover:bg-primary hover:text-secondary"
    >
      <MoonIcon className="h-6 w-6" />
    </button>
  );
}
