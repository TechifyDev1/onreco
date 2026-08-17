import { create } from "zustand";

interface SimulationState {
    isEmptySimulated: boolean;
    toggleEmptySimulation: () => void;
    setEmptySimulation: (val: boolean) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
    isEmptySimulated: false,
    toggleEmptySimulation: () => set((state) => ({ isEmptySimulated: !state.isEmptySimulated })),
    setEmptySimulation: (val) => set({ isEmptySimulated: val }),
}));
