import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        alt="CheckMate.ink"
        src="/mascot/logo-mascot-blue-circle.svg"
        width={36}
        height={36}
        className="rounded-full"
      />
      <span className="text-base sm:text-xl font-serif font-normal">
        check
        <span className="italic font-bold">mate.</span>
      </span>
    </Link>
  );
}
