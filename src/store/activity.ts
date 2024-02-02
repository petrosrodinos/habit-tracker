import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Activity, Day } from "../interfaces/activity";
import { getDayOfWeekNumber, compareTimes, getTimeForTodaysActivity } from "../utils/activity";

interface ActivityState {
  activities: Activity[];
  todaysActivities: Activity[];
  calculatedActivitiesTimestamp: number;
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
  calculatedActivitiesTimestamp: 0,
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
          set({ activities: [], todaysActivities: [] });
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
          if (Date.now() - activityStore.getState().calculatedActivitiesTimestamp < 60000) {
            return;
          }
          const storedActivities: Activity[] = [...activityStore.getState().activities];
          const dayOfWeekNumber = getDayOfWeekNumber();
          const todaysActivities = storedActivities
            .filter((activity: Activity) => {
              const temp = activity.days.find((day: Day) => {
                return day.id === dayOfWeekNumber && day.enabled;
              });
              return temp;
            })
            .sort((a: Activity, b: Activity) => {
              const aDayTime = getTimeForTodaysActivity(a);
              const bDayTime = getTimeForTodaysActivity(b);
              return compareTimes(aDayTime, bDayTime);
            });

          set({ todaysActivities: todaysActivities });
          set({ calculatedActivitiesTimestamp: Date.now() });
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
