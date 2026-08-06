'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogOut } from 'lucide-react';

import { isNavActive, NAV_ITEMS } from './nav-items';
import LogoutDialog from './LogoutDialog';
import AuthService from '@/services/AuthService';

export default function Sidebar() {
   const pathname = usePathname();
   const [showLogout, setShowLogout] = useState(false);

   const handleConfirm = async () => {
      setShowLogout(false);
      await AuthService.logout();
      window.location.href = '/login';
   };

   return (
      <>
         <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-outline-variant/10 bg-surface-container-lowest fixed inset-y-0 left-0 z-40" aria-label="Primary navigation">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-outline-variant/10">
               <Link href="/" className="text-xl font-bold text-on-surface tracking-tight hover:opacity-90 transition-opacity">
                  Onreco
               </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-6 overflow-y-auto">
               <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
                     const active = isNavActive(pathname, href, exact);
                     return (
                        <li key={href}>
                           <Link
                              href={href}
                              aria-current={active ? 'page' : undefined}
                              className={
                                 'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ' +
                                 (active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface-variant border border-transparent hover:bg-surface-container hover:text-on-surface')
                              }
                           >
                              <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2 : 1.75} />
                              <span className="font-medium">{label}</span>
                           </Link>
                        </li>
                     );
                  })}
               </ul>
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-outline-variant/10">
               <button
                  type="button"
                  onClick={() => setShowLogout(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-tertiary-container/10 hover:text-tertiary transition-colors"
               >
                  <LogOut className="w-4.5 h-4.5" strokeWidth={1.75} />
                  <span className="font-medium">Sign Out</span>
               </button>
               <div className="mt-3 px-3 text-[10px] font-semibold tracking-[0.08em] uppercase text-outline">v1.5 &middot; Onreco</div>
            </div>
         </aside>

         <LogoutDialog open={showLogout} onOpenChange={setShowLogout} onConfirm={handleConfirm} />
      </>
   );
}
