import React, { useContext } from "react";
import { weatherContext } from "../../App";
import City from "../cityBox/City";
import styles from "./cities.module.scss";
const Cities = () => {
  const { cities } = useContext(weatherContext);
  return (
    <>
      <h1 className={styles.title}>Cities</h1>
      <div className={styles.cities}>
        {cities.map((c) => (
          <City key={c} cityName={c} />
        ))}
      </div>
    </>
  );
};

export default Cities;
