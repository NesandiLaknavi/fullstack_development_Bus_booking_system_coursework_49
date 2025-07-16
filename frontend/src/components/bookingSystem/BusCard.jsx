import React, { useState } from "react";
import styles from "./BusCard.module.css";
import Axios from "axios";

export function BusCard({ busId, rating, from, to, time, info }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // For the login modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBookingSuccessModalOpen, setIsBookingSuccessModalOpen] =
    useState(false); // Success modal state
  const [successBookingId, setSuccessBookingId] = useState(null); // Store booking ID for display

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const handleBookNow = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setIsLoginModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault(); // Prevent form submission to avoid page reload

    // Generate a numeric booking ID
    const bookingId = Date.now(); // Produces a unique number

    // Ensure data matches schema requirements
    const bookingData = {
      bookingId, // Numeric ID
      from: String(from), // Ensure it is a string
      to: String(to), // Ensure it is a string
      busId: String(busId), // Ensure it is a string
      time: String(time), // Convert to number if it's not already
    };

    Axios.post("http://localhost:3001/api/addbookingdata", bookingData)
      .then((response) => {
        console.log("Booking successful:", response.data);
        setSuccessBookingId(bookingId); // Set the booking ID
        setIsPaymentModalOpen(false); // Close payment modal
        setIsBookingSuccessModalOpen(true); // Open success modal
      })
      .catch((error) => {
        console.error("Error during booking:", error.message);
        alert("Failed to confirm booking. Please try again.");
      });
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setIsBookingSuccessModalOpen(false);
  };

  return (
    <article className={styles.busCard}>
      <header className={styles.cardHeader}>
        <div className={styles.busInfo}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a66c24cde0ec48d483a83283711b9d26/acc19c346a5e34c538df62cf490ce64859f944a2e1eb3f521ea10a95c4dfacfa?apiKey=a66c24cde0ec48d483a83283711b9d26&"
            alt="Bus icon"
            className={styles.busIcon}
          />
          <span className={styles.busId}>{busId}</span>
        </div>
        <div className={styles.rating}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a66c24cde0ec48d483a83283711b9d26/402042bdedf78b4af3c72d079e147d43a5c5be8bee4eeb281b223bcd742f437b?apiKey=a66c24cde0ec48d483a83283711b9d26&"
            alt="Rating"
            className={styles.ratingIcon}
          />
          <span>{rating}</span>
        </div>
      </header>

      <p className={styles.description}>{info}</p>

      <div className={styles.features}>
        <h3 className={styles.featuresTitle}>
          From <span className={styles.featureTag}>{from}</span>
        </h3>
      </div>

      <div className={styles.classInfo}>
        <h3 className={styles.classTitle}>
          To <span className={styles.classTag}>{to}</span>
        </h3>
      </div>

      <div className={styles.classInfo}>
        <h3 className={styles.classTitle}>
          Time <span className={styles.timeTag}>{time}</span>
        </h3>
      </div>

      <button className={styles.bookButton} onClick={handleBookNow}>
        Book Now
      </button>

      {/* Booking Confirmation Modal */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Confirm Your Booking</h2>
            <p>Bus ID: {busId}</p>
            <p>
              From: {from} to {to}
            </p>
            <p>Time: {time}</p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmBooking}
              >
                Confirm
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Please Log In</h2>
            <p>You must be logged in to book a bus.</p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={handleLoginModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {isPaymentModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Payment Details</h2>
            <form
              className={styles.paymentForm}
              onSubmit={handleConfirmPayment}
            >
              <div className={styles.formGroup}>
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  required
                  value={formData.cardName}
                  onChange={handleFormChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  required
                  value={formData.cardNumber}
                  onChange={handleFormChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  required
                  value={formData.cvv}
                  onChange={handleFormChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="month"
                  id="expiryDate"
                  name="expiryDate"
                  required
                  value={formData.expiryDate}
                  onChange={handleFormChange}
                />
              </div>
              <div className={styles.modalActions}>
                <button className={styles.confirmButton} type="submit">
                  Confirm Payment
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={handleClosePaymentModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {isBookingSuccessModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Booking Complete!</h2>
            <p>Your booking is confirmed.</p>
            <p>
              <strong>Booking ID:</strong> {successBookingId}
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={handleCloseSuccessModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
