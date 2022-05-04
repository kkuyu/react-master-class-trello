import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelector, minutesState } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [hours, setHours] = useRecoilState(hoursSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <input type="number" value={minutes} onChange={onMinutesChange} placeholder="Minutes" />
      <input type="number" value={hours} onChange={onHoursChange} placeholder="Hours" />
    </div>
  );
}

export default App;
