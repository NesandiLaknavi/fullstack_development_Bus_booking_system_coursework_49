import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Axios from "axios"; // Import Axios for making HTTP requests
import { fetchBookingData } from "../bookingService";

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [bookingsData, setBookingsData] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

 //Fetch user data and bookings on component mount
 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser); // Set the user state to the stored data
  }
}, []);

//Fetch booking data on component mount
useEffect(() => {
  const getBookings = async () => {
    const data = await fetchBookingData();
    console.log("Booking data in useEffect:", data); // Log fetched data
    setBookingsData(data); // Update state with fetched data
  };
  getBookings();
}, []); // Empty dependency array ensures this runs only once

 const handleProfileUpdate = (e) => {
  e.preventDefault(); // Prevent form submission from refreshing the page

  // Save the updated user data to localStorage
  localStorage.setItem("user", JSON.stringify(user));
  alert("Profile updated successfully"); // Notify the user about the successful update
};

  // Function to delete booking data
  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await Axios.post(
        `http://localhost:3001/api/deletebookingdata`,
        { bookingId } // Send the bookingId in the request body
      );
      if (response.status === 200) {
        setBookingsData((prevBookings) =>
          prevBookings.filter((booking) => booking.bookingId !== bookingId)
        );
        alert("Booking deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting booking", error);
      alert("Failed to delete booking");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage (logout)
    navigate("/login"); // Redirect to the login page
  };

  return (
    <main className={styles.profilePage}>
      <header className={styles.header} role="banner">
        <Link to="/Header.jsx" className={styles.logo}>BookMe</Link>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </header>
      
      <form className={styles.profileForm} onSubmit={handleProfileUpdate}  aria-label="Profile information form">
        <div className={styles.avatarContainer}></div>
        <div className={styles.infoContainer}>
          <div className={styles.infoGroup}>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={user.name}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
              }
              required
            />
          </div>

          <div className={styles.infoGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={user.email}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
              }
              required
            />
          </div>

          <div className={styles.infoGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <div className={styles.passwordContainer}>
              <input
                type={passwordVisible ? "text" : "password"} // Toggle input type based on state
                id="password"
                className={styles.input}
                value={user.password}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }
                required
              />
              <button
                type="button"
                className={styles.eyeIconButton}
                onClick={() => setPasswordVisible((prev) => !prev)} // Toggle password visibility
                aria-label="Toggle password visibility"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Show the corresponding icon */}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.updateButton}  aria-label="Update profile information">Update</button>
      </form>

      <section className={styles.bookingsSection} aria-label="Booking history">
        <h2 className={styles.visuallyHidden}>Booking History</h2>
        <div className={styles.bookingsList}>
          { bookingsData.map((booking) => (
            <article key={booking.bookingId} className={styles.bookingItem}  aria-labelledby={`booking-${booking.bookingId}`}>
              <div className={styles.bookingDetail}>
                <span className={styles.bookingLabel}>Booking ID</span>
                <span
                  id={`booking-${booking.bookingId}`}
                  className={styles.bookingValue}
                >
                  {booking.bookingId}
                </span>
              </div>
              <div className={styles.bookingDetail}>
                <span className={styles.bookingLabel}>From</span>
                <span className={styles.bookingValue}>{booking.from}</span>
              </div>
              <div className={styles.bookingDetail}>
                <span className={styles.bookingLabel}>To</span>
                <span className={styles.bookingValue}>{booking.to}</span>
              </div>
              <div className={styles.bookingDetail}>
                <span className={styles.bookingLabel}>Time</span>
                <span className={styles.bookingValue}>{booking.time}</span>
              </div>
              <div className={styles.bookingDetail}>
                <span className={styles.bookingLabel}>Bus Id</span>
                <span className={styles.bookingValue}>{booking.busId}</span>
              </div>
              <div className={styles.bookingDetail}>
                <button className={styles.deleteButton} onClick={() => handleDeleteBooking(booking.bookingId)} aria-label="Delete this booking">
                  Delete
                </button>
              </div>
            </article>
           ))};
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
