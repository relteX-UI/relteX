"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

const GITHUB_REPO_URL = "https://api.github.com/repos/relteX";
const GITHUB_URL = "https://github.com/jeccoman/relteX";
const SHADCN_UI_URL = "https://ui.shadcn.com";

export default function HomePage() {
  const [githubStars, setGithubStars] = useState(0);
  const [displayStars, setDisplayStars] = useState(0);

  const fetchGithubStars = async () => {
    try {
      const response = await fetch(GITHUB_REPO_URL);
      const data = await response.json();
      setGithubStars(data.stargazers_count || 0);
    } catch (error) {
      console.error("Failed to fetch GitHub stars", error);
      setGithubStars(0);
    }
  };

  useEffect(() => {
    fetchGithubStars();
  }, []);

  useEffect(() => {
    if (displayStars < githubStars) {
      const timeout = setTimeout(() => {
        setDisplayStars((prev) => {
          const increment = Math.ceil((githubStars - prev) / 10);
          return Math.min(prev + increment, githubStars);
        });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayStars, githubStars]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with subtle background */}
      <section className="relative w-full py-24 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
         <BackgroundBeams
          intensity="medium"
          colorScheme="ocean"
          speed="slow"
          density="normal"
          particles
          layers={2}
          audioReactive
        />
        </motion.div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <div className="relative group">
                  <MovingBorderButton
                    borderRadius="1.75rem"
                    containerClassName="w-auto"
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors group-hover:animate-pulse mr-2 ml-4"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span className="font-semibold tracking-wide mr-4">
                        {displayStars.toLocaleString()} STARS ON GITHUB
                      </span>
                    </div>
                  </MovingBorderButton>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                </div>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-primary">Beautiful React</span>{" "}
                components for your next app
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                RelteX provides a comprehensive suite of customizable,
                accessible, and platform-adaptive components to help you build
                better mobile and web applications faster.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mt-10 justify-center"
            >
              <Button size="lg" asChild>
                <a href="/docs">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/components">Browse Components</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-20 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose RelteX?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Built with modern React best practices and designed for developers who care about quality
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Customizable",
                  description: "Full control over styling and behavior. Modify components to match your design system.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                    />
                  ),
                },
                {
                  title: "Accessible",
                  description: "Built with accessibility in mind. ARIA compliant with keyboard navigation support.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  ),
                },
                {
                  title: "Type-Safe",
                  description: "Written in TypeScript with full type definitions for better developer experience.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                  ),
                },
                {
                  title: "Copy & Paste",
                  description: "No package bloat. Copy the code you need and own it completely.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  ),
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-primary"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full py-16 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Components", value: "40+" },
                { label: "GitHub Stars", value: displayStars.toLocaleString() },
                { label: "Weekly Downloads", value: "Coming Soon" },
                { label: "Contributors", value: "Growing" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="relative w-full py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Started in Seconds
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Copy, paste, and customize. It&apos;s that simple.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-900 dark:bg-slate-950 rounded-xl p-6 md:p-8 border border-gray-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400 font-mono">example.tsx</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(`import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  )
}`);
                  }}
                >
                  Copy
                </Button>
              </div>
              <pre className="text-sm md:text-base overflow-x-auto">
                <code className="text-gray-300 font-mono">
                  <span className="text-purple-400">import</span> {"{"}{" "}
                  <span className="text-blue-300">Button</span> {"}"}{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-300">&quot;@/components/ui/button&quot;</span>
                  {"\n\n"}
                  <span className="text-purple-400">export default function</span>{" "}
                  <span className="text-yellow-300">Example</span>() {"{"}
                  {"\n  "}
                  <span className="text-purple-400">return</span> ({"\n    "}
                  <span className="text-blue-300">&lt;Button</span>{" "}
                  <span className="text-yellow-300">variant</span>=
                  <span className="text-green-300">&quot;default&quot;</span>{" "}
                  <span className="text-yellow-300">size</span>=
                  <span className="text-green-300">&quot;lg&quot;</span>
                  <span className="text-blue-300">&gt;</span>
                  {"\n      "}Click me{"\n    "}
                  <span className="text-blue-300">&lt;/Button&gt;</span>
                  {"\n  "}){"\n"}
                  {"}"}
                </code>
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Button asChild size="lg">
                <a href="/docs/installation">View Installation Guide</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Component Preview Grid */}
      <section className="relative w-full py-20 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Beautiful Components
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A growing collection of over 40 components, built with Radix UI and Tailwind CSS
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Button", new: false },
                { name: "Card", new: false },
                { name: "Dialog", new: false },
                { name: "Input", new: false },
                { name: "Select", new: false },
                { name: "Tabs", new: false },
                { name: "Dropdown", new: false },
                { name: "Badge", new: false },
                { name: "Avatar", new: false },
                { name: "Accordion", new: false },
                { name: "Alert", new: false },
                { name: "Checkbox", new: false },
                { name: "Toast", new: true },
                { name: "Context Menu", new: true },
                { name: "Menubar", new: true },
              ].map((component, index) => (
                <motion.a
                  key={component.name}
                  href={`/docs/components/${component.name.toLowerCase().replace(" ", "-")}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors cursor-pointer group block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {component.name}
                      </span>
                      {component.new && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                          NEW
                        </span>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 text-center"
            >
              <Button asChild size="lg" variant="outline">
                <a href="/components">View All Components</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* React Developer Resources */}
      <section className="relative w-full py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                For React Developers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to build modern React applications
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "React 19 Ready",
                  description: "Built with the latest React features including Server Components and Actions",
                  link: "/docs",
                  linkText: "Learn More",
                },
                {
                  title: "Next.js Integration",
                  description: "Seamlessly integrates with Next.js 15, App Router, and server-side rendering",
                  link: "/docs/installation",
                  linkText: "Get Started",
                },
                {
                  title: "Full Documentation",
                  description: "Comprehensive guides, examples, and API references for every component",
                  link: "/docs",
                  linkText: "View Docs",
                },
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
                >
                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {resource.description}
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <a href={resource.link} className="inline-flex items-center gap-2">
                      {resource.linkText}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="relative w-full py-20 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Open Source Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                RelteX is an open-source project inspired by shadcn/ui,
                bringing its design principles to React. We leverage
                shadcn&apos;s registry while adapting components for React
                applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                  <h3 className="text-xl font-bold">Philosophy</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Like shadcn/ui, we&apos;re not a component library you install
                  from npm. Instead, we provide a collection of reusable
                  components that you can copy and customize for your React
                  applications.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                  </svg>
                  <h3 className="text-xl font-bold">Contribute</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Join our community of developers building beautiful React
                  interfaces. Your contributions help make development better
                  for everyone.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.278 9.52 21.017C9.52 20.783 9.512 20.067 9.508 19.192C6.726 19.826 6.139 17.949 6.139 17.949C5.685 16.811 5.028 16.509 5.028 16.509C4.128 15.88 5.095 15.893 5.095 15.893C6.092 15.962 6.626 16.926 6.626 16.926C7.521 18.437 8.97 18.005 9.54 17.752C9.631 17.091 9.889 16.659 10.175 16.419C7.955 16.177 5.62 15.312 5.62 11.449C5.62 10.301 6.01 9.363 6.646 8.631C6.545 8.381 6.2 7.429 6.747 6.075C6.747 6.075 7.587 5.813 9.497 7.085C10.293 6.869 11.152 6.76 12.002 6.757C12.852 6.76 13.71 6.869 14.507 7.085C16.417 5.813 17.255 6.075 17.255 6.075C17.803 7.429 17.458 8.381 17.357 8.631C17.994 9.363 18.38 10.301 18.38 11.449C18.38 15.322 16.042 16.174 13.815 16.411C14.172 16.705 14.492 17.287 14.492 18.175C14.492 19.453 14.478 20.702 14.478 21.017C14.478 21.281 14.654 21.587 15.162 21.486C19.133 20.161 22 16.415 22 12C22 6.477 17.523 2 12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    Contribute on GitHub
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <a
                href={SHADCN_UI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Inspired by shadcn/ui
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}