import { create } from 'zustand'

type ToastType = 'error' | 'success' | 'warning' | 'info' | 'coming'

interface ToastState {
  type: ToastType
  message: string
  isOpen: boolean
  show: (message: string, type: ToastType) => void
  dismiss: () => void
}

let toastTimerId: NodeJS.Timeout | null = null

export const useToastStore = create<ToastState>((set) => ({
  type: 'info',
  message: '',
  isOpen: false,
  show: (message, type) => {
    if (toastTimerId) {
      clearTimeout(toastTimerId)
    }
    set({ message, type, isOpen: true })
    toastTimerId = setTimeout(() => {
      ;(set({ isOpen: false }), (toastTimerId = null))
    }, 4000)
  },
  dismiss: () => {
    if (toastTimerId) {
      clearTimeout(toastTimerId)
      toastTimerId = null
    }
    set({ isOpen: false })
  },
}))
