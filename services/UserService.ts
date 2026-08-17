import ApiClient from './ApiClient'

export interface UserProfileState {
  email: string
  firstName: string
  lastName: string
  emailVerified: boolean
  id: string
}

export default class UserService {
  private static readonly userBasePath = '/users'
  static async getUserProfile(): Promise<UserProfileState> {
    const userResponse = await ApiClient.get<UserProfileState>(
      `${this.userBasePath}/me`
    )
    return userResponse.data
  }

  static async updateProfile(data: { firstName: string; lastName: string }): Promise<UserProfileState> {
    const response = await ApiClient.put<UserProfileState, { firstName: string; lastName: string }>(
      `${this.userBasePath}/me`,
      data
    )
    return response.data
  }
}
