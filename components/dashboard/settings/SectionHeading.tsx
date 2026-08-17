import { Building2 } from "lucide-react"

export default function SectionHeading({
  icon: Icon,
  title,
  blurb,
}: {
  icon: typeof Building2
  title: string
  blurb: string
}) {
  return (
    <header className="flex items-start gap-3 mb-5">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
          {title}
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">{blurb}</p>
      </div>
    </header>
  )
}