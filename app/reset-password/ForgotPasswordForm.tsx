'use client';

import { useState } from 'react';
import { useToastStore } from '@/providers/toast-provider';
import AuthService from '@/services/AuthService';
import { Mail, Loader2 } from 'lucide-react';

export default function ForgotPasswordForm() {
   const { show } = useToastStore();
   const [email, setEmail] = useState('');
   const [sending, setSending] = useState(false);
   const [sent, setSent] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (sending) return;
      setSending(true);
      try {
         await AuthService.forgotPassword({ email });
         setSent(true);
      } catch (err: any) {
         show(err?.message || 'Failed to send reset link. Please try again.', 'error');
      } finally {
         setSending(false);
      }
   };

   if (sent) {
      return (
         <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
               <Mail className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
               Check your email
            </h1>
            <p className="text-sm text-on-surface-variant mb-6">
               If an account exists for that email, we&apos;ve sent a password reset link. Click the link to set a new password.
            </p>
            <div className="bg-surface-container-low/50 rounded-lg p-4 mb-6">
               <p className="text-xs text-on-surface-variant">
                  The reset link will expire in <span className="font-semibold text-on-surface">15 minutes</span>.
                  Check your spam folder if you don&apos;t see the email.
               </p>
            </div>
            <p className="text-xs text-on-surface-variant">
               Didn&apos;t get the link?{' '}
               <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={sending}
                  className="text-primary hover:opacity-90 underline cursor-pointer"
               >
                  Resend reset link
               </button>
            </p>
         </div>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <div>
            <label htmlFor="email" className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-2">
               Email
            </label>
            <div className="relative">
               <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="name@email.com"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all text-sm"
               />
               <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5" strokeWidth={1.75} />
            </div>
         </div>

         <button
            type="submit"
            disabled={sending}
            className="btn-primary w-full py-4 text-on-primary-container text-xs font-bold tracking-wider uppercase rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg glow-top flex items-center justify-center gap-2 cursor-pointer"
         >
            {sending ? 'Sending reset link...' : 'Send Reset Link'}
            {sending && <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />}
         </button>
      </form>
   );
}
