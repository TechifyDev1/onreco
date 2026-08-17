'use server'

import { ApiError } from '@/services/ApiError'
import AuthService, {
  LoginRequest,
  RegisterRequest,
} from '@/services/AuthService'
import { UserProfileState } from '@/services/UserService'
import { cookies } from 'next/headers'

type SignupResult =
  | { ok: true; data: UserProfileState }
  | { ok: false; message: string; fieldErrors?: Record<string, string> | null }

export async function handleSignup(
  _: any,
  formData: FormData
): Promise<SignupResult> {
  const firstName = formData.get('firstName')?.toString() || ''
  const lastName = formData.get('lastName')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  if (!firstName || !lastName || !email || !password) {
    return { ok: false, message: 'All fields are required' }
  }

  const registerRequest: RegisterRequest = {
    firstName,
    lastName,
    email,
    password,
  }

  try {
    const res = await AuthService.signUp(registerRequest)
    await extractAndSetRefreshCookie(res.headers)
    return { ok: true, data: res.userProfile }
  } catch (error) {
    console.error(`[Auth Action] Signup failed:`, error)
    if (error instanceof ApiError) {
      return {
        ok: false,
        message: error.message,
        fieldErrors: error.fieldErrors ?? null,
      }
    }
    return { ok: false, message: 'An unexpected error occurred' }
  }
}

type LoginResult =
  | { ok: true; data: UserProfileState }
  | {
    ok: false
    message: string
    fieldErrors?: Record<string, string> | null
  }

export async function handleLogin(
  _: any,
  formData: FormData
): Promise<LoginResult> {
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  if (!email || !password) {
    return {
      ok: false,
      message: 'All fields are required',
    }
  }
  const loginRequest: LoginRequest = {
    email: email,
    password,
  }

  try {
    const res = await AuthService.login(loginRequest)
    await extractAndSetRefreshCookie(res.headers)
    return {
      ok: true,
      data: res.userProfile,
    }
  } catch (error) {
    console.error(`[Auth Action] Login failed:`, error)
    if (error instanceof ApiError) {
      return {
        ok: false,
        message: error.message,
        fieldErrors: error.fieldErrors ?? null,
      }
    }
    return { ok: false, message: 'An unexpected error occurred' }
  }
}

async function extractAndSetRefreshCookie(headers: Headers) {
  const cookieArray = headers.getSetCookie()
  const isProd = process.env.NODE_ENV === 'production'
  if (cookieArray) {
    const refreshToken = cookieArray.find((cookie) =>
      cookie.trim().startsWith('refreshToken=')
    )
    const accessToken = cookieArray.find((cookie) =>
      cookie.trim().startsWith('accessToken')
    )
    if (refreshToken) {
      const cookieStore = await cookies()
      const keyValue = refreshToken.split(';')[0].split('=')
      const value = keyValue[1]
      console.log(`[Auth Action] Saving refreshToken to cookie store`)
      cookieStore.set('refreshToken', value, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    if (accessToken) {
      const keyValue = accessToken.split(';')[0].split('=')
      const cookieStore = await cookies()
      const value = keyValue[1]
      console.log(`[Auth Action] Saving accessToken to cookie store`)
      cookieStore.set('accessToken', value, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 0.5 * 60,
      })
    }
  }
}
