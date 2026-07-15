import { create } from "zustand";

type AuthDraft = {
  email: string;
  name: string;
  restaurantName: string;
  resetEmail: string;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setRestaurantName: (name: string) => void;
  setResetEmail: (email: string) => void;
};

export const useAuthDraft = create<AuthDraft>((set) => ({
  email: "",
  name: "",
  restaurantName: "",
  resetEmail: "",
  setEmail: (email) => set({ email }),
  setName: (name) => set({ name }),
  setRestaurantName: (restaurantName) => set({ restaurantName }),
  setResetEmail: (resetEmail) => set({ resetEmail }),
}));
