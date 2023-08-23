// components
import SyncButton from "./SyncButton";
import ThemeButton from "./ThemeButton";

export default function ButtonsHeader() {
  return (
    <div className="relative pb-12">
      <SyncButton />
      <ThemeButton />
    </div>
  );
}
