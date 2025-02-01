"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsActive(pathName === href);
  }, [href, pathName]);

  return (
    <Link
      href={href}
      className={`text-lg ${
        isActive ? "text-neutral-300" : "text-neutral-400"
      } hover:text-neutral-300 transition-colors`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <div className="flex flex-row mb-8 space-x-4 w-full max-w-sm sm:max-w-lg">
      <NavbarLink href="/">/home</NavbarLink>
      <NavbarLink href="/about">/about</NavbarLink>
      <NavbarLink href="/projects">/projects</NavbarLink>
    </div>
  );
}
