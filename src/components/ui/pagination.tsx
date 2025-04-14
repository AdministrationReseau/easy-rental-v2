import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/utils/helpers/cn"

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul"> & {
    size?: "sm" | "default" | "lg"
  }
>(({ className, size = "default", ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-wrap items-center",
      {
        "gap-1": size === "sm",
        "gap-2": size === "default",
        "gap-3": size === "lg",
      },
      "md:gap-2",
      className
    )}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
)
PaginationItem.displayName = "PaginationItem"

const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    isActive?: boolean
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
  }
>(({ className, isActive, variant = "default", size = "default", ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "select-none transition-transform active:scale-95",
      {
        // Size variants
        "h-8 min-w-[2rem] px-3": size === "sm",
        "h-9 min-w-[2.25rem] px-4": size === "default",
        "h-10 min-w-[2.5rem] px-5": size === "lg",

        // Style variants
        "bg-background hover:bg-accent hover:text-accent-foreground": variant === "default",
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",

        // Active state
        "bg-primary text-primary-foreground pointer-events-none hover:bg-primary hover:text-primary-foreground": isActive,
      },
      className
    )}
    {...props}
  />
))
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
  }
>(({ className, variant = "ghost", size = "default", ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size={size}
    variant={variant}
    className={cn(
      "gap-1 pl-2.5 pr-3.5",
      "hidden sm:inline-flex",
      "hover:text-primary",
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
  }
>(({ className, variant = "ghost", size = "default", ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size={size}
    variant={variant}
    className={cn(
      "gap-1 pl-3.5 pr-2.5",
      "hidden sm:inline-flex",
      "hover:text-primary",
      className
    )}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
))
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center",
      "text-muted-foreground",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

// Mobile-specific components
const PaginationPreviousMobile = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
  }
>(({ className, variant = "ghost", size = "default", ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size={size}
    variant={variant}
    className={cn(
      "w-9 p-0 sm:hidden",
      "hover:text-primary",
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
))
PaginationPreviousMobile.displayName = "PaginationPreviousMobile"

const PaginationNextMobile = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
  }
>(({ className, variant = "ghost", size = "default", ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size={size}
    variant={variant}
    className={cn(
      "w-9 p-0 sm:hidden",
      "hover:text-primary",
      className
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
))
PaginationNextMobile.displayName = "PaginationNextMobile"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationPreviousMobile,
  PaginationNextMobile,
}
