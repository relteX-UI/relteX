"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Zap, Shield } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="space-y-6 mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          Documentation
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          Build faster with RelteX
        </h1>
        <p className="text-muted-foreground text-xl max-w-3xl">
          A comprehensive collection of beautifully designed, accessible React components.
          Built with Radix UI, Tailwind CSS, and TypeScript.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-16">
        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">TypeScript First</h3>
          <p className="text-muted-foreground">
            Full TypeScript support with comprehensive type definitions for the best developer experience.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Accessible by Default</h3>
          <p className="text-muted-foreground">
            Built with accessibility in mind. ARIA compliant with keyboard navigation and screen reader support.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
            <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
          <p className="text-muted-foreground">
            Own the code. Copy components into your project and customize them to match your design system.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
          <p className="text-muted-foreground">
            Built with Next.js 15, React 19, Radix UI primitives, and styled with Tailwind CSS.
          </p>
        </div>
      </div>

      <div className="my-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Introduction</h2>
          <p className="text-muted-foreground leading-7 text-lg">
            RelteX is an open-source UI component library inspired by shadcn/ui&apos;s philosophy.
            We provide a comprehensive set of customizable, accessible components for building modern React applications.
          </p>
          <p className="text-muted-foreground leading-7 text-lg">
            Unlike traditional component libraries, RelteX is designed to be copied into your project.
            This gives you complete control over the code and styling, allowing you to adapt components to your specific needs.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Philosophy</h2>
          <p className="text-muted-foreground leading-7 text-lg">
            Like shadcn/ui, relteX is not a traditional component library you install from npm.
            Instead, we provide a collection of reusable components that you can copy and customize for your React applications.
          </p>
          <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg mt-4">
            <p className="text-sm font-medium mb-2">Why this approach?</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
              <li>Complete ownership of your code</li>
              <li>No dependency updates or breaking changes</li>
              <li>Customize components without fighting the library</li>
              <li>Learn by reading and modifying the source</li>
              <li>No bundler configuration required</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Framework</h4>
              <p className="text-sm text-muted-foreground">Next.js 15 with App Router</p>
            </div>
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">React</h4>
              <p className="text-sm text-muted-foreground">React 19 with Server Components</p>
            </div>
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Styling</h4>
              <p className="text-sm text-muted-foreground">Tailwind CSS 4</p>
            </div>
            <div className="p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Components</h4>
              <p className="text-sm text-muted-foreground">Radix UI Primitives</p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Get Started</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/docs/installation"
              className="group relative overflow-hidden rounded-xl border p-8 hover:shadow-lg transition-all hover:border-primary/50 bg-gradient-to-br from-background to-muted/20"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Installation</h3>
                  <p className="text-muted-foreground">
                    Set up your project and start building with RelteX components in minutes.
                  </p>
                </div>
                <div className="flex items-center text-primary font-medium">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
            <Link
              href="/components"
              className="group relative overflow-hidden rounded-xl border p-8 hover:shadow-lg transition-all hover:border-primary/50 bg-gradient-to-br from-background to-muted/20"
            >
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Browse Components</h3>
                  <p className="text-muted-foreground">
                    Explore our collection of 40+ professionally designed components.
                  </p>
                </div>
                <div className="flex items-center text-primary font-medium">
                  View Library
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 p-8 rounded-xl border bg-muted/30">
        <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
        <p className="text-muted-foreground mb-6">
          Join our community, report issues, or contribute to the project on GitHub.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://github.com/jeccoman/relteX"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.278 9.52 21.017C9.52 20.783 9.512 20.067 9.508 19.192C6.726 19.826 6.139 17.949 6.139 17.949C5.685 16.811 5.028 16.509 5.028 16.509C4.128 15.88 5.095 15.893 5.095 15.893C6.092 15.962 6.626 16.926 6.626 16.926C7.521 18.437 8.97 18.005 9.54 17.752C9.631 17.091 9.889 16.659 10.175 16.419C7.955 16.177 5.62 15.312 5.62 11.449C5.62 10.301 6.01 9.363 6.646 8.631C6.545 8.381 6.2 7.429 6.747 6.075C6.747 6.075 7.587 5.813 9.497 7.085C10.293 6.869 11.152 6.76 12.002 6.757C12.852 6.76 13.71 6.869 14.507 7.085C16.417 5.813 17.255 6.075 17.255 6.075C17.803 7.429 17.458 8.381 17.357 8.631C17.994 9.363 18.38 10.301 18.38 11.449C18.38 15.322 16.042 16.174 13.815 16.411C14.172 16.705 14.492 17.287 14.492 18.175C14.492 19.453 14.478 20.702 14.478 21.017C14.478 21.281 14.654 21.587 15.162 21.486C19.133 20.161 22 16.415 22 12C22 6.477 17.523 2 12 2Z" />
            </svg>
            View on GitHub
          </Link>
          <Link
            href="/docs/installation"
            className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent transition-colors font-medium"
          >
            Read Documentation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}