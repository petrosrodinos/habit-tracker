import { IonDatetime, IonItem, IonLabel, IonToggle } from "@ionic/react";
import React, { FC, useState } from "react";
import { Day as DayInt } from "../../../../interfaces/activity";

interface DayProps {
  day: DayInt;
  onChange: (day: DayInt) => void;
}

const Day: FC<DayProps> = ({ day, onChange }) => {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    onChange({ ...day, enabled: !day.enabled });
  };

  const handletimeChange = (e: any) => {
    const time = e.detail.value;
    onChange({ ...day, time });
  };
  return (
    <>
      <IonItem>
        <IonToggle onIonChange={handleToggle}>
          <IonLabel>{day.name}</IonLabel>
        </IonToggle>
      </IonItem>
      {enabled && (
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
