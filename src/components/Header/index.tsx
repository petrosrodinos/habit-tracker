import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonText,
} from "@ionic/react";
import { powerOutline } from "ionicons/icons";
import React, { FC, useMemo } from "react";
import { authStore } from "../../store/auth";
import { activityStore } from "../../store/activity";
import { logoutUser } from "../../services/auth";
import { useHistory } from "react-router";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { emptyActivities, todaysActivities } = activityStore();
  const location = useHistory();
  const { avatar, logOut } = authStore((state) => state);

  const completedActivities = useMemo(() => {
    return todaysActivities.filter((activity) => activity.completed).length;
  }, [todaysActivities]);

  const handleLogOut = () => {
    logOut();
    emptyActivities();
    logoutUser();
    location.replace("/auth");
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonText slot="start">
          {completedActivities}/{todaysActivities.length}
        </IonText>
        <IonButtons slot="end">
          <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
            <IonFabButton size="small">
              <img src={avatar}></img>
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton>
                <IonIcon onClick={handleLogOut} icon={powerOutline}></IonIcon>
              </IonFabButton>
            </IonFabList>
          </IonFab>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
