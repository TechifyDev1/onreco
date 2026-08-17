export default function PageSkeleton({ rows = 4 }: { rows?: number }) {
   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-pulse">
         {/* Header skeleton */}
         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
               <div className="h-7 w-48 rounded-md bg-surface-container-high" />
               <div className="h-4 w-80 rounded-md bg-surface-container-high" />
            </div>
            <div className="h-9 w-28 rounded-lg bg-surface-container-high" />
         </div>

         {/* Stat tiles skeleton */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
               <div key={i} className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10 space-y-3">
                  <div className="h-3 w-16 rounded bg-surface-container-high" />
                  <div className="h-6 w-12 rounded bg-surface-container-high" />
               </div>
            ))}
         </div>

         {/* Content rows skeleton */}
         <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
               <div key={i} className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-surface-container-high shrink-0" />
                  <div className="flex-1 space-y-2">
                     <div className="h-4 w-40 rounded bg-surface-container-high" />
                     <div className="h-3 w-64 rounded bg-surface-container-high" />
                  </div>
                  <div className="h-8 w-20 rounded-lg bg-surface-container-high shrink-0" />
               </div>
            ))}
         </div>
      </div>
   );
}
