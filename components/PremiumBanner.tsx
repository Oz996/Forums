import Link from "next/link";

interface props {
  pathName: any;
  hiddenRoutes: string[];
}

export default function PremiumBanner({ pathName, hiddenRoutes }: props) {
  return (
    <Link
      href={"/upgrade"}
      className={hiddenRoutes.includes(pathName) ? "hidden" : ""}
    >
      <div className="h-[1.7rem] w-full absolute right-0 left-0 top-12 bg-primary-400 flex items-center justify-center text-white">
        <p>Upgrade to Premium </p>
      </div>
    </Link>
  );
}
