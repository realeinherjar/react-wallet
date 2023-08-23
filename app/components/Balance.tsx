import Image from "next/image";

function convertBalance(balance: number) {
  return balance / 100000000; // 100,000,000 satoshis in 1 BTC
}

export default function Balance({ balance }: { balance: number }) {
  return (
    <div className="bg-secondary dark:bg-primary text-2xl text-primary dark:text-secondary mr-2 rounded-lg p-1 px-3 flex items-center justify-center">
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
