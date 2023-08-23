// components
import RefreshButton from "./RefreshButton";
import ThemeButton from "./ThemeButton";

export default function ButtonsHeader() {
  return (
    <div className="relative pb-12">
      <RefreshButton />
      <ThemeButton />
    </div>
  );
}
