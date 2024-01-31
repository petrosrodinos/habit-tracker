import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Activity } from "../interfaces/activity";

interface AuthState {
  isLoggedIn: boolean;
  avatar: string;
  userId: string;
  activities: Activity[];
  token: string;
  exp: number;
  logOut: () => void;
  logIn: (payload: any) => void;
}

const initialStateValues = {
  isLoggedIn: false,
  userId: "",
  avatar: "",
  token: "",
  exp: 0,
  activities: [],
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
            avatar: payload.avatar,
            userId: payload.userId,
            activities: payload.activities,
            token: payload.token,
            exp: payload.exp,
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
