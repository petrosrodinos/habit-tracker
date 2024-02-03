import React, { FC, useState, useMemo, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
  IonNote,
  IonToast,
} from "@ionic/react";
import Header from "../../components/Header";
import { activityStore } from "../../store/activity";
import { Activity } from "../../interfaces/activity";
import { getTimeForTodaysActivity } from "../../utils/activity";
import { setActivities as setActivitiesDB } from "../../services/activity";
import { useMutation } from "react-query";
import { authStore } from "../../store/auth";
import { Alert } from "../../interfaces/alert";
import "./style.css";

const ToDo: FC = () => {
  const { userId } = authStore();
  const {
    activities,
    todaysActivities,
    completedActivities,
    setActivities,
    setTodaysActivities,
    setCompletedActivities,
  } = activityStore();
  const { mutate: setActivitiesMutation } = useMutation(setActivitiesDB);
  const [alert, setAlert] = useState<Alert>();

  useEffect(() => {
    setTodaysActivities();
  }, [activities]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const draggedItem = todaysActivities.splice(event.detail.from, 1)[0];
    todaysActivities.splice(event.detail.to, 0, draggedItem);
    // setTodaysActivities(todaysActivities.slice());
    event.detail.complete();
  }

  function handleItemCompleted(e: any, item: Activity) {
    const selectedActivity = activities.find((activity) => activity.id === item.id);

    if (selectedActivity) {
      if (e.detail.checked) {
        setCompletedActivities([...completedActivities, selectedActivity.id]);
      } else {
        setCompletedActivities(completedActivities.filter((id) => id !== selectedActivity.id));
      }
    }

    const updatedActivities = activities.map((activity) => {
      if (activity.id === item.id) {
        if (e.detail.checked) {
          activity.counter = activity.counter + 1;
        } else {
          activity.counter = activity.counter - 1;
        }
      }
      return activity;
    });

    const payload = {
      activities: updatedActivities,
      userId: userId,
    };
    setActivitiesMutation(payload, {
      onSuccess: () => {
        setActivities(updatedActivities);
        setAlert({
          color: "success",
          message: "Activity completed!",
        });
      },
      onError: () => {
        setAlert({
          color: "danger",
          message: "Could not update activity",
        });
      },
    });
  }

  const isCompleted = useMemo(() => {
    return (activity: Activity) => completedActivities.includes(activity.id);
  }, [completedActivities]);

  return (
    <IonPage>
      <Header title="Todos" />
      <IonContent fullscreen>
        <IonToast
          isOpen={!!alert}
          message={alert?.message}
          onDidDismiss={() => setAlert(undefined)}
          duration={3000}
          color={alert?.color}
        ></IonToast>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {todaysActivities?.map((item, index) => (
              <IonItem key={index}>
                <IonReorder slot="start"></IonReorder>
                <div>
                  <IonLabel className={`${isCompleted(item) ? "item-completed" : ""}`}>
                    {item.name}
                  </IonLabel>
                  <IonNote>{item.description}</IonNote>
                </div>
                <IonLabel
                  // style={{ paddingLeft: 200 }}
                  slot="end"
                  className={`${isCompleted(item) ? "item-completed" : ""}`}
                >
                  {getTimeForTodaysActivity(item)}
                </IonLabel>
                <IonCheckbox
                  slot="end"
                  checked={isCompleted(item)}
                  onIonChange={(e: any) => handleItemCompleted(e, item)}
                />
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList>
        <br />
        <br />
        {/* <IonList>
          {todaysActivities
            .filter((item) => item.completed)
            .map((item, index) => (
              <IonItem key={index}>
                <IonLabel>{item.name}</IonLabel>
              </IonItem>
            ))}
        </IonList> */}
      </IonContent>
    </IonPage>
  );
};

export default ToDo;
