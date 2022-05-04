import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelector, minutesState } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const hours = useRecoilValue(hoursSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  return (
    <div>
      <input type="number" value={minutes} onChange={onMinutesChange} placeholder="Minutes" />
      <input type="number" value={hours} placeholder="Hours" />
    </div>
  );
}

export default App;
