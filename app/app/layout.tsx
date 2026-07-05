import MobileBottomBar from '@/components/dashboard/MobileBottomBar'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import UserStoreInitializer from '@/providers/UserStoreInitializer'
import { ApiError } from '@/services/ApiError'
import UserService, { UserProfileState } from '@/services/UserService'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const result = await getUserProfileInTheServer()
  if (!result.ok || !('userProfile' in result)) {
    redirect('/login')
  }
  const userProfile = result.userProfile
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <UserStoreInitializer userProfile={userProfile} />
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar />
        {/* Extra bottom padding on mobile so the floating bar doesn't cover content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 pb-28 lg:pb-8 max-w-container-max w-full mx-auto">
          {children}
        </main>
      </div>
      <MobileBottomBar />
    </div>
  )
}

async function getUserProfileInTheServer(): Promise<GetUserProfileState> {
  try {
    const res = await UserService.getUserProfile()
    return {
      ok: true,
      userProfile: res,
    }
  } catch (error) {
    console.error(`[Server Layout] Failed to fetch user profile:`, error)
    if (error instanceof ApiError) {
      return {
        ok: false,
        message: error.message,
      }
    }
    return {
      ok: false,
      message: 'An unexpected error occoured',
    }
  }
}

export type GetUserProfileState =
  | {
      ok: boolean
      userProfile: UserProfileState
    }
  | { ok: boolean; message: string }
