import React, { useState, useEffect } from "react";
import styles from "./AdminPage.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Axios from "axios";

export function AdminPage() {
  const navigate = useNavigate();

  const [bookingsData, setBookingsData] = useState([]);
  const [buses, setBusData] = useState([]);

  const [editingBus, setEditingBus] = useState(null); 

  // Fetch booking and bus data on component mount
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.get("http://localhost:3001/api/bookingdata")
      .then((response) => {
        console.log("Booking Data:", response.data);
        setBookingsData(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error.message);
      });

    Axios.get("http://localhost:3001/api/busdata")
      .then((response) => {
        console.log("Bus Data:", response.data);
        setBusData(response.data?.response || []);
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error.message);
      });
  };

  const [formData, setFormData] = useState({
    busId: "",
    info: "",
    from: "",
    to: "",
    rating: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target; // Extract the input field id and value
    setFormData({
      ...formData,
      [id]: value, // Use the id to update the correct field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBus) {
        // Update existing bus
        await Axios.post("http://localhost:3001/api/updatebusdata", formData);
        console.log("Bus updated successfully:", formData);
      } else {
        // Create new bus
        await Axios.post("http://localhost:3001/api/addbusdata", formData);
      }
      getData(); // Refresh data after submission
      setFormData({
        busId: "",
        info: "",
        from: "",
        to: "",
        rating: "",
        time: "",
      });
      setEditingBus(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (busId) => {
    try {
      await Axios.post("http://localhost:3001/api/deletebusdata", { busId });
      console.log("Bus deleted successfully:", busId);
      getData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  const handleEdit = (bus) => {
    setEditingBus(bus);
    setFormData({
      busId: bus.busId,
      info: bus.info || "",
      from: bus.from || "",
      to: bus.to || "",
      rating: bus.rating || "",
      time: bus.time || "", // Include time
    });
  };

  const handleLogout = () => {
    // Navigate to login page when logout button is clicked
    navigate("/login");
  };

  return (
    <main className={styles.adminContainer}>
      <div className={styles.adminHeaderWrapper}>
        <h1 className={styles.adminHeader}>Admin Page</h1>
        <h7 className={styles.adminHeader2} onClick={handleLogout}>
          Logout
        </h7>
      </div>
    
      <div className={styles.contentWrapper}>
        <div className={styles.gridLayout}>
          <form
            className={styles.formContainer}
            onSubmit={handleSubmit}
            aria-label="Bus registration form"
          >
            <div className={styles.formGroup}>
            
                
              
              <input
                type="text"
                id="busId"
                className={styles.formInput}
                value={formData.busId}
                onChange={handleInputChange}
                required
                aria-required="true"
                placeholder="Bus ID"
              />
            </div>
            <div className={styles.formGroup}>
              
              <input
                type="text"
                id="info"
                className={styles.formInput}
                value={formData.info}
                onChange={handleInputChange}
                required
                aria-required="true"
                placeholder="Information"
              />
            </div>
            <div className={styles.formGroup}>
             
              <input
                type="text"
                id="from"
                className={styles.formInput}
                value={formData.from}
                onChange={handleInputChange}
                required
                aria-required="true"
                placeholder="From"
              />
            </div>
            <div className={styles.formGroup}>
              
              <input
                type="text"
                id="to"
                className={styles.formInput}
                value={formData.to}
                onChange={handleInputChange}
                required
                aria-required="true"
                placeholder="To"
              />
            </div>
            <div className={styles.formGroup}>
              
              <input
                type="number"
                id="rating"
                className={styles.formInput}
                value={formData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                required
                aria-required="true"
                placeholder="Rating"
              />
            </div>

            <div className={styles.formGroup}>
              
              <input
                type="time"
                id="time"
                className={styles.formInput}
                value={formData.time}
                onChange={handleInputChange}
                required
                aria-required="true"
                placeholder="Time"
                
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              {editingBus ? "Update" : "Submit"}
            </button>
          </form>

          <section className={styles.busListContainer} aria-label="Bus List">
            <div className={styles.listHeader}>
              <p>Bus ID</p>
              <span>Actions</span>
            </div>
            {buses.map((bus) => (
              <div key={bus.busId} className={styles.busItem}>
                <span className={styles.busId}>{bus.busId}</span>
                <div className={styles.actionButtons}>
                  <button
                    className={styles.updateButton}
                    aria-label={`Update ${bus.busId}`}
                    onClick={() => handleEdit(bus)} 
                  >
                    Update
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(bus.busId)}
                    aria-label={`Delete ${bus.busId}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        <section className={styles.bookingHistorySection}>
          <h2 className={styles.bookingHistoryTitle}>Booking History</h2>

          <div className={styles.bookingGrid} role="list">
            <article className={styles.bookingItem} role="listitem">
              <div className={styles.bookingDetails}>
                <span className={styles.bookingId}>Booking ID</span>
                <span className={styles.busId}>Bus ID</span>
                <span className={styles.from}>From</span>
                <span className={styles.to}>To</span>
                <span className={styles.time}>Time</span>
              </div>
            </article>
          </div>

          <div className={styles.bookingGrid} role="list">
            {bookingsData.map((booking) => (
              <article
                key={booking.bookingId}
                className={styles.bookingItem}
                role="listitem"
              >
                <div className={styles.bookingDetails}>
                  <span className={styles.bookingId}>{booking.bookingId}</span>
                  <span className={styles.busId}>{booking.busId}</span>
                  <span className={styles.from}>{booking.from}</span>
                  <span className={styles.to}>{booking.to}</span>
                  <span className={styles.time}>{booking.time}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}