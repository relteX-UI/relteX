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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Components</h1>
          <p className="text-muted-foreground text-lg">Discover and explore our comprehensive component library</p>
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((component) => (
            <Link key={component.name} href={component.href}>
              <Card className="p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1 h-full">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{component.name}</h3>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(component.status)}`}>
                      {component.status}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-2">{component.description}</p>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {component.category}
                    </Badge>
                    <span className="text-muted-foreground text-xs">{component.lastUpdated}</span>
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
