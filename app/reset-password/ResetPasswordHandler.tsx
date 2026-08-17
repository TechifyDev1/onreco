'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/providers/toast-provider';
import AuthService from '@/services/AuthService';
import { Lock, Loader2, CheckCircle } from 'lucide-react';

export default function ResetPasswordHandler({ token }: { token: string }) {
   const { show } = useToastStore();
   const router = useRouter();
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [submitting, setSubmitting] = useState(false);
   const [done, setDone] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting) return;
      if (newPassword.length < 8) {
         show('Password cannot be less than 8 characters', 'error');
         return;
      }
      if (newPassword !== confirmPassword) {
         show('Passwords do not match', 'error');
         return;
      }
      setSubmitting(true);
      try {
         await AuthService.resetPassword({ token, newPassword });
         setDone(true);
      } catch (err: any) {
         show(err?.message || 'Failed to reset password. Please try again.', 'error');
      } finally {
         setSubmitting(false);
      }
   };

   if (done) {
      return (
         <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
               Password reset!
            </h1>
            <p className="text-sm text-on-surface-variant mb-6">
               Your password has been updated. You can now sign in with your new password.
            </p>
            <button
               type="button"
               onClick={() => router.push('/login')}
               className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-colors cursor-pointer"
            >
               Continue to Login
            </button>
         </div>
      );
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <div>
            <label htmlFor="new-password" className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-2">
               New Password
            </label>
            <div className="relative">
               <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="********"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all text-sm"
               />
               <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5" strokeWidth={1.75} />
            </div>
         </div>

         <div>
            <label htmlFor="confirm-password" className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-2">
               Confirm New Password
            </label>
            <div className="relative">
               <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="********"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all text-sm"
               />
               <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5" strokeWidth={1.75} />
            </div>
         </div>

         <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-4 text-on-primary-container text-xs font-bold tracking-wider uppercase rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg glow-top flex items-center justify-center gap-2 cursor-pointer"
         >
            {submitting ? 'Resetting password...' : 'Reset Password'}
            {submitting && <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />}
         </button>
      </form>
   );
}
