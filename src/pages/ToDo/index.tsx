import React, { FC, useState, useEffect } from "react";
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
} from "@ionic/react";
import Header from "../../components/Header";
import "./style.css";

interface ItemType {
  id: number;
  name: string;
  completed: boolean;
}

const ToDo: FC = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek", completed: false },
    { id: 2, name: "fiona", completed: false },
  ]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    setState((state) => {
      const draggedItem = state.splice(event.detail.from, 1)[0];
      state.splice(event.detail.to, 0, draggedItem);
      return state.slice();
    });

    event.detail.complete();
  }

  function handleItemCompleted(item: ItemType) {
    const newItems = [...state];
    const itemIndex = newItems.findIndex((i) => i.id === item.id);
    newItems[itemIndex].completed = !state[itemIndex].completed;
    setState(newItems);
  }

  return (
    <IonPage>
      <Header title="Todos" />
      <IonContent fullscreen>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {state
              // .filter((item) => !item.completed)
              .map((item, index) => (
                <IonItem key={index}>
                  <IonReorder slot="start"></IonReorder>
                  <IonLabel className={`${item.completed ? "item-completed" : ""}`}>
                    {item.name}
                  </IonLabel>
                  <IonCheckbox
                    aria-label="completed"
                    checked={item.completed}
                    onIonChange={() => handleItemCompleted(item)}
                  />
                </IonItem>
              ))}
          </IonReorderGroup>
        </IonList>
        <br />
        <br />
        <IonList>
          {state
            .filter((item) => item.completed)
            .map((item, index) => (
              <IonItem key={index}>
                <IonLabel>{item.name}</IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ToDo;
