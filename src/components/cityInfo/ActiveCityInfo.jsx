import React from "react";
import styles from "./cityInfo.module.scss";
const ActiveCityInfo = ({ weather }) => {
  return (
    <>
      {weather && (
        <div className={styles.activeInfoBlock}>
          <p className={styles.cityName}>{weather?.name}</p>

          <div className={styles.tempInfo}>
            <div className={styles.block}>
              <img src={`icons/${weather.weather[0].icon}.png`} alt="" />
              <p className={styles.temp}>{Math.round(weather?.main.temp)}° </p>
            </div>
            <div>
              <div className={styles.addInfo}>
                <p>
                  Humidity: <span>{weather.main.humidity}</span>
                </p>
                <p>
                  Wind: <span>{weather.wind.speed}</span>
                </p>
                <p>
                  Feels like: <span>{weather.main.feels_like}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveCityInfo;
