import React from "react";
import { Header } from "./Header";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.landingPage}>
      <Header />
      <main className={styles.main} role="main">
        <section className={styles.heroSection} aria-label="Welcome section">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/a66c24cde0ec48d483a83283711b9d26/a7494e1961427577a4998c86d16610fbd087d480d4aa202603a1452bfd568fad?apiKey=a66c24cde0ec48d483a83283711b9d26&"
            className={styles.heroImage}
            alt="LKTraveller transportation service showcase"
          />
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Welcome to LKTraveller</h1>
              <p className={styles.heroSubtitle}>
                Your Trusted Partner for Seamless Travel
              </p>
            </div>
            <button
              className={styles.bookNowButton}
              onClick={() => navigate("/booking")}
              aria-label="Book Now"
            >
              Book Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
