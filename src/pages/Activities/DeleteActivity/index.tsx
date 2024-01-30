import React, { useState, FC } from "react";
import { IonAlert } from "@ionic/react";

interface DeleteActivityProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const DeleteActivity: FC<DeleteActivityProps> = ({ isOpen, setIsOpen }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      header="A Short Title Is Best"
      subHeader="A Sub Header Is Optional"
      message="A message should be a short, complete sentence."
      buttons={["Action"]}
      onDidDismiss={setIsOpen}
    ></IonAlert>
  );
};

export default DeleteActivity;
