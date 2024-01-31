import { IonDatetime, IonItem, IonLabel, IonToggle } from "@ionic/react";
import React, { FC } from "react";
import { Day as DayInt } from "../../../../interfaces/activity";

interface DayProps {
  day: DayInt;
  onChange: (day: DayInt) => void;
}

const Day: FC<DayProps> = ({ day, onChange }) => {
  const handleToggle = () => {
    onChange({ ...day, enabled: !day.enabled });
  };

  const handletimeChange = (e: any) => {
    const time = e.detail.value;
    onChange({ ...day, time });
  };
  return (
    <>
      <IonItem>
        <IonToggle checked={day.enabled} onIonChange={handleToggle}>
          <IonLabel>{day.name}</IonLabel>
        </IonToggle>
      </IonItem>
      {day.enabled && (
        <IonDatetime
          value={day.time}
          onIonChange={handletimeChange}
          presentation="time"
        ></IonDatetime>
      )}
    </>
  );
};

export default Day;
