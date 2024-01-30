import React, { useState, FC } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";

interface CreateActivityProps {
  activity?: any;
  onSave?: () => void;
  isOpen: boolean;
  setIsOpen: () => void;
}

const CreateActivity: FC<CreateActivityProps> = ({ activity, onSave, isOpen, setIsOpen }) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={setIsOpen}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae
          ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt
          omnis id illo sit cum qui. Eaque, dicta.
        </p>
      </IonContent>
    </IonModal>
  );
};

export default CreateActivity;
