'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntegrationStore } from '@/providers/integration-store';
import { useToastStore } from '@/providers/toast-provider';
import IntegrationCard from './IntegrationCard';

const ComingSoonSection = () => {
   const { soon, integrations } = useIntegrationStore();
   const { show } = useToastStore();
   const router = useRouter();
   const params = useSearchParams();
   const handled = useRef(false);

   const soonCount = soon.length;

   useEffect(() => {
      if (handled.current) return;

      const matches: { slug: string; status: 'connected' | 'error' }[] = [];
      for (const i of integrations) {
         const value = params.get(i.slug);
         if (value === 'connected' || value === 'error') {
            matches.push({ slug: i.slug, status: value });
         }
      }
      if (matches.length === 0) return;

      handled.current = true;

      for (const m of matches) {
         const name = integrations.find((i) => i.slug === m.slug)?.name ?? m.slug;
         if (m.status === 'connected') {
            show(`${name} connected successfully.`, 'success');
         } else {
            show(`Failed to connect ${name}. Please try again.`, 'error');
         }
      }

      const cleaned = new URLSearchParams(params.toString());
      for (const m of matches) cleaned.delete(m.slug);
      const qs = cleaned.toString();
      router.replace(qs ? `?${qs}` : '?', { scroll: false });
   }, [params, integrations, show, router]);

   return soonCount > 0 ? (
      <section aria-label="Coming soon integrations" className="flex flex-col gap-4 mt-2">
         <header className="flex items-center justify-between">
            <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
               Coming soon
            </h2>
            <span className="text-xs text-on-surface-variant">Notify me when ready</span>
         </header>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {soon.map((i) => (
               <IntegrationCard key={i.slug} integration={i} />
            ))}
         </div>
      </section>
   ) : null;
};

export default ComingSoonSection;
