import React from "react";
import styles from "./forcast.module.scss";

const Forcast = ({ item, getWeekday, getDate }) => {
  return (
    <li>
      <p>{getWeekday ? getWeekday(item.dt) : getDate(item.dt)}</p>
      <img
        className={styles.icon}
        src={`icons/${item.weather[0].icon}.png`}
        alt="icon"
      />
      <p>{Math.round(item.main.temp)} °</p>
    </li>
  );
};

export default Forcast;
