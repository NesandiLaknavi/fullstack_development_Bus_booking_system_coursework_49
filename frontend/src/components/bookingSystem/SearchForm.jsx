import React, { useState } from "react";
import styles from "./SearchForm.module.css";

export function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ from, to, time });
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <div className={styles.locationInput}>
          <label htmlFor="fromLocation" className={styles.visuallyHidden}>
            From Location
          </label>
          <input
            id="fromLocation"
            type="text"
            placeholder="From"
            className={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className={styles.locationInput}>
          <label htmlFor="toLocation" className={styles.visuallyHidden}>
            To Location
          </label>
          <input
            id="toLocation"
            type="text"
            placeholder="To"
            className={styles.input}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className={styles.dateInput}>
          <label htmlFor="travelTime" className={styles.visuallyHidden}>
            Travel Time
          </label>
          <input
            id="travelTime"
            type="time"
            className={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
}
