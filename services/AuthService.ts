import ApiClient from './ApiClient'
import { UserProfileState } from './UserService'

export default class AuthService {
  private static readonly authBasePath = '/auth'
  private static accessToken: string | null = null
  static async signUp(request: RegisterRequest): Promise<AuthResponse> {
    const { data, headers } = await ApiClient.post<
      AuthResponse,
      RegisterRequest
    >(`${this.authBasePath}/register`, request)
    return {
      userProfile: data.userProfile,
      headers: headers,
    }
  }

  static async login(request: LoginRequest): Promise<AuthResponse> {
    const { data, headers } = await ApiClient.post<AuthResponse, LoginRequest>(
      `${this.authBasePath}/login`,
      request
    )
    return {
      userProfile: data.userProfile,
      headers: headers,
    }
  }

  // static async refresh(): Promise<void> {
  //   const tokenResponse = await ApiClient.post<TokenState, any>(
  //     `${this.authBasePath}/refresh`,
  //     {}
  //   )
  //   this.setAccessToken(tokenResponse.accessToken)
  //   return
  // }

  static async logout(): Promise<void> {
    try {
      await ApiClient.post(`${this.authBasePath}/logout`, {});
    } catch {
      // Best-effort — session will be cleared by redirect
    }
  }

  static async forgotPassword(request: ForgotPasswordRequest): Promise<{ message: string }> {
    const { data } = await ApiClient.post<{ message: string }, ForgotPasswordRequest>(
      `${this.authBasePath}/password/forgot`,
      request
    )
    return data
  }

  static async resetPassword(request: ResetPasswordRequest): Promise<{ message: string }> {
    const { data } = await ApiClient.post<{ message: string }, ResetPasswordRequest>(
      `${this.authBasePath}/password/reset`,
      request
    )
    return data
  }
}

export interface AuthResponse {
  userProfile: UserProfileState
  headers: Headers
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}
