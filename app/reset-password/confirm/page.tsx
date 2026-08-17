import { Metadata } from 'next';
import { ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';
import ResetPasswordHandler from '../ResetPasswordHandler';

export const metadata: Metadata = {
   title: 'Reset Password | Onreco',
};

export default async function ResetPasswordConfirmPage({
   searchParams,
}: {
   searchParams: Promise<{ token?: string }>;
}) {
   const { token } = await searchParams;

   if (!token) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-surface px-4">
            <div className="w-full max-w-md text-center">
               <div className="bg-glass rounded-xl border border-outline-variant/10 glow-top p-8">
                  <div className="w-16 h-16 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center mx-auto mb-6">
                     <XCircle className="w-8 h-8" strokeWidth={1.75} />
                  </div>
                  <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                     Invalid link
                  </h1>
                  <p className="text-sm text-on-surface-variant mb-6">
                     No reset token provided. Please check your email for the correct link.
                  </p>
                  <Link
                     href="/reset-password"
                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-colors"
                  >
                     Request a new reset link
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
         <div className="w-full max-w-md text-center">
            <div className="bg-glass rounded-xl border border-outline-variant/10 glow-top p-8 text-left">
               <div className="text-center mb-6">
                  <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                     Set a new password
                  </h1>
                  <p className="text-sm text-on-surface-variant">
                     Choose a new password for your Onreco account.
                  </p>
               </div>

               <ResetPasswordHandler token={token} />

               <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-on-surface transition-colors mt-6"
               >
                  <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Back to login
               </Link>
            </div>
         </div>
      </div>
   );
}
