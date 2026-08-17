'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

import { isNavActive, NAV_ITEMS } from './nav-items'

const BAR_HREFS = new Set<string>(['/app', '/app/transactions', '/app/wallets'])

export default function MobileBottomBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeSheet = () => setOpen(false)

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close on ESC.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const barItems = NAV_ITEMS.filter((n) => BAR_HREFS.has(n.href))
  const moreItems = NAV_ITEMS.filter((n) => !BAR_HREFS.has(n.href))
  const moreActive =
    open || moreItems.some((m) => isNavActive(pathname, m.href, m.exact))

  return (
    <>
      {/* Sheet */}
      <div
        aria-hidden={!open}
        className={
          'lg:hidden fixed inset-x-0 bottom-0 z-50 pointer-events-none'
        }
      >
        <div
          onClick={() => setOpen(false)}
          className={
            'absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-200 ' +
            (open ? 'opacity-100' : 'opacity-0')
          }
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="More navigation"
          className={
            'absolute inset-x-3 bottom-[88px] bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant rounded-2xl shadow-2xl transition-all duration-200 ease-out origin-bottom ' +
            (open
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none')
          }
        >
          {/* Grab handle */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full bg-outline-variant/40" />
          </div>
          <div className="px-2 pb-2">
            <div className="px-3 py-2 text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
              More
            </div>
            <ul className="flex flex-col">
              {moreItems.map(({ href, label, icon: Icon, exact }) => {
                const active = isNavActive(pathname, href, exact)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      onClick={closeSheet}
                      className={
                        'flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors ' +
                        (active
                          ? 'bg-primary/10 text-primary'
                          : 'text-on-surface hover:bg-surface-container')
                      }
                    >
                      <Icon
                        className="w-5 h-5 shrink-0"
                        strokeWidth={active ? 2 : 1.75}
                      />
                      <span className="font-medium">{label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bar */}
      <nav
        className="lg:hidden fixed bottom-3 inset-x-3 z-40 bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant rounded-2xl shadow-2xl"
        aria-label="Primary navigation"
      >
        <ul className="flex items-stretch justify-between px-2 py-1.5">
          {barItems.map(({ href, label, short, icon: Icon, exact }) => {
            const active = isNavActive(pathname, href, exact)
            return (
              <li key={href} className="flex-1 min-w-0">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  aria-label={label}
                  title={label}
                  onClick={closeSheet}
                  className={
                    'h-14 mx-1 flex flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold tracking-[0.05em] uppercase transition-colors ' +
                    (active
                      ? 'bg-primary/10 text-primary'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface')
                  }
                >
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                  <span className="truncate max-w-[64px]">{short}</span>
                </Link>
              </li>
            )
          })}
          <li className="flex-1 min-w-0">
            <button
              type="button"
              aria-label="More"
              aria-expanded={open}
              aria-controls="mobile-more-sheet"
              onClick={() => setOpen((v) => !v)}
              className={
                'h-14 mx-1 w-[calc(100%-0.5rem)] flex flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold tracking-[0.05em] uppercase transition-colors ' +
                (moreActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface')
              }
            >
              <MoreHorizontal
                className="w-5 h-5"
                strokeWidth={moreActive ? 2.25 : 1.75}
              />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
