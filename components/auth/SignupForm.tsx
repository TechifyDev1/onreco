'use client'
import { handleSignup } from '@/app/actions/auth'
import { useToastStore } from '@/providers/toast-provider'
import { useUserProfileStore } from '@/providers/user-profile-store'
import { UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

export default function SignupForm() {
  const { show } = useToastStore()
  const { setUserProfile } = useUserProfileStore()
  const [state, formAction, isPending] = useActionState(handleSignup, null)
  const router = useRouter()
  useEffect(() => {
    if (!state) return
    if (state.ok) {
      setUserProfile(state.data)
      show('Successfully signed up', 'success')
      router.push('/verify-email')
    } else {
      if (state.fieldErrors) {
        const validations = Object.values(state.fieldErrors)
        show(validations[0] || 'Validation failed', 'error')
      } else {
        show(state.message, 'error')
      }
    }
  }, [state, setUserProfile, show, router])
  return (
    <form className="space-y-4" action={formAction}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor="firstName"
            className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant ml-1"
          >
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            disabled={isPending}
            autoComplete="firstName"
            placeholder="John"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="lastName"
            className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant ml-1"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            disabled={isPending}
            autoComplete="lastName"
            placeholder="Doe"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant ml-1"
        >
          Email addrss
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="john@email.com"
          disabled={isPending}
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant ml-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          disabled={isPending}
          placeholder="••••••••"
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full py-3.5 text-on-primary-container text-xl font-semibold leading-7 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg glow-top mt-2 inline-flex items-center justify-center gap-2"
      >
        {isPending ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <UserPlus className="w-5 h-5" strokeWidth={2} />
        )}
        {isPending
          ? 'Setting up your account...'
          : 'Start Automating Accounting'}
      </button>
    </form>
  )
}
