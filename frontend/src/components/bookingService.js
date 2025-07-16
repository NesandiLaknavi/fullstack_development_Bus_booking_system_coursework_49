import Axios from "axios";

export const fetchBookingData = async () => {
  try {
    const response = await Axios.get("http://localhost:3001/api/bookingdata");
    console.log("Fetched booking data:", response.data); // Logs the entire response
    return response.data?.response || []; // Return the response data if it exists
  } catch (error) {
    console.error("Error fetching booking data:", error);
    return [];
  }
};
