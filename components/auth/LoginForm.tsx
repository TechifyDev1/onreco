'use client'
import { handleLogin } from '@/app/actions/auth'
import { useToastStore } from '@/providers/toast-provider'
import { useUserProfileStore } from '@/providers/user-profile-store'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(handleLogin, null)
  const { setUserProfile } = useUserProfileStore()
  const { show } = useToastStore()
  const router = useRouter()
  useEffect(() => {
    if (!state) return
    if (state.ok) {
      setUserProfile(state.data)
      show('Successfully signed up', 'success')
      router.push('/app')
    } else {
      if (state.fieldErrors) {
        const validations = Object.values(state.fieldErrors)
        show(validations[0] || 'Validation failed', 'error')
      } else {
        show(state.message, 'error')
      }
    }
  }, [router, setUserProfile, show, state])
  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-2"
        >
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            disabled={isPending}
            autoComplete="email"
            placeholder="name@email.com"
            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all text-sm"
          />
          <Mail
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant"
          >
            Password
          </label>
          <Link
            href="/reset-password"
            className="text-xs font-medium text-primary hover:opacity-90 transition-opacity"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            disabled={isPending}
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="*******"
            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all text-sm"
          />
          <Lock
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 w-5 h-5"
            strokeWidth={1.75}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full py-4 text-on-primary-container text-xs font-bold tracking-wider uppercase rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg glow-top flex items-center justify-center gap-2"
      >
        {isPending ? 'Signing you in' : 'Sign In to Onreco'}
        {isPending ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <ArrowRight className="w-4.5 h-4.5" strokeWidth={2.5} />
        )}
      </button>
    </form>
  )
}
