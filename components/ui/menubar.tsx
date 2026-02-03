"use client"

import * as React from "react"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

// Note: Install @radix-ui/react-menubar for full functionality
// This is a simplified implementation

type MenubarProps = {
  children: React.ReactNode
  className?: string
}

type MenubarMenuProps = {
  trigger: string
  children: React.ReactNode
}

type MenubarItemProps = {
  children: React.ReactNode
  shortcut?: string
  disabled?: boolean
  onSelect?: () => void
  className?: string
}

export function Menubar({ children, className }: MenubarProps) {
  return (
    <div
      className={cn(
        "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

export function MenubarMenu({ trigger, children }: MenubarMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-default select-none items-center rounded-xs px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  )
}

export function MenubarItem({
  children,
  shortcut,
  disabled,
  onSelect,
  className,
}: MenubarItemProps) {
  return (
    <div
      onClick={!disabled ? onSelect : undefined}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-auto text-xs tracking-widest opacity-60">
          {shortcut}
        </span>
      )}
    </div>
  )
}

export function MenubarSeparator() {
  return <div className="mx-1 my-1 h-px bg-border" />
}

export function MenubarCheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
  className,
}: {
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}) {
  return (
    <div
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <span className="mr-2 h-4 w-4 flex items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
}

export function MenubarSubMenu({
  trigger,
  children,
}: {
  trigger: string
  children: React.ReactNode
}) {
  return (
    <div className="relative group">
      <div className="flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
        <span className="flex-1">{trigger}</span>
        <ChevronRight className="ml-auto h-4 w-4" />
      </div>
    </div>
  )
}
