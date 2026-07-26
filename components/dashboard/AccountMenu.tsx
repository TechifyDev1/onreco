'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react';

import { useUserProfileStore } from '@/providers/user-profile-store';
import LogoutDialog from './LogoutDialog';
import AuthService from '@/services/AuthService';

function getInitials(firstName?: string, lastName?: string): string {
   return ((firstName?.[0] ?? '') + (lastName?.[0] ?? '')).toUpperCase() || 'U';
}

export default function AccountMenu() {
   const [open, setOpen] = useState(false);
   const [showLogout, setShowLogout] = useState(false);
   const ref = useRef<HTMLDivElement>(null);
   const { userProfile } = useUserProfileStore();

   const initials = getInitials(userProfile?.firstName, userProfile?.lastName);
   const fullName = [userProfile?.firstName, userProfile?.lastName].filter(Boolean).join(' ') || 'User';
   const email = userProfile?.email ?? '';

   useEffect(() => {
      if (!open) return;
      const onClick = (e: MouseEvent) => {
         if (ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false);
         }
      };
      document.addEventListener('mousedown', onClick);
      return () => document.removeEventListener('mousedown', onClick);
   }, [open]);

   useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
   }, [open]);

   const handleConfirmLogout = async () => {
      setShowLogout(false);
      setOpen(false);
      await AuthService.logout();
      window.location.href = '/login';
   };

   return (
      <>
         <div className="relative" ref={ref}>
            <button
               type="button"
               aria-label="Account menu"
               aria-expanded={open}
               aria-haspopup="menu"
               onClick={() => setOpen((v) => !v)}
               className={'flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-lg hover:bg-surface-container transition-colors ' + (open ? 'bg-surface-container' : '')}
            >
               <div className="w-7 h-7 rounded-full bg-primary-container/30 border border-primary-container/50 flex items-center justify-center text-primary text-xs font-semibold">{initials}</div>
               <span className="hidden md:inline text-sm text-on-surface font-medium">{fullName}</span>
               <ChevronDown className={'hidden md:block w-4 h-4 text-on-surface-variant transition-transform ' + (open ? 'rotate-180' : '')} strokeWidth={1.75} />
            </button>

            {open && (
               <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-72 bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/15 rounded-xl shadow-2xl glow-top overflow-hidden z-50"
               >
                  {/* Identity */}
                  <div className="p-4 border-b border-outline-variant/10">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container/30 border border-primary-container/50 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                           {initials}
                        </div>
                        <div className="min-w-0">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-on-surface truncate">{fullName}</span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary shrink-0">Owner</span>
                           </div>
                           <div className="text-xs text-on-surface-variant truncate">{email}</div>
                        </div>
                     </div>
                  </div>

                  {/* Quick links */}
                  <div className="py-1">
                     {[
                        { href: '/app/settings#profile', label: 'Your Profile', icon: UserIcon },
                     ].map(({ href, label, icon: Icon }) => (
                        <Link
                           key={href}
                           href={href}
                           role="menuitem"
                           onClick={() => setOpen(false)}
                           className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors"
                        >
                           <Icon className="w-4 h-4 text-on-surface-variant" strokeWidth={1.75} />
                           <span className="font-medium">{label}</span>
                        </Link>
                     ))}
                  </div>

                  {/* Divider + sign out */}
                  <div className="border-t border-outline-variant/10 py-1">
                     <button
                        type="button"
                        role="menuitem"
                        onClick={() => setShowLogout(true)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-tertiary-container/10 hover:text-tertiary transition-colors"
                     >
                        <LogOut className="w-4 h-4 text-on-surface-variant" strokeWidth={1.75} />
                        <span className="font-medium">Sign Out</span>
                     </button>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 border-t border-outline-variant/10 text-[10px] font-semibold tracking-[0.08em] uppercase text-outline">Onreco &middot; v1.0.0</div>
               </div>
            )}
         </div>

         <LogoutDialog open={showLogout} onOpenChange={setShowLogout} onConfirm={handleConfirmLogout} />
      </>
   );
}
