import React, { useState, useEffect, FC } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonInput,
  IonList,
  IonTextarea,
  IonToast,
  IonLoading,
} from "@ionic/react";
import Day from "./Day";
import { Activity, Day as DayInt } from "../../../interfaces/activity";
import { useMutation } from "react-query";
import { setActivities } from "../../../services/activity";
import { authStore } from "../../../store/auth";
import { activityStore } from "../../../store/activity";
import { v4 as uuidv4 } from "uuid";

const days: DayInt[] = [
  {
    id: 1,
    name: "Monday",
    enabled: false,
    time: "",
  },
  {
    id: 2,
    name: "Tuesday",
    enabled: false,
    time: "",
  },
  {
    id: 3,
    name: "Wednesday",
    enabled: false,
    time: "",
  },
  {
    id: 4,
    name: "Thursday",
    enabled: false,
    time: "",
  },
  {
    id: 5,
    name: "Friday",
    enabled: false,
    time: "",
  },
  {
    id: 6,
    name: "Saturday",
    enabled: false,
    time: "",
  },
  {
    id: 7,
    name: "Sunday",
    enabled: false,
    time: "",
  },
];

const emptyActivity: Activity = {
  id: uuidv4(),
  name: "",
  description: "",
  days: days,
};

interface Alert {
  color: string;
  message: string;
}

interface CreateActivityProps {
  activity?: any;
  isOpen: boolean;
  onClose: () => void;
}

const CreateActivity: FC<CreateActivityProps> = ({ activity, isOpen, onClose }) => {
  const { userId } = authStore((state) => state);
  const { activities, addActivity, editActivity } = activityStore((state) => state);
  const [newActivity, setNewActivity] = useState<Activity>(emptyActivity);
  const [alert, setAlert] = useState<Alert>();

  const { mutate: setActivitiesMutation } = useMutation(setActivities);

  useEffect(() => {
    if (activity) {
      setNewActivity(activity);
    } else {
      setNewActivity(emptyActivity);
    }
  }, [activity]);

  const handleCreate = () => {
    const enabledDays = newActivity.days.filter((day) => day.enabled === true);
    const hasTime = enabledDays.find((day) => day.time !== "");

    if (newActivity.name === "" || enabledDays.length == 0 || !hasTime) {
      setAlert({
        color: "danger",
        message: "Please fill out all fields",
      });
      return;
    }
    const payload = {
      activities: [...activities, newActivity],
      userId: userId,
    };
    setActivitiesMutation(payload, {
      onSuccess: () => {
        addActivity(newActivity);
        setNewActivity(emptyActivity);
        onClose();
      },
      onError: () => {
        setAlert({
          color: "danger",
          message: "Could not create activity",
        });
      },
    });
  };

  const handleEdit = () => {
    console.log("edit");
    const enabledDays = newActivity.days.filter((day) => day.enabled === true);
    const hasTime = enabledDays.find((day) => day.time !== "");

    if (newActivity.name === "" || enabledDays.length == 0 || !hasTime) {
      setAlert({
        color: "danger",
        message: "Please fill out all fields",
      });
      return;
    }
    const payload = {
      activities: [...activities, newActivity],
      userId: userId,
    };
    setActivitiesMutation(payload, {
      onSuccess: () => {
        addActivity(newActivity);
        setNewActivity(emptyActivity);
        onClose();
      },
      onError: () => {
        setAlert({
          color: "danger",
          message: "Could not create activity",
        });
      },
    });
  };

  const handleDayChange = (day: DayInt) => {
    const acitivity = newActivity.days.find((d) => d.id === day.id);
    if (acitivity) {
      const index = newActivity.days.indexOf(acitivity);
      newActivity.days[index] = day;
    }
    setNewActivity({ ...newActivity });
  };
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="danger" onClick={onClose}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>{activity ? "Edit" : "Create an"} activity</IonTitle>
          <IonButtons slot="end">
            <IonButton
              id="open-loading"
              color="primary"
              strong={true}
              onClick={activity ? handleEdit : handleCreate}
            >
              {activity ? "Save" : "Create"}
            </IonButton>
            <IonLoading trigger="open-loading" message="Creating activity" duration={3000} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonToast
          isOpen={!!alert}
          message={alert?.message}
          onDidDismiss={() => setAlert(undefined)}
          duration={3000}
          color={alert?.color}
        ></IonToast>
        <IonInput
          value={newActivity.name}
          onIonChange={(e) => setNewActivity({ ...newActivity, name: e.detail.value! })}
          label="Name"
          labelPlacement="floating"
          fill="outline"
          placeholder="Enter name"
        ></IonInput>
        <br />
        <IonTextarea
          fill="outline"
          label="Description (optional)"
          labelPlacement="floating"
          autoGrow={true}
          value={newActivity.description}
          onIonChange={(e) => setNewActivity({ ...newActivity, description: e.detail.value! })}
        ></IonTextarea>
        <IonList>
          {days.map((day, index) => (
            <Day key={index} onChange={handleDayChange} day={day} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CreateActivity;
