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
import { activityStore } from "../../store/activity";
import { Activity } from "../../interfaces/activity";
import "./style.css";

const ToDo: FC = () => {
  const { activities, todaysActivities, setTodaysActivities } = activityStore();

  useEffect(() => {
    setTodaysActivities();
  }, [activities]);

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    const draggedItem = todaysActivities.splice(event.detail.from, 1)[0];
    todaysActivities.splice(event.detail.to, 0, draggedItem);
    setTodaysActivities(todaysActivities.slice());
    event.detail.complete();
  }

  function handleItemCompleted(item: Activity) {
    const newItems = [...todaysActivities];
    const itemIndex = newItems.findIndex((i) => i.id === item.id);
    newItems[itemIndex].completed = !todaysActivities[itemIndex].completed;
    setTodaysActivities(newItems);
  }

  return (
    <IonPage>
      <Header title="Todos" />
      <IonContent fullscreen>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {todaysActivities?.map((item, index) => (
              <IonItem key={index}>
                <IonReorder slot="start"></IonReorder>
                <IonLabel className={`${item.completed ? "item-completed" : ""}`}>
                  {item.name}
                </IonLabel>
                <IonCheckbox
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
          {todaysActivities
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
