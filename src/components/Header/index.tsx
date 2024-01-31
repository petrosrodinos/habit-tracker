import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from "@ionic/react";
import { powerOutline } from "ionicons/icons";
import React, { FC } from "react";
import { authStore } from "../../store/auth";
import { activityStore } from "../../store/activity";
import { logoutUser } from "../../services/auth";
import { useHistory } from "react-router";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { emptyActivities } = activityStore();
  const location = useHistory();
  const { avatar, logOut } = authStore((state) => state);

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
