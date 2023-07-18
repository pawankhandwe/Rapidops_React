import React from "react";
import { useState, useEffect } from "react";
import "./App.css";



interface TimeState {
  day: string;
  month: string;
  hour: number;
  min: number;
  sec: number;
  date: number;
  year: number;
  amPm: string;
}

const Time= () => {
  const [time, setTime] = useState<TimeState>({
    day: "",
    month: "",
    hour: 0,
    min: 0,
    sec: 0,
    date: 0,
    year: 0,
    amPm: "",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][now.getDay()];
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][now.getMonth()];
      const [hour, min, sec] = [now.getHours(), now.getMinutes(), now.getSeconds()];
      const [date, year] = [now.getDate(), now.getFullYear()];
      const amPm = hour >= 12 ? "PM" : "AM";
      setTime({ day, month, hour, min, sec, date, year, amPm });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);



  return (
    <>
      <div className="parent">
        <div className="div1">{time.day}</div>
        <div className="div2">{time.hour + ":" + time.min}</div>
        <div className="div3">
          {time.amPm}
          <br />
          {time.sec}
        </div>
        <div className="div4">
          {time.month} {time.date} {time.year}
        </div>
      </div>
    </>
  );
};

export default React.memo(Time);
