import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../../components/Header";
import "./style.css";

const Stats: React.FC = () => {
  return (
    <IonPage>
      <Header title="Stats" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Stats;
