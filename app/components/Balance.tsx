import Image from "next/image";
import { convertBalance } from "@/lib/bitcoin";

export default function Balance({ balance }: { balance: number }) {
  return (
    <div className="bg-secondary dark:bg-primary text-2xl text-center flex justify-center items-center text-primary dark:text-secondary mx-3 rounded-lg p-2 px-3 md:w-1/3 md:items-left ">
      <Image
        src="/bitcoin.svg"
        alt="Bitcoin logo"
        width={26}
        height={26}
        className="inline-block pr-1"
      />
      {convertBalance(balance)}
    </div>
  );
}
