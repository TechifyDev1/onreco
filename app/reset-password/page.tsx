import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ForgotPasswordForm from './ForgotPasswordForm';

export const metadata: Metadata = {
   title: 'Forgot Password | Onreco',
};

export default function ForgotPasswordPage() {
   return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
         <div className="w-full max-w-md text-center">
            <div className="bg-glass rounded-xl border border-outline-variant/10 glow-top p-8 text-left">
               <div className="text-center mb-6">
                  <h1 className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                     Forgot your password?
                  </h1>
                  <p className="text-sm text-on-surface-variant">
                     Enter your email and we&apos;ll send you a link to reset your password.
                  </p>
               </div>

               <ForgotPasswordForm />

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
