import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuLateralProps {
  links: { href: string; label: string }[];
}

export const MenuLateral = ({ links }: MenuLateralProps) => {
  const pathname = usePathname();

  return (
    <div className="flex">
      {links.map((link) => (
        <div
          key={link.href}
          className={`transition duration-300 h-full w-[30px] border-l border-[#3F4751] flex items-center ${
            pathname === link.href
              ? "bg-[#3F4751] text-white"
              : "bg-[#E0E0E0] text-[#3F4751] hover:bg-[#3F4751] hover:text-white"
          }`}
        >
          <Link
            href={link.href}
            className={`pt-[30px] font-regular w-full h-full flex items-center lg:text-[18px] tracking-[-0.04em] lg:leading-[18px] rotate-180 transition duration-300 ${
              pathname === link.href
                ? "text-white"
                : "text-[#3F4751] hover:bg-[#3F4751] hover:text-white"
            }`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {link.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MenuLateral;
