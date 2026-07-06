'use client';
import { UserProfileState } from '@/services/UserService';
import { useHydratedUserProfileStore } from './user-profile-store';

export default function UserStoreInitializer({ userProfile }: { userProfile: UserProfileState }) {
   useHydratedUserProfileStore(userProfile);
   return null;
}
