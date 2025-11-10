import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image alt="CheckMate.ink" src="/logo.png" width={32} height={32} />
      <span className="text-base sm:text-xl font-bold font-serif">
        CheckMate.ink
      </span>
    </Link>
  );
}

