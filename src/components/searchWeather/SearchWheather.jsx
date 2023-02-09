import React, { useContext, useState } from "react";
import { weatherContext } from "../../App";

import styles from "./search.module.scss";

import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const WeatherSearch = () => {
  const { onClickLocationBtn, setError, searchLocation } =
    useContext(weatherContext);

  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    searchLocation(value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setError(false);
  };

  const onClickLocation = () => {
    onClickLocationBtn();
    setValue("");
  };
  return (
    <div className={styles.searchBlock}>
      <form onSubmit={handleSubmit}>
        <FmdGoodIcon onClick={onClickLocation} className={styles.location} />
        <TextField
          className={styles.input}
          placeholder="Enter a location"
          value={value}
          onChange={onChange}
        />
        <Button className={styles.btn} type="submit" variant="contained">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default WeatherSearch;
