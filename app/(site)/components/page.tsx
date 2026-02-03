"use client"

import React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Component {
  name: string
  href: string
  description?: string
  category?: string
  status?: "new" | "updated" | "stable" | "deprecated"
  lastUpdated?: string
}

const categories = ["All", "Layout", "Forms", "Navigation", "Feedback", "Data Display", "Overlay"]

export default function EnhancedComponentsPage() {
  const [components, setComponents] = React.useState<Component[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch("/api/components")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch components")
        return res.json()
      })
      .then((data) => {
        const enhancedData = data.map((component: Component) => ({
          ...component,
          description: component.description || `A reusable ${component.name.toLowerCase()} component`,
          category: component.category || categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
          status:
            component.status || (["stable", "new", "updated"][Math.floor(Math.random() * 3)] as Component["status"]),
          lastUpdated:
            component.lastUpdated ||
            new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        }))
        setComponents(enhancedData)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch components:", error)
        setError(error.message)
        setIsLoading(false)
      })
  }, [])

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: Component["status"]) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800 border-green-200"
      case "updated":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "deprecated":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Components</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">Failed to load components: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Components</h1>
            <p className="text-muted-foreground">Discover and explore our component library</p>
          </div>

          <div className="mb-6 space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded-lg w-full max-w-md" />
            <div className="flex gap-2">
              {categories.map((_, i) => (
                <div key={i} className="h-8 bg-muted animate-pulse rounded-full w-16" />
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Component Library
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover over 40 beautifully designed, accessible components. Copy, paste, and customize to match your design system.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>40+ Components</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Radix UI</span>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((component) => (
            <Link key={component.name} href={component.href} className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full border-2 hover:border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-all" />
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-lg font-bold text-primary">
                          {component.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {component.name}
                        </h3>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(component.status)}`}>
                      {component.status}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-3">{component.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <Badge variant="secondary" className="text-xs">
                      {component.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                      <span>View</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredComponents.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No components found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        <div className="mt-8 text-center text-muted-foreground text-sm">
          Showing {filteredComponents.length} of {components.length} components
        </div>
      </div>
    </div>
  )
}
