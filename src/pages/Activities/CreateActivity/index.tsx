import React, { useState, FC } from "react";
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
} from "@ionic/react";
import Day from "./Day";
import { NewActivity, Day as DayInt } from "../../../interfaces/activity";

interface CreateActivityProps {
  activity?: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const days: DayInt[] = [
  {
    id: 1,
    name: "Monday",
    enabled: false,
    time: "12:00",
  },
  {
    id: 2,
    name: "Tuesday",
    enabled: false,
    time: "12:00",
  },
  {
    id: 3,
    name: "Wednesday",
    enabled: false,
    time: "12:00",
  },
  {
    id: 4,
    name: "Thursday",
    enabled: false,
    time: "12:00",
  },
  {
    id: 5,
    name: "Friday",
    enabled: false,
    time: "12:00",
  },
  {
    id: 6,
    name: "Saturday",
    enabled: false,
    time: "12:00",
  },
  {
    id: 7,
    name: "Sunday",
    enabled: false,
    time: "12:00",
  },
];

const emptyActivity: NewActivity = {
  name: "",
  days: [],
};

const CreateActivity: FC<CreateActivityProps> = ({ activity, isOpen, setIsOpen }) => {
  const [newActivity, setNewActivity] = useState<NewActivity>(emptyActivity);
  const handleCreate = () => {
    console.log("create", newActivity);
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleChange = (day: DayInt) => {
    setNewActivity({ ...newActivity, days: [...newActivity.days, day] });
  };
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={setIsOpen}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Create an activity</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" strong={true} onClick={handleCreate}>
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          value={newActivity.name}
          onIonChange={(e) => setNewActivity({ ...newActivity, name: e.detail.value! })}
          label="Name"
          labelPlacement="floating"
          fill="outline"
          placeholder="Enter name"
        ></IonInput>
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
