export default function Toggle({
  label,
  description,
  defaultChecked,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-t border-outline-variant/10 first:border-t-0 first:pt-0">
      <div>
        <div className="text-sm font-semibold text-on-surface">{label}</div>
        <div className="text-xs text-on-surface-variant mt-1 leading-relaxed max-w-md">
          {description}
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <div className="w-9 h-5 rounded-full bg-surface-container-high border border-outline-variant/20 peer-checked:bg-primary-container peer-checked:border-primary/40 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-on-surface-variant after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 peer-checked:after:bg-on-primary-container"></div>
      </label>
    </div>
  )
}
