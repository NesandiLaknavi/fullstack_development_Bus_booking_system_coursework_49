import React from "react";
import styles from "./HelpSupport.module.css";
import Contact from "../Contact";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";

export default function HelpSupport() {
  const faqs = [
    {
      question: "How do I book a bus seat?",
      answer:
        'Navigate to the "Seat Booking" page, select your route and date, and pick an available seat from the layout.',
    },
    {
      question: "Can I cancel my booking?",
      answer:
        'Yes, You can cancel your booking by visiting the "Booking Confirmation" section and selecting the ticket you wish to cancel.',
    },
    {
      question: "How can I view my booking details?",
      answer: 'Go to the "Profile" page, listing all your bookings.',
    },
  ];

  return (
    <main className={styles.container} role="main">
      <Header />
      <h1 className={styles.title}>Help & Support</h1>
      <h2 className={styles.subtitle}>FAQs</h2>
      <section
        className={styles.faqSection}
        aria-label="Frequently Asked Questions"
      >
        {faqs.map((faq, index) => (
          <article key={index} className={styles.faqItem}>
            <h2 className={styles.question}> * {faq.question}</h2>
            <p className={styles.answer}>{faq.answer}</p>
          </article>
        ))}
      </section>

      <section className={styles.fb}>
        <h2 className={styles.subtitle}>Feedback</h2>
          <p className={styles.msg}>We would love to hear your thoughts, suggestions, or any concerns you may have!</p><br/>
          <Contact/>
      </section>
      <Footer/>

      
    </main>
  );
}
