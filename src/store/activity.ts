import { setActivities } from "./../services/activity";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Activity, Day } from "../interfaces/activity";
import { getDayOfWeekNumber } from "../utils/activity";

interface ActivityState {
  activities: Activity[];
  todaysActivities: Activity[];
  setActivities: (payload: Activity[]) => void;
  addActivity: (payload: Activity) => void;
  editActivity: (id: string, payload: Activity) => void;
  deleteActivity: (id: string) => void;
  emptyActivities: () => void;
  setTodaysActivities: (activities?: Activity[]) => void;
}

const initialStateValues = {
  activities: [],
  todaysActivities: [],
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
        setTodaysActivities: (activities: Activity[] = []) => {
          if (activities.length > 0) {
            set({ todaysActivities: activities });
            return;
          }
          const storedActivities: Activity[] = [...activityStore.getState().activities];
          const dayOfWeekNumber = getDayOfWeekNumber();
          const todaysActivities = storedActivities.filter((activity: Activity) => {
            const temp = activity.days.find((day: Day) => {
              return day.id === dayOfWeekNumber && day.enabled;
            });
            return temp;
          });
          set({ todaysActivities: todaysActivities });
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
