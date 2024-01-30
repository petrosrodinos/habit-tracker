import React, { FC, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonIcon,
  IonToggle,
  IonNote,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from "@ionic/react";
import { ReactSortable } from "react-sortablejs";
import { airplane } from "ionicons/icons";
import "./style.css";

interface ItemType {
  id: number;
  name: string;
}

const ToDo: FC = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
  ]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    setState((state) => {
      const draggedItem = state.splice(event.detail.from, 1)[0];
      state.splice(event.detail.to, 0, draggedItem);
      return state.slice();
    });

    event.detail.complete();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {state.map((item, index) => (
              <IonItem key={index}>
                <IonReorder slot="start"></IonReorder>
                <IonLabel>{item.name}</IonLabel>
                <IonCheckbox />
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ToDo;
