import React, { useState, useEffect } from "react";
import { SearchForm } from "./SearchForm";
import { BusCard } from "./BusCard";
import styles from "./BookingPage.module.css";
import { Header } from "../Home/Header";
import Axios from "axios";
import { Footer } from "../Home/Footer";

export function BookingPage() {
  const [searchQuery, setSearchQuery] = useState({
    from: "",
    to: "",
    time: "",
  });
  const [busData, setBusData] = useState([]); // State to hold bus data fetched from the API
  const [filteredBuses, setFilteredBuses] = useState([]);

  // Fetch bus data from the API when the component mounts
  useEffect(() => {
    Axios.get("http://localhost:3001/api/busdata")
      .then((response) => {
        console.log("Bus data fetched:", response.data);
        setBusData(response.data?.response || []); // Ensure response structure matches your backend
        setFilteredBuses(response.data?.response || []); // Set filtered buses initially
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error.message);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = busData.filter((bus) => {
      const matchesFrom =
        !query.from ||
        bus.from.toLowerCase().includes(query.from.toLowerCase());
      const matchesTo =
        !query.to || bus.to.toLowerCase().includes(query.to.toLowerCase());
      const matchesTime = !query.time || bus.time.includes(query.time);
      return matchesFrom && matchesTo && matchesTime;
    });

    setFilteredBuses(filtered);
  };

  return (
    <>
      <Header />
      <main className={styles.bookPage}>
        <header className={styles.hero}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a66c24cde0ec48d483a83283711b9d26/b6e702fc1ae9fbacf0df545df4be5170ed912755f52a7829916d4e2b67d21c36?apiKey=a66c24cde0ec48d483a83283711b9d26&"
            alt="Book your next ride"
            className={styles.heroImage}
          />
          <h1 className={styles.heroTitle}>Book your next ride</h1>
        </header>

        <section className={styles.searchSection}>
          <SearchForm onSearch={handleSearch} />

          <h2 className={styles.searchResults}>Search Results</h2>

          <div className={styles.resultsGrid}>
            {filteredBuses.length > 0 ? (
              filteredBuses.map((bus, index) => (
                <BusCard key={index} {...bus} />
              ))
            ) : (
              <p>No buses match your search criteria.</p>
            )}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
