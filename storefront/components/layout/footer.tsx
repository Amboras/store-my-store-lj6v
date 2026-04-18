'use client'

import Link from 'next/link'
import { Zap, Instagram, Twitter, Youtube, Github } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Audio', href: '/collections/audio' },
    { label: 'Smartwatches', href: '/collections/smartwatches' },
    { label: 'Laptops', href: '/collections/laptops' },
    { label: 'Smartphones', href: '/collections/smartphones' },
    { label: 'Gaming', href: '/collections/gaming' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Order Tracking', href: '/account/orders' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'About', href: '/about' },
  ]
  if (policies?.privacy_policy) companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy) companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  if (policies?.cookie_policy) companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Top glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="container-custom py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="grid place-items-center h-9 w-9 rounded-md border border-accent/40 bg-accent/5">
                <Zap className="h-4 w-4 text-accent" strokeWidth={2.5} />
              </span>
              <span className="font-heading text-2xl font-bold tracking-[0.2em]">VOLTA</span>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Premium tech engineered for what comes next. Smartphones, laptops, smartwatches, audio and gaming — made to outlast the hype cycle.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Github, label: 'GitHub' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid place-items-center h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground mb-4">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VOLTA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              Manage Cookies
            </button>
            <span className="text-xs text-muted-foreground">Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
