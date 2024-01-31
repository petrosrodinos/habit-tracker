import { setActivities } from "./../services/activity";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Activity } from "../interfaces/activity";

interface ActivityState {
  activities: Activity[];
  setActivities: (payload: Activity[]) => void;
  addActivity: (payload: Activity) => void;
  editActivity: (id: string, payload: Activity) => void;
  deleteActivity: (id: string) => void;
  emptyActivities: () => void;
}

const initialStateValues = {
  activities: [],
};

export const activityStore = create<ActivityState>()(
  devtools(
    persist(
      (set) => ({
        ...initialStateValues,
        setActivities: (payload: Activity[]) => {
          set({ activities: payload });
        },
        emptyActivities: () => {
          set({ activities: [] });
        },
        addActivity: (payload: Activity) => {
          const activities = [...activityStore.getState().activities, payload];
          set({ activities });
        },
        editActivity: (id: string, payload: Activity) => {
          const activities = [...activityStore.getState().activities];
          const index = activities.findIndex((activity) => activity.id === id);
          activities[index] = payload;
          set({ activities });
        },
        deleteActivity: (id: string) => {
          const activities = [...activityStore.getState().activities];
          const index = activities.findIndex((activity) => activity.id === id);
          activities.splice(index, 1);
          set({ activities });
        },
      }),
      {
        name: "habbit-tracker-activities",
      }
    )
  )
);

export const getAuthState = (): ActivityState => {
  return activityStore.getState();
};
