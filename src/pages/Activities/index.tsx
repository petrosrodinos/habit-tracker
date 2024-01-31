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

const Activities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const handleEditActivity = (id: string, activity: Activity) => {
    const index = activities.findIndex((item) => item.id === id);
    const newActivities = [...activities];
    newActivities[index] = activity;
    setActivities(newActivities);
  };

  const handleDeleteActivity = (item: any) => {
    setSelectedActivity(item);
    toggleDeleting();
  };

  const handleSelectActivity = (item: any) => {
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
        <CreateActivity
          activity={selectedActivity}
          isOpen={isCreating}
          onClose={toggleCreating}
          onCreate={handleCreateActivity}
          onEdit={handleEditActivity}
        />
        <DeleteActivity activity={selectedActivity} isOpen={isDeleting} onClose={toggleDeleting} />
        {activities.length === 0 && (
          <div style={{ marginTop: "20px", marginLeft: "20px" }}>
            <IonLabel>Click the add button to create an activity</IonLabel>
          </div>
        )}
        <IonList inset={true}>
          {activities.map((item, index) => (
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
                onClick={() => handleDeleteActivity(item.id)}
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
