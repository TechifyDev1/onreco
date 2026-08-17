import { create } from "zustand";

interface TokensState {
    accessToken: string;
    refreshToken: string;
    refresh: (refreshToken: string) => Promise<void>;
}

export const useTokenStore = create<TokensState>((set) => {
    return {
        accessToken: "",
        refreshToken: "",
        refresh: async (refreshToken) => {
            
        }
    }
})