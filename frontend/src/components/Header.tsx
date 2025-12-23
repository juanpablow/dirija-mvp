"use client";

import Link from "next/link";
import { Car } from "lucide-react";

export function Header() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("instructor-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto container-padding py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">DiriJá</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#instructor-form"
              onClick={scrollToForm}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition cursor-pointer"
            >
              Seja um Instrutor
            </a>
          </div>
          <div className="md:hidden flex items-center space-x-3">
            <Link
              href="/faq"
              className="text-gray-700 hover:text-primary-600 transition font-medium text-sm"
            >
              Guia
            </Link>
            <a
              href="#instructor-form"
              onClick={scrollToForm}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
            >
              Cadastrar
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
