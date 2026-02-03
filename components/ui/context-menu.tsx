"use client"

import * as React from "react"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

// Note: Install @radix-ui/react-context-menu for full functionality
// For now, this is a placeholder structure

type ContextMenuProps = {
  children: React.ReactNode
  items: ContextMenuItem[]
}

type ContextMenuItem = {
  type?: "item" | "separator" | "sub"
  label?: string
  shortcut?: string
  icon?: React.ReactNode
  disabled?: boolean
  checked?: boolean
  onSelect?: () => void
  items?: ContextMenuItem[]
}

export function ContextMenu({ children, items }: ContextMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const menuRef = React.useRef<HTMLDivElement>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
  }

  React.useEffect(() => {
    const handleClick = () => setIsOpen(false)
    const handleScroll = () => setIsOpen(false)

    if (isOpen) {
      document.addEventListener("click", handleClick)
      document.addEventListener("scroll", handleScroll)
    }

    return () => {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          style={{ left: position.x, top: position.y }}
        >
          {items.map((item, index) => (
            <ContextMenuItemComponent key={index} item={item} />
          ))}
        </div>
      )}
    </>
  )
}

function ContextMenuItemComponent({ item }: { item: ContextMenuItem }) {
  if (item.type === "separator") {
    return <div className="mx-1 my-1 h-px bg-border" />
  }

  if (item.type === "sub") {
    return (
      <div className="relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        <ChevronRight className="ml-auto h-4 w-4" />
      </div>
    )
  }

  return (
    <div
      onClick={item.onSelect}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      {item.checked !== undefined && (
        <span className="mr-2 h-4 w-4">
          {item.checked && <Check className="h-4 w-4" />}
        </span>
      )}
      {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
      <span className="flex-1">{item.label}</span>
      {item.shortcut && (
        <span className="ml-auto text-xs tracking-widest opacity-60">
          {item.shortcut}
        </span>
      )}
    </div>
  )
}

export { ContextMenuItemComponent as ContextMenuItem }
