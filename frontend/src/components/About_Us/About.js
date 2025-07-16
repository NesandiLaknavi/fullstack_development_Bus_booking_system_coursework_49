import React from "react";
import styles from "../Home/LandingPage.module.css";
import { Header } from "../Home/Header";
import backgroundImage from "../assets/Bus.png";

export default function About() {
  return (
    <div
      className={styles.content}
      style={{
        backgroundImage: `url({https://media.licdn.com/dms/image/v2/D5612AQHHTTICSfxTgg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1693153639814?e=2147483647&v=beta&t=wnQme2KlFUkFjzB7ydAEDsbKggNKgZefaKz_36RtDeY})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <section className={styles.featuresSection} aria-labelledby="whyChooseUs">
        <h2 id="whyChooseUs" className={styles.sectionTitle}>
          Why Choose Us?
        </h2>
        <div className={styles.featuresList}>
          {[
            {
              title: "Reliable Service:",
              description: "Guaranteed on-time departures and arrivals.",
            },
            {
              title: "Easy Booking:",
              description: "Quick and hassle-free online booking system.",
            },
            {
              title: "Comfortable Rides:",
              description: "Modern buses with all essential amenities.",
            },
            {
              title: "Real-Time Updates:",
              description: "Track your bus in real-time and stay informed.",
            },
          ].map((feature, index) => (
            <div key={index} className={styles.feature}>
              <strong className={styles.featureTitle}>{feature.title}</strong>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.aboutSection} aria-labelledby="aboutUs">
        <h2 id="aboutUs" className={styles.sectionTitle}>
          About Us
        </h2>
        <p className={styles.aboutText}>
          At BOOKME, we believe in transforming how people travel. With a
          focus on reliability, convenience, and innovation, we provide seamless
          transportation solutions for everyone. Whether you're commuting daily
          or planning a special trip, we're here to make your journey smooth and
          memorable.
        </p>
      </section>

      <section className={styles.valuesSection} aria-labelledby="ourValues">
        <h2 id="ourValues" className={styles.sectionTitle}>
          Our Values
        </h2>
        <div className={styles.valuesList}>
          {[
            {
              title: "Customer-Centric:",
              description: "Your comfort and safety are our priority.",
            },
            {
              title: "Innovation:",
              description:
                "Constantly enhancing our platform with the latest technology.",
            },
            {
              title: "Sustainability:",
              description:
                "Committed to eco-friendly practices in all operations.",
            },
          ].map((value, index) => (
            <div key={index} className={styles.valueItem}>
              <strong className={styles.valueTitle}>{value.title}</strong>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ContactTitle}>Contact Us: </p>
          <p className={styles.ContactDetails}>Email: bookme.com</p>
          <p className={styles.ContactDetails}>Phone: +94 (011) 123-4567</p>
        </div>
      </section>
    </div>
  );
}