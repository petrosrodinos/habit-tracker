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
import { Alert } from "../../../interfaces/alert";

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

interface CreateActivityProps {
  activity?: any;
  isOpen: boolean;
  onClose: () => void;
}

const CreateActivity: FC<CreateActivityProps> = ({ activity, isOpen, onClose }) => {
  const { userId } = authStore((state) => state);
  const { activities, addActivity, editActivity } = activityStore((state) => state);
  const [newActivity, setNewActivity] = useState<Activity>(getEmptyActivity());
  const [alert, setAlert] = useState<Alert>();

  const { mutate: setActivitiesMutation, isLoading: isSetting } = useMutation(setActivities);

  useEffect(() => {
    if (activity) {
      setNewActivity(activity);
    } else {
      setNewActivity(getEmptyActivity());
    }
  }, [activity]);

  function getEmptyActivity(): Activity {
    return {
      id: uuidv4(),
      name: "",
      description: "",
      counter: 0,
      created: new Date().toISOString(),
      days: days.map((day) => ({ ...day })),
      completed: false,
    };
  }

  const handleCreate = () => {
    if (!validateForm()) return;

    const payload = {
      activities: [...activities, newActivity],
      userId: userId,
    };
    setActivitiesMutation(payload, {
      onSuccess: () => {
        addActivity(newActivity);
        setNewActivity(getEmptyActivity());
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
    if (!validateForm()) return;
    const editedActivities = activities.filter((a) => a.id !== newActivity.id);
    editedActivities.push(newActivity);

    const payload = {
      activities: editedActivities,
      userId: userId,
    };

    setActivitiesMutation(payload, {
      onSuccess: () => {
        editActivity(newActivity.id, newActivity);
        setNewActivity(getEmptyActivity());
        onClose();
      },
      onError: () => {
        setAlert({
          color: "danger",
          message: "Could not edit activity",
        });
      },
    });
  };

  const validateForm = () => {
    const enabledDays = newActivity.days.filter((day) => day.enabled === true);
    // const hasTime = enabledDays.find((day) => day.time !== "");

    const nameExist = activities.find((a) => a.name === newActivity.name);
    if (nameExist) {
      setAlert({
        color: "danger",
        message: "Activity name already exist",
      });
      return false;
    }

    if (newActivity.name === "" || enabledDays.length == 0) {
      setAlert({
        color: "danger",
        message: "Please fill out all fields",
      });
      return false;
    }
    return true;
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
            {isSetting && (
              <IonLoading trigger="open-loading" message="Handling your activity" duration={3000} />
            )}
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
          {newActivity.days.map((day, index) => (
            <Day key={index} onChange={handleDayChange} day={day} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CreateActivity;
