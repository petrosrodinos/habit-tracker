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
} from "@ionic/react";
import Day from "./Day";
import { Activity, Day as DayInt } from "../../../interfaces/activity";
import { on } from "events";

interface CreateActivityProps {
  activity?: any;
  isOpen: boolean;
  onCreate: (activity: Activity) => void;
  onClose: () => void;
}

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
  name: "",
  description: "",
  days: days,
};

const CreateActivity: FC<CreateActivityProps> = ({ activity, isOpen, onClose, onCreate }) => {
  const [newActivity, setNewActivity] = useState<Activity>(emptyActivity);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (activity) {
      setNewActivity(activity);
    } else {
      setNewActivity(emptyActivity);
    }
  }, [activity]);

  const handleCreate = () => {
    const atLeastOneDay = newActivity.days.find((day) => day.enabled === true);
    if (newActivity.name === "" || !atLeastOneDay) {
      setError(true);
      return;
    }
    onCreate(newActivity);
    setNewActivity(emptyActivity);
    onClose();
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleChange = (day: DayInt) => {
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
            <IonButton onClick={onClose}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{activity ? "Edit" : "Create an"} activity</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" strong={true} onClick={handleCreate}>
              {activity ? "Save" : "Create"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonToast
          isOpen={error}
          message="Please fill out all fields"
          onDidDismiss={() => setError(false)}
          duration={3000}
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
            <Day key={index} onChange={handleChange} day={day} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CreateActivity;
