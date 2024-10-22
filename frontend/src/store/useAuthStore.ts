import { create } from "zustand";

interface AuthType {
  token: string;
  setToken: (val: string) => void;
  resetToken: () => void;
}

const useAuthStore = create<AuthType>((set) => ({
  token: "",

  setToken(token) {
    set({ token });
  },

  resetToken() {
    set({ token: "" });
  },
}));

export default useAuthStore;
