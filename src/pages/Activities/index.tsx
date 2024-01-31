import React, { useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
} from "@ionic/react";
import "./style.css";
import { trashOutline, pencilOutline, addOutline } from "ionicons/icons";
import CreateActivity from "./CreateActivity";
import DeleteActivity from "./DeleteActivity";
import { Activity } from "../../interfaces/activity";
import Header from "../../components/Header";
import { activityStore } from "../../store/activity";

const Activities: React.FC = () => {
  const { activities } = activityStore();
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectedDeleteActivity = (item: Activity) => {
    setSelectedActivity(item);
    toggleDeleting();
  };

  const handleSelectActivity = (item: Activity) => {
    setSelectedActivity(item);
    toggleCreating();
  };

  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };

  const toggleDeleting = () => {
    setIsDeleting(!isDeleting);
  };

  const openNewActivityModal = () => {
    setSelectedActivity(undefined);
    toggleCreating();
  };

  return (
    <IonPage>
      <Header title="Activities" />
      <IonContent fullscreen>
        <CreateActivity activity={selectedActivity} isOpen={isCreating} onClose={toggleCreating} />
        <DeleteActivity activity={selectedActivity} isOpen={isDeleting} onClose={toggleDeleting} />
        {activities.length === 0 && (
          <div style={{ marginTop: "20px", marginLeft: "20px" }}>
            <IonLabel>Click the add button to create an activity</IonLabel>
          </div>
        )}
        <IonList inset={true}>
          {activities.map((item: Activity, index: number) => (
            <IonItem key={index}>
              <div>
                <IonLabel>{item.name}</IonLabel>
                <IonNote>{item.description}</IonNote>
              </div>
              <IonIcon
                onClick={() => handleSelectActivity(item)}
                className="activity-btn"
                color="success"
                slot="end"
                aria-hidden="true"
                icon={pencilOutline}
              />

              <IonIcon
                onClick={() => handleSelectedDeleteActivity(item)}
                color="danger"
                slot="end"
                aria-hidden="true"
                className="activity-btn"
                icon={trashOutline}
              />
            </IonItem>
          ))}
        </IonList>

        <IonFab onClick={openNewActivityModal} slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton className="activity-fa-button">
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Activities;
