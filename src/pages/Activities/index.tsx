import React, { useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./style.css";
import {
  listCircle,
  trashOutline,
  pencilOutline,
  chevronUpCircle,
  colorPalette,
  globe,
  addOutline,
} from "ionicons/icons";
import CreateActivity from "./CreateActivity";
import DeleteActivity from "./DeleteActivity";

const items = [
  {
    name: "Cleaning",
    created: "2021-01-01",
    days: [],
  },
  {
    name: "Cooking",
    created: "2021-01-01",
    days: [],
  },
  {
    name: "Shopping",
    created: "2021-01-01",
    days: [],
  },
];

const Activities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState(items[0]); // [1
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };

  const toggleDeleting = () => {
    setIsDeleting(!isDeleting);
  };

  const handleSelectActivity = (item: any) => {
    setSelectedActivity(item);
    toggleCreating();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CreateActivity
          activity={selectedActivity}
          isOpen={isCreating}
          setIsOpen={toggleCreating}
        />
        <DeleteActivity isOpen={isDeleting} setIsOpen={toggleDeleting} />
        <IonList inset={true}>
          {items.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>{item.name}</IonLabel>
              <IonIcon
                onClick={() => handleSelectActivity(item)}
                className="activity-btn"
                color="success"
                slot="end"
                aria-hidden="true"
                icon={pencilOutline}
              />

              <IonIcon
                onClick={toggleDeleting}
                color="danger"
                slot="end"
                aria-hidden="true"
                className="activity-btn"
                icon={trashOutline}
              />
            </IonItem>
          ))}
        </IonList>

        <IonFab onClick={toggleCreating} slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Activities;
