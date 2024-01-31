import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { statsChartOutline, listOutline, calendarOutline } from "ionicons/icons";
import Activities from "./pages/Activities";
import ToDo from "./pages/ToDo";
import Stats from "./pages/Stats";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Auth from "./pages/Auth";
import { authStore } from "./store/auth";

setupIonicReact();

const App: React.FC = () => {
  const { isLoggedIn } = authStore((state) => state);
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/">
          <Redirect to={isLoggedIn ? "/todo" : "/auth"} />
        </Route>
        {!isLoggedIn && (
          <Route exact path="/auth">
            <Auth />
          </Route>
        )}
        {isLoggedIn && (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                <Redirect to="/todo" />
              </Route>

              <Route exact path="/activities">
                <Activities />
              </Route>
              <Route exact path="/todo">
                <ToDo />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/activities">
                <IonIcon aria-hidden="true" icon={listOutline} />
                <IonLabel>Activities</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/todo">
                <IonIcon aria-hidden="true" icon={calendarOutline} />
                <IonLabel>To do</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/stats">
                <IonIcon aria-hidden="true" icon={statsChartOutline} />
                <IonLabel>Stats</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
