'use client';

import { useState } from 'react';
import { CheckCircle, Mail, RefreshCw, ShieldAlert } from 'lucide-react';
import SectionCard from './SectionCard';
import SectionHeading from './SectionHeading';
import { useUserProfileStore } from '@/providers/user-profile-store';
import { useToastStore } from '@/providers/toast-provider';
import ApiClient from '@/services/ApiClient';

export default function EmailVerificationSection() {
   const { userProfile } = useUserProfileStore();
   const { show } = useToastStore();
   const [sending, setSending] = useState(false);

   const isVerified = userProfile?.emailVerified ?? false;

   const handleSendVerification = async () => {
      if (sending) return;
      setSending(true);
      try {
         await ApiClient.post('/auth/verify-email/send', {});
         show('Verification email sent! Check your inbox.', 'success');
      } catch {
         show('Failed to send verification email. Please try again.', 'error');
      } finally {
         setSending(false);
      }
   };

   return (
      <SectionCard id="verification">
         <SectionHeading
            icon={isVerified ? CheckCircle : ShieldAlert}
            title="Email Verification"
            blurb={isVerified ? 'Your email address has been verified.' : 'Verify your email to unlock all features.'}
         />

         <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 border border-outline-variant/10">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isVerified ? 'bg-primary/10 text-primary' : 'bg-tertiary-container/20 text-tertiary'}`}>
                  <Mail className="w-5 h-5" strokeWidth={1.75} />
               </div>
               <div>
                  <p className="text-sm font-semibold text-on-surface">{userProfile?.email}</p>
                  <p className={`text-xs mt-0.5 ${isVerified ? 'text-primary' : 'text-tertiary'}`}>
                     {isVerified ? 'Verified' : 'Not verified'}
                  </p>
               </div>
            </div>

            {!isVerified && (
               <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
               >
                  <RefreshCw className={`w-4 h-4 ${sending ? 'animate-spin' : ''}`} strokeWidth={2} />
                  {sending ? 'Sending...' : 'Send verification email'}
               </button>
            )}
         </div>

         {!isVerified && (
            <p className="text-xs text-on-surface-variant mt-3">
               Click the button to receive a verification link at your email address. The link expires in 1 hour.
            </p>
         )}
      </SectionCard>
   );
}
