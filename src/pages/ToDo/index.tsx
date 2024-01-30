import React, { FC, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ReactSortable } from "react-sortablejs";
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ReactSortable list={state} setList={setState}>
          {state.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </ReactSortable>
      </IonContent>
    </IonPage>
  );
};

export default ToDo;
