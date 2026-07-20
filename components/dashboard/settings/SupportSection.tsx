'use client';

import { useState } from 'react';
import { Check, Copy, HelpCircle, Mail, MessageCircle } from 'lucide-react';
import SectionCard from './SectionCard';
import SectionHeading from './SectionHeading';

const WHATSAPP = '09045892076';
const EMAIL = 'techifydev1@gmail.com';

export default function SupportSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1200);
  };

  return (
    <SectionCard id="support">
      <SectionHeading
        icon={HelpCircle}
        title="Support"
        blurb="Need help or have feedback? Reach out through any of the channels below."
      />

      <div className="flex flex-col gap-3">
        {/* WhatsApp */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">WhatsApp</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{WHATSAPP}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/234${WHATSAPP.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Open
            </a>
            <button
              type="button"
              onClick={() => handleCopy(WHATSAPP, 'whatsapp')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer"
              title="Copy number"
            >
              {copiedField === 'whatsapp' ? (
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
              ) : (
                <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">Email</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{EMAIL}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Open
            </a>
            <button
              type="button"
              onClick={() => handleCopy(EMAIL, 'email')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer"
              title="Copy email"
            >
              {copiedField === 'email' ? (
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
              ) : (
                <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
