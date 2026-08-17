import { ReactNode } from 'react'

export default function SectionCard({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-label={id}
      className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10 scroll-mt-20"
    >
      {children}
    </section>
  )
}
