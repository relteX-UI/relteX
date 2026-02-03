import { ComponentPreview } from "@/components/docs/component-preview";

export default function MenubarPage() {
  return (
    <ComponentPreview
      name="Menubar"
      description="An application menubar component with support for multiple menus, items, shortcuts, checkboxes, and separators."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import {\n  Menubar,\n  MenubarMenu,\n  MenubarItem,\n  MenubarSeparator,\n} from \"@/components/ui/menubar\";\n\nexport default function MenubarDemo() {\n  return (\n    <Menubar>\n      <MenubarMenu trigger=\"File\">\n        <MenubarItem shortcut=\"⌘N\">New File</MenubarItem>\n        <MenubarItem shortcut=\"⌘O\">Open File</MenubarItem>\n        <MenubarSeparator />\n        <MenubarItem shortcut=\"⌘S\">Save</MenubarItem>\n        <MenubarItem shortcut=\"⌘⇧S\">Save As...</MenubarItem>\n      </MenubarMenu>\n      <MenubarMenu trigger=\"Edit\">\n        <MenubarItem shortcut=\"⌘Z\">Undo</MenubarItem>\n        <MenubarItem shortcut=\"⌘⇧Z\">Redo</MenubarItem>\n        <MenubarSeparator />\n        <MenubarItem shortcut=\"⌘X\">Cut</MenubarItem>\n        <MenubarItem shortcut=\"⌘C\">Copy</MenubarItem>\n        <MenubarItem shortcut=\"⌘V\">Paste</MenubarItem>\n      </MenubarMenu>\n    </Menubar>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "With Checkboxes",
    "value": "checkboxes",
    "content": "import {\n  Menubar,\n  MenubarMenu,\n  MenubarItem,\n  MenubarCheckboxItem,\n  MenubarSeparator,\n} from \"@/components/ui/menubar\";\nimport { useState } from \"react\";\n\nexport default function MenubarCheckboxes() {\n  const [showStatusBar, setShowStatusBar] = useState(true);\n  const [showActivityBar, setShowActivityBar] = useState(false);\n  const [showPanel, setShowPanel] = useState(true);\n\n  return (\n    <Menubar>\n      <MenubarMenu trigger=\"View\">\n        <MenubarCheckboxItem\n          checked={showStatusBar}\n          onCheckedChange={setShowStatusBar}\n        >\n          Status Bar\n        </MenubarCheckboxItem>\n        <MenubarCheckboxItem\n          checked={showActivityBar}\n          onCheckedChange={setShowActivityBar}\n        >\n          Activity Bar\n        </MenubarCheckboxItem>\n        <MenubarCheckboxItem\n          checked={showPanel}\n          onCheckedChange={setShowPanel}\n        >\n          Panel\n        </MenubarCheckboxItem>\n        <MenubarSeparator />\n        <MenubarItem shortcut=\"⌃⌘F\">Full Screen</MenubarItem>\n      </MenubarMenu>\n    </Menubar>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Multiple Menus",
    "value": "multiple",
    "content": "import {\n  Menubar,\n  MenubarMenu,\n  MenubarItem,\n  MenubarSeparator,\n} from \"@/components/ui/menubar\";\n\nexport default function MenubarMultiple() {\n  return (\n    <Menubar>\n      <MenubarMenu trigger=\"File\">\n        <MenubarItem>New Tab</MenubarItem>\n        <MenubarItem>New Window</MenubarItem>\n        <MenubarSeparator />\n        <MenubarItem>Close</MenubarItem>\n      </MenubarMenu>\n      <MenubarMenu trigger=\"Edit\">\n        <MenubarItem>Undo</MenubarItem>\n        <MenubarItem>Redo</MenubarItem>\n      </MenubarMenu>\n      <MenubarMenu trigger=\"View\">\n        <MenubarItem>Zoom In</MenubarItem>\n        <MenubarItem>Zoom Out</MenubarItem>\n      </MenubarMenu>\n      <MenubarMenu trigger=\"Help\">\n        <MenubarItem>Documentation</MenubarItem>\n        <MenubarItem>About</MenubarItem>\n      </MenubarMenu>\n    </Menubar>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`"use client"

import * as React from "react"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

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
}`}
    />
  );
}
