'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ApiClient from '@/services/ApiClient';

type Status = 'loading' | 'success' | 'error';

export default function VerifyConfirmHandler({ token }: { token: string }) {
   const [status, setStatus] = useState<Status>('loading');
   const [message, setMessage] = useState('');

   useEffect(() => {
      let cancelled = false;
      (async () => {
         try {
            const { data } = await ApiClient.get<{ message: string }>(
               `/auth/verify-email/verify?token=${token}`
            );
            if (!cancelled) {
               setStatus('success');
               setMessage(data.message || 'Email verified successfully');

               // Re-issue token so JWT gets emailVerified: true immediately
               try {
                  await ApiClient.post('/auth/refresh', {});
               } catch {
                  // User may not have cookies (different browser) — they'll log in normally
               }
            }
         } catch (err: any) {
            if (!cancelled) {
               setStatus('error');
               setMessage(err?.message || 'Verification failed');
            }
         }
      })();
      return () => { cancelled = true; };
   }, [token]);

   return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
         <div className="w-full max-w-md text-center">
            <div className="bg-glass rounded-xl border border-outline-variant/10 glow-top p-8">
               {status === 'loading' && (
                  <>
                     <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                        <Loader2 className="w-8 h-8 animate-spin" strokeWidth={1.75} />
                     </div>
                     <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                        Verifying your email...
                     </h1>
                     <p className="text-sm text-on-surface-variant">
                        Please wait while we verify your email address.
                     </p>
                  </>
               )}

               {status === 'success' && (
                  <>
                     <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8" strokeWidth={1.75} />
                     </div>
                     <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                        Email verified!
                     </h1>
                     <p className="text-sm text-on-surface-variant mb-6">
                        Your email has been verified. You can now use all features of Onreco.
                     </p>
                     <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-colors"
                     >
                        Continue to Login
                     </Link>
                  </>
               )}

               {status === 'error' && (
                  <>
                     <div className="w-16 h-16 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-8 h-8" strokeWidth={1.75} />
                     </div>
                     <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                        Verification failed
                     </h1>
                     <p className="text-sm text-on-surface-variant mb-6">
                        {message}
                     </p>
                     <Link
                        href="/verify-email"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-colors"
                     >
                        Resend verification email
                     </Link>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
