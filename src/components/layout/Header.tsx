"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import {
  Lightning,
  Stack,
  ChartLineUp,
  Buildings,
  CreditCard,
  Question,
  Shield,
  UsersThree,
  Trophy,
  BookOpenText,
  Files,
  Chats,
  Briefcase,
  type IconProps,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { NAVIGATION, ZOPU_LINKS } from "@/lib/constants";

type NavItem = {
  nome: string;
  href: string;
  descricao: string;
};

// Phosphor icon component wrapper for duotone style
type PhosphorIcon = React.ComponentType<IconProps>;

// Icon mapping for dropdown items - Phosphor Duotone
const iconMap: Record<string, PhosphorIcon> = {
  // Soluções
  "CRM Express": Lightning,
  "RevOps Launch": Stack,
  Enterprise: Buildings,
  // Como funciona
  "Metodologia Fluidsales": ChartLineUp,
  "Por que Bitrix24": Question,
  "Bitrix24 vs outros CRMs": Files,
  // Por que Zopu
  "Por que a Zopu": Trophy,
  "Cases de Sucesso": Trophy,
  Segurança: Shield,
  // Recursos
  Blog: BookOpenText,
  Biblioteca: Files,
  Zopucast: Chats,
  "Webinars Bitrix24": UsersThree,
  // Legado (para compatibilidade)
  "Licenças Bitrix24": CreditCard,
  Metodologias: ChartLineUp,
  "Por desafio": Trophy,
  "Para Comercial": Chats,
  "Para Gestores": Trophy,
  "Para TI": BookOpenText,
  "Para PMEs": UsersThree,
  "Para Enterprise": Buildings,
  "Sobre a Zopu": UsersThree,
  "Zopu vs outros parceiros": Trophy,
  "Trabalhe Conosco": Briefcase,
};

type DropdownProps = {
  label: string;
  items: readonly NavItem[];
};

function DesktopDropdown({
  label,
  items,
  comingSoon = false,
}: DropdownProps & { comingSoon?: boolean }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-4 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
        {label}
        {comingSoon && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-700 rounded">
            Em breve
          </span>
        )}
        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300 ease-out group-hover:rotate-180" />
      </button>

      {/* Dropdown Menu - Arcade style */}
      <div className="absolute top-full left-0 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100/80 py-3 min-w-72 backdrop-blur-xl">
          {items.map((item) => {
            const Icon = iconMap[item.nome] || Files;
            return comingSoon ? (
              <div
                key={item.nome}
                className="flex items-start gap-3 px-4 py-3 mx-2 opacity-40 cursor-not-allowed rounded-xl"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} weight="duotone" className="text-gray-400" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">
                    {item.nome}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {item.descricao}
                  </span>
                </div>
              </div>
            ) : (
              <Link
                key={item.nome}
                href={item.href}
                className="flex items-start gap-3 px-4 py-3 mx-2 hover:bg-gray-50 rounded-xl transition-colors duration-200 group/item"
              >
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand/10 to-brand/5 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:from-brand/20 group-hover/item:to-brand/10 transition-all duration-200">
                  <Icon size={18} weight="duotone" className="text-brand" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 text-sm group-hover/item:text-brand transition-colors duration-200">
                    {item.nome}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {item.descricao}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({
  label,
  items,
  isOpen,
  onToggle,
  onItemClick,
  comingSoon = false,
}: DropdownProps & {
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: () => void;
  comingSoon?: boolean;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl font-medium transition-all duration-200"
      >
        <span className="flex items-center gap-2">
          {label}
          {comingSoon && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-700 rounded">
              Em breve
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-300 ease-out",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="pl-2 space-y-1 py-2">
          {items.map((item) => {
            const Icon = iconMap[item.nome] || Files;
            return comingSoon ? (
              <div
                key={item.nome}
                className="flex items-center gap-3 px-4 py-3 opacity-40 cursor-not-allowed rounded-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon size={16} weight="duotone" className="text-gray-400" />
                </div>
                <div>
                  <span className="font-medium text-gray-700 text-sm">
                    {item.nome}
                  </span>
                  <span className="block text-xs text-gray-400">
                    {item.descricao}
                  </span>
                </div>
              </div>
            ) : (
              <Link
                key={item.nome}
                href={item.href}
                onClick={onItemClick}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon size={16} weight="duotone" className="text-brand" />
                </div>
                <div>
                  <span className="font-medium text-gray-700 text-sm">
                    {item.nome}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {item.descricao}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm shadow-gray-200/50 border-b border-gray-100/50"
          : "bg-white/70 backdrop-blur-md border-b border-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-zopu.png"
              alt="Zopu - Revenue Intelligence para Bitrix24"
              width={120}
              height={40}
              className="h-8 sm:h-9 w-auto"
              priority
              unoptimized={false}
            />
          </Link>

          {/* Menu Desktop - Clean spacing like Arcade */}
          <div className="hidden lg:flex items-center gap-0.5">
            <DesktopDropdown label="Soluções" items={NAVIGATION.solucoes} />
            <DesktopDropdown
              label="Como funciona"
              items={NAVIGATION.comoFunciona}
            />
            <DesktopDropdown
              label="Por que a Zopu"
              items={NAVIGATION.porQueZopu}
            />
            <DesktopDropdown
              label="Recursos"
              items={NAVIGATION.recursos}
              comingSoon
            />
          </div>

          {/* CTAs Desktop - Arcade gradient style */}
          <div className="hidden lg:flex items-center gap-3">
            {/* CTA Secundário: Teste grátis Bitrix24 */}
            <a
              href={ZOPU_LINKS.testeGratis}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Teste grátis 15 dias
            </a>
            {/* CTA Primário: Falar com especialista → WhatsApp */}
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5"
            >
              Falar com especialista
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Menu Mobile Button */}
          <button
            className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Enhanced with smoother animations */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            mobileMenuOpen ? "max-h-150 pb-6 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-1 pt-3">
            <MobileDropdown
              label="Soluções"
              items={NAVIGATION.solucoes}
              isOpen={openDropdown === "solucoes"}
              onToggle={() => toggleDropdown("solucoes")}
              onItemClick={closeMobileMenu}
            />
            <MobileDropdown
              label="Como funciona"
              items={NAVIGATION.comoFunciona}
              isOpen={openDropdown === "comoFunciona"}
              onToggle={() => toggleDropdown("comoFunciona")}
              onItemClick={closeMobileMenu}
            />
            <MobileDropdown
              label="Por que a Zopu"
              items={NAVIGATION.porQueZopu}
              isOpen={openDropdown === "porQueZopu"}
              onToggle={() => toggleDropdown("porQueZopu")}
              onItemClick={closeMobileMenu}
            />
            <MobileDropdown
              label="Recursos"
              items={NAVIGATION.recursos}
              isOpen={openDropdown === "recursos"}
              onToggle={() => toggleDropdown("recursos")}
              onItemClick={closeMobileMenu}
              comingSoon
            />

            {/* Mobile CTAs */}
            <div className="pt-5 space-y-3 px-2">
              {/* CTA Secundário: Teste grátis */}
              <a
                href={ZOPU_LINKS.testeGratis}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 text-gray-700 font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Teste grátis 15 dias
              </a>
              {/* CTA Primário: Falar com especialista → WhatsApp */}
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-200 shadow-lg shadow-brand/25"
              >
                Falar com especialista
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
