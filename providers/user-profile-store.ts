'use client';
import { UserProfileState } from '@/services/UserService';
import { useEffect } from 'react';
import { create } from 'zustand';

interface UserProfileStoreState {
   setUserProfile: (userProfile: UserProfileState) => void;
   userProfile: UserProfileState | null;
}

export const useUserProfileStore = create<UserProfileStoreState>((set) => {
   return {
      setUserProfile: (userProfile) => {
         set({ userProfile });
      },
      userProfile: null,
   };
});

export function useHydratedUserProfileStore(profile: UserProfileState) {
   const { setUserProfile } = useUserProfileStore();
   useEffect(() => {
      setUserProfile(profile);
   }, [profile, setUserProfile]);
}
