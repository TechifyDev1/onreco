import { Metadata } from 'next';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResendButton from './ResendButton';

export const metadata: Metadata = {
   title: 'Verify Your Email | Onreco',
};

export default function VerifyEmailPage() {
   return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
         <div className="w-full max-w-md text-center">
            <div className="bg-glass rounded-xl border border-outline-variant/10 glow-top p-8">
               <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8" strokeWidth={1.75} />
               </div>

               <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                  Check your email
               </h1>
               <p className="text-sm text-on-surface-variant mb-6">
                  We&apos;ve sent a verification link to your email address. Click the link to verify your account and start using Onreco.
               </p>

               <div className="bg-surface-container-low/50 rounded-lg p-4 mb-6">
                  <p className="text-xs text-on-surface-variant">
                     The verification link will expire in <span className="font-semibold text-on-surface">1 hour</span>.
                     Check your spam folder if you don&apos;t see the email.
                  </p>
               </div>

               <ResendButton />

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
