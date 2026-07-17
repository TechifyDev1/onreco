export default function Field({
  label,
  hint,
  value,
  placeholder,
  suffix,
  onChange,
  disabled,
}: {
  label: string
  hint?: string
  value?: string
  placeholder?: string
  suffix?: string
  onChange?: (value: string) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold tracking-[0.05em] uppercase text-on-surface-variant">
        {label}
      </label>
      <div className="flex rounded-lg bg-surface-container-low border border-outline-variant/20 focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container transition-all overflow-hidden">
        <input
          type="text"
          value={value ?? ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={!onChange}
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none disabled:opacity-50 read-only:cursor-default"
        />
        {suffix && (
          <span className="flex items-center px-3 text-xs font-mono text-on-surface-variant border-l border-outline-variant/20">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  )
}
