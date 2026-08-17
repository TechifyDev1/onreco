import { Metadata } from 'next';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import VerifyConfirmHandler from './VerifyConfirmHandler';

export const metadata: Metadata = {
   title: 'Email Verified | Onreco',
};

export default async function VerifyConfirmPage({
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
                     No verification token provided. Please check your email for the correct link.
                  </p>
                  <Link
                     href="/verify-email"
                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-colors"
                  >
                     Resend verification email
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   return <VerifyConfirmHandler token={token} />;
}
