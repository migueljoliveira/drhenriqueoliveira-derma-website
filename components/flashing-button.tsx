"use client"

import type React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { FlashingEffect } from "./flashing-effect"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-[#f96c8b] text-white shadow-sm hover:bg-[#e05a79]",
        light: "bg-white text-[#2E2E2E] shadow-sm hover:bg-gray-100",
        dark: "bg-[#b8b7b6] text-white shadow-sm hover:bg-[#a09f9e]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

export function FlashingButton({ className, variant, size, asChild = false, href, ...props }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getFlashingColor = () => {
    switch (variant) {
      case "primary":
        return "#f96c8b"
      case "dark":
        return "#b8b7b6"
      default:
        return "#f96c8b"
    }
  }

  const buttonContent = (
    <FlashingEffect color={getFlashingColor()} intensity="low" interval={4} disabled={isHovered}>
      <motion.button
        className={buttonVariants({ variant, size, className })}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          outline: "none !important",
          boxShadow: "none !important",
          border: "none !important",
          borderColor: "transparent !important",
          width: "auto",
          display: "inline-flex",
        }}
        {...props}
      />
    </FlashingEffect>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus:outline-none focus:ring-0 focus:ring-offset-0"
        style={{
          outline: "none !important",
          boxShadow: "none !important",
          border: "none !important",
          borderColor: "transparent !important",
          width: "auto",
          display: "inline-block",
        }}
      >
        {buttonContent}
      </Link>
    )
  }

  return buttonContent
}
