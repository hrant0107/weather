import React, { useCallback, useContext } from "react";
import { WEEKDAYS } from "../../constant";
import ActiveInfo from "../activeInfo/ActiveInfo";
import Forcast from "../forcastList/Forcast";
import styles from "./myLocation.module.scss";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { weatherContext } from "../../App";

const MyLocation = () => {
  const { addFavoriteCity, forcastData } = useContext(weatherContext);

  const onClickBookMark = () => {
    addFavoriteCity(forcastData.city?.name);
  };

  const getWeekday = useCallback((date) => {
    const currentTime = new Date(date * 1000);
    return WEEKDAYS[currentTime.getDay()];
  }, []);

  const getDate = useCallback((date) => {
    return new Date(date * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  return (
    <>
      {forcastData && (
        <div className={styles.locationBlock}>
          <BookmarkAddIcon
            onClick={onClickBookMark}
            className={styles.bookMarkIcon}
          />
          <ActiveInfo />
          <h2 className={styles.title}>Hourly Forecast</h2>
          <ul className={styles.hours}>
            {forcastData.list &&
              forcastData.list
                .slice(0, 5)
                .map((item) => (
                  <Forcast key={item.dt} item={item} getDate={getDate} />
                ))}
          </ul>

          <h2 className={styles.title}>Daily Forecast</h2>
          <ul className={`${styles.days} ${styles.hours}`}>
            {forcastData.list &&
              forcastData.list.map(
                (item, i) =>
                  i % 8 === 0 && (
                    <Forcast
                      key={item.dt}
                      item={item}
                      getWeekday={getWeekday}
                    />
                  )
              )}
          </ul>
        </div>
      )}
    </>
  );
};

export default MyLocation;
