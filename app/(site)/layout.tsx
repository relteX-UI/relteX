"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { Github, Menu, X } from 'lucide-react';
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="fixed top-4 left-4 right-4 z-50">
          <div className="mx-auto max-w-6xl bg-transparent border-transparent rounded-full">
            <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
              <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold">
                <div className="w-6 h-6 md:w-7 md:h-7 bg-muted rounded" />
                <span className="hidden sm:inline">RelteX UI</span>
                <span className="sm:hidden">RelteX</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-[200px]" />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 pt-24 md:pt-32">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-50">
        <div className={`mx-auto max-w-6xl rounded-2xl md:rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border shadow-lg hover:shadow-xl' 
            : 'bg-transparent border-transparent'
        }`}>
          <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold hover:opacity-80 transition-opacity">
              <Image
                src={resolvedTheme === 'dark' ? '/logo-r.png' : '/r.svg'}
                alt="RelteX UI Logo"
                width={28}
                height={28}
                className="rounded md:w-9 md:h-9"
              />
              <span className="hidden sm:inline">RelteX UI</span>
              <span className="sm:hidden">RelteX</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <CommandMenu />
              <nav className="flex items-center gap-3">
                <a
                  href="/docs"
                  className="text-sm font-medium hover:text-primary transition-colors px-4 py-2.5 rounded-full hover:bg-muted/50"
                >
                  Documentation
                </a>
                <a
                  href="https://github.com/reltex-org/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full hover:bg-muted/50"
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden lg:inline">GitHub</span>
                </a>
                <ModeToggle />
              </nav>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center gap-2">
              <ModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-muted/50 rounded-full transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur-md rounded-b-2xl">
              <nav className="flex flex-col p-4 space-y-2">
                <div className="mb-2">
                  <CommandMenu />
                </div>
                <a
                  href="/docs"
                  className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documentation
                </a>
                <a
                  href="https://github.com/reltex-org/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 pt-24 md:pt-32">{children}</main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} relteX UI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
