import { ComponentPreview } from "@/components/docs/component-preview";

export default function ToastPage() {
  return (
    <ComponentPreview
      name="Toast"
      description="A customizable toast notification component with multiple variants and auto-dismiss functionality."
      examples={[
  {
    "title": "Default Toast",
    "value": "default",
    "content": "import { useToast } from \"@/components/ui/toast\";\nimport { Button } from \"@/components/ui/button\";\n\nexport default function ToastDemo() {\n  const { addToast } = useToast();\n\n  return (\n    <Button\n      onClick={() => {\n        addToast({\n          title: \"Notification\",\n          description: \"This is a default toast notification.\",\n        });\n      }}\n    >\n      Show Toast\n    </Button>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Variants",
    "value": "variants",
    "content": "import { useToast } from \"@/components/ui/toast\";\nimport { Button } from \"@/components/ui/button\";\n\nexport default function ToastVariants() {\n  const { addToast } = useToast();\n\n  return (\n    <div className=\"flex flex-col gap-4\">\n      <Button\n        onClick={() => {\n          addToast({\n            title: \"Success\",\n            description: \"Your changes have been saved.\",\n            variant: \"success\",\n          });\n        }}\n      >\n        Success Toast\n      </Button>\n      <Button\n        variant=\"destructive\"\n        onClick={() => {\n          addToast({\n            title: \"Error\",\n            description: \"Something went wrong.\",\n            variant: \"destructive\",\n          });\n        }}\n      >\n        Error Toast\n      </Button>\n    </div>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "With Action",
    "value": "action",
    "content": "import { useToast } from \"@/components/ui/toast\";\nimport { Button } from \"@/components/ui/button\";\n\nexport default function ToastWithAction() {\n  const { addToast } = useToast();\n\n  return (\n    <Button\n      onClick={() => {\n        addToast({\n          title: \"Update Available\",\n          description: \"A new version is available.\",\n          action: <Button size=\"sm\" variant=\"outline\">Update</Button>,\n        });\n      }}\n    >\n      Show Toast with Action\n    </Button>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: VariantProps<typeof toastVariants>["variant"]
  duration?: number
  onClose?: () => void
}

type ToastContextType = {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => string
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { ...toast, id }])

    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }

    return id
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastViewport() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function Toast({
  title,
  description,
  action,
  variant,
  onClose,
}: ToastProps) {
  return (
    <div className={cn(toastVariants({ variant }))}>
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
      {action}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

export { Toast, ToastViewport }`}
    />
  );
}
