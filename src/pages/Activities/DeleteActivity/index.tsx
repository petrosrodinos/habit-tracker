import React, { useState, FC } from "react";
import { IonAlert, IonToast } from "@ionic/react";
import { Activity } from "../../../interfaces/activity";
import { useMutation } from "react-query";
import { setActivities } from "../../../services/activity";
import { authStore } from "../../../store/auth";
import { activityStore } from "../../../store/activity";
import { Alert } from "../../../interfaces/alert";
interface DeleteActivityProps {
  isOpen: boolean;
  activity?: Activity;
  onClose: () => void;
}

const DeleteActivity: FC<DeleteActivityProps> = ({ isOpen, activity, onClose }) => {
  const { userId } = authStore((state) => state);
  const { activities, deleteActivity } = activityStore((state) => state);
  const [alert, setAlert] = useState<Alert>();

  const { mutate: setActivitiesMutation } = useMutation(setActivities);
  const handleDeleteActivity = () => {
    const filteredActivities = activities.filter((a) => a.id !== activity?.id);

    const payload = {
      activities: filteredActivities,
      userId: userId,
    };
    setActivitiesMutation(payload, {
      onSuccess: () => {
        deleteActivity(activity?.id as string);
        onClose();
      },
      onError: () => {
        setAlert({
          color: "danger",
          message: "Could not delete activity",
        });
      },
    });
  };
  return (
    <>
      <IonAlert
        isOpen={isOpen}
        header="Delete activity"
        message="Are you sure you want to delete this activity?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: onClose,
          },
          {
            text: "DELETE",
            role: "confirm",
            cssClass: "alert-button-cancel",
            handler: handleDeleteActivity,
          },
        ]}
      ></IonAlert>
      <IonToast
        isOpen={!!alert}
        message={alert?.message}
        onDidDismiss={() => setAlert(undefined)}
        duration={3000}
        color={alert?.color}
      ></IonToast>
    </>
  );
};

export default DeleteActivity;
