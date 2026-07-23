'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useToastStore } from '@/providers/toast-provider';
import ApiClient from '@/services/ApiClient';

export default function ResendButton() {
   const { show } = useToastStore();
   const [sending, setSending] = useState(false);

   const handleResend = async () => {
      if (sending) return;
      setSending(true);
      try {
         await ApiClient.post('/auth/verify-email/send', {});
         show('Verification email sent!', 'success');
      } catch {
         show('Failed to send verification email. Please try again.', 'error');
      } finally {
         setSending(false);
      }
   };

   return (
      <button
         type="button"
         onClick={handleResend}
         disabled={sending}
         className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
         <RefreshCw className={`w-4 h-4 ${sending ? 'animate-spin' : ''}`} strokeWidth={2} />
         {sending ? 'Sending...' : 'Resend verification email'}
      </button>
   );
}
