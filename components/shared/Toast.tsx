'use client';
import { useToastStore } from '@/providers/toast-provider';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export default function Toast() {
   const TOAST_THEME = {
      success: {
         icon: CheckCircle2,
         colorClasses: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
         barColor: 'bg-emirald-500',
         title: 'Success',
      },
      error: {
         icon: AlertCircle,
         colorClasses: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
         barColor: 'bg-rose-500',
         title: 'Error',
      },
      warning: {
         icon: AlertTriangle,
         colorClasses: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
         barColor: 'bg-amber-500',
         title: 'Warning',
      },
      info: {
         icon: Info,
         colorClasses: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
         barColor: 'bg-sky-500',
         title: 'Information',
      },
      coming: {
         icon: Sparkles,
         colorClasses: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
         barColor: 'bg-purple-500',
         title: 'Coming Soon!',
      },
   };
   const { isOpen, message, type, dismiss } = useToastStore();
   if (!isOpen) return null;
   const theme = TOAST_THEME[type] || TOAST_THEME.info;
   const IconComponent = theme.icon;

   return (
      <div
         className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-10000 
        bg-glass rounded-xl border border-outline-variant/30 glow-top shadow-2xl 
        flex flex-col overflow-hidden animate-toast-in"
         role="alert"
      >
         {/* Content layout */}
         <div className="flex gap-4 p-4 items-start">
            {/* Glowing Icon Container (Success green theme) */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg border shrink-0 ${theme.colorClasses}`}>
               <IconComponent className="w-5 h-5" />
            </div>

            {/* Text Info */}
            <div className="flex-1 min-w-0">
               <h4 className="text-sm font-semibold text-on-surface leading-5 mb-0.5">{theme.title}</h4>
               <p className="text-xs text-on-surface-variant leading-relaxed">{message}</p>
            </div>

            {/* Close Action */}
            <button
               className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/40 p-1.5 rounded-lg transition-colors shrink-0 flex items-center justify-center cursor-pointer"
               aria-label="Close notification"
               onClick={dismiss}
            >
               <X className="w-4 h-4" />
            </button>
         </div>

         {/* Shrinking bottom progress track */}
         <div className="h-0.5 w-full bg-surface-variant/20 relative overflow-hidden">
            <div className={`absolute top-0 bottom-0 left-0 w-full origin-left animate-toast-progress ${theme.barColor}`} />
         </div>
      </div>
   );
}
