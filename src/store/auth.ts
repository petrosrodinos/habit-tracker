import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  avatar: string;
  userId: string;
  logOut: () => void;
  logIn: (payload: any) => void;
}

const initialStateValues = {
  isLoggedIn: false,
  userId: "",
  avatar: "",
};

export const authStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        logOut: () => {
          set({
            ...initialStateValues,
          });
        },
        logIn: (payload: any) =>
          set({
            isLoggedIn: true,
            avatar: payload?.avatar,
            userId: payload.userId,
          }),
      }),
      {
        name: "habbit-tracker-auth",
      }
    )
  )
);

export const getAuthState = (): AuthState => {
  return authStore.getState();
};
