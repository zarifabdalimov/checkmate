import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image alt="CheckMate.ink" src="/logo.png" width={32} height={32} />
      <span className="text-base sm:text-xl font-serif font-normal">
        check
        <span className="italic font-bold">mate.</span>
      </span>
    </Link>
  );
}
