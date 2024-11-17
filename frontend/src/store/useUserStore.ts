import { create } from "zustand";

export interface UserType {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

interface UserStoreType {
  user: UserType | null;
  setUser: (val: UserType) => void;
  removeUser: () => void;
}

const useUserStore = create<UserStoreType>((set) => ({
  user: null,

  setUser(user) {
    set({ user });
  },

  removeUser() {
    set({ user: null });
  },
}));

export default useUserStore;
