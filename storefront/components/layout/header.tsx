'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn, Zap } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

interface Collection {
  id: string
  handle: string
  title: string
}

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuCloseRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-background/60 backdrop-blur-md border-b border-border/40'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden text-foreground hover:text-accent transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="relative grid place-items-center h-8 w-8 rounded-md border border-accent/40 bg-accent/5">
                <Zap className="h-4 w-4 text-accent" strokeWidth={2.5} />
                <span className="absolute inset-0 rounded-md bg-accent/0 group-hover:bg-accent/10 transition-colors" />
              </span>
              <span className="font-heading text-xl font-bold tracking-[0.2em] text-foreground">
                VOLTA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              <Link href="/products" className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors link-underline py-1" prefetch={true}>
                Shop All
              </Link>
              {collections?.slice(0, 5).map((collection: Collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors link-underline py-1"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/search"
                className="p-2.5 text-muted-foreground hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 text-muted-foreground hover:text-accent transition-colors hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-muted-foreground hover:text-accent transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background border-r border-border animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-7 w-7 rounded-md border border-accent/40 bg-accent/5">
                  <Zap className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                </span>
                <span className="font-heading text-lg font-bold tracking-[0.2em]">VOLTA</span>
              </div>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-base tracking-wide border-b border-border/50"
                prefetch={true}
              >
                Shop All
              </Link>
              {collections?.map((collection: Collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-base tracking-wide border-b border-border/50"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
              <div className="pt-4 space-y-1">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-sm text-muted-foreground"
                >
                  {isLoggedIn ? 'Account' : 'Sign In'}
                </Link>
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-sm text-muted-foreground"
                >
                  Search
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
