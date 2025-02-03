"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Urbanist } from "next/font/google"
import { ArrowRightIcon, Menu, Loader2, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { User } from "@supabase/supabase-js"
import { useAuth } from "@/contexts/AuthContext"
import { signOut } from "@/app/actions/auth"
import type { Category } from "@prisma/client"
import Logo from "../Logo"
import SearchBar from "../ux/search-bar"
import Cart from "./Cart"


const urbanist = Urbanist({ subsets: ["latin"] })

const Navbar = ({
  user: initialUser,
  isAdmin: initialIsAdmin,
  lists,
  userIcon: initialUserIcon,
}: {
  user: User | null
  isAdmin: boolean
  lists: Category[]
  userIcon?: string | null
}) => {
  const { user: authUser } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  React.useEffect(() => {
    if (authUser?.id !== initialUser?.id) {
      router.refresh()
    }
  }, [authUser, initialUser, router])

  const isAuthenticated = Boolean(initialUser)

  return (
    <nav

    className="sticky py-4 top-0 z-50 border-b-0 container mx-auto flex h-16 items-center justify-between backdrop-blur-sm px-4 md:px-20 bg-background/50"
    
    >

        <div className="flex items-center gap-4">
          <Logo />
          <ul className="hidden lg:flex items-center gap-4">
            {lists.slice(0, 2).map((list) => (
              <li key={list.id}>
                <Link
                  href={`/${encodeURIComponent(list.id)}`}
                  className={cn(
                    "text-zinc-900 tracking-tight text-sm capitalize",
                    pathname === `/${encodeURIComponent(list.id)}` ? "font-semibold" : "font-normal",
                  )}
                >
                  {list.name}
                </Link>
              </li>
            ))}
          </ul>
          <span className="max-w-24 md:max-w-full">
          <SearchBar />
          </span>
        </div>

        <div className="flex items-center gap-4">
    
   
          <Cart />
          {!isAuthenticated ? (
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-zinc-900")}>
              Login
              <LogIn className="ml-1.5 h-5 w-5" />
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full w-9 h-9 ring-0">
                {initialUser === undefined ? (
                  <Loader2 className="h-9 w-9 animate-spin text-muted-foreground" />
                ) : (
                  <img
                    src={initialUserIcon || "/Logo.svg"}
                    alt="user icon"
                    className="w-9 h-9 rounded-full hover:ring-4 transition-all"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={10} className={cn(urbanist.className, "me-6 2xl:me-0")}>
                {initialIsAdmin && (
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full flex items-center">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Link href="/my-page" className="w-full flex items-center">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Sheet>
            <SheetTrigger className={cn(buttonVariants({ size: "sm", variant: "ghost" }), "lg:hidden")}>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className={cn(urbanist.className, "flex flex-col space-y-4")}>
              <SheetHeader>
                <ul className="flex flex-col items-start space-y-4">
                  {lists.map((list) => (
                    <li key={list.id}>
                      <Link
                        href={`/${encodeURIComponent(list.id)}`}
                        className={cn(
                          "text-zinc-900 tracking-tight text-sm capitalize",
                          pathname === `/${encodeURIComponent(list.id)}` ? "font-semibold" : "font-normal",
                        )}
                      >
                        {list.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SheetHeader>
              {!isAuthenticated && (
                <SheetFooter>
                  <Link href="/login" className="text-zinc-900 tracking-wide">
                    Login
                    <ArrowRightIcon className="ml-1.5 h-5 w-5" />
                  </Link>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>

    </nav>
  )
}

export default Navbar

