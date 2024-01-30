import React, { useState, FC } from "react";
import { IonAlert } from "@ionic/react";
import { Activity } from "../../../interfaces/activity";

interface DeleteActivityProps {
  isOpen: boolean;
  activity?: Activity;
  onClose: () => void;
}

const DeleteActivity: FC<DeleteActivityProps> = ({ isOpen, activity, onClose }) => {
  const handleDeleteActivity = () => {
    console.log("Delete activity");
  };
  return (
    <IonAlert
      isOpen={isOpen}
      header="Delete activity"
      message="Are you sure you want to delete this activity?"
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "DELETE",
          role: "confirm",
          cssClass: "alert-button-cancel",
          handler: handleDeleteActivity,
        },
      ]}
      onDidDismiss={onClose}
    ></IonAlert>
  );
};

export default DeleteActivity;
