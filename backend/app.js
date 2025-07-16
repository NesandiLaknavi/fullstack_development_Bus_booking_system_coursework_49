import express from 'express';
import cors from 'cors';
import * as controller from './controller.js';
import * as busController from './busController.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Booking Data Endpoints
app.get("/api/bookingdata", controller.getBookingData);
app.post("/api/addbookingdata", controller.addBookingData);
app.post("/api/deletebookingdata", controller.deleteBookingData);
app.post("/api/updatebookingdata", controller.updateBookingData);

// Bus Data Endpoints
app.get("/api/busdata", busController.getBusData);
app.post("/api/addbusdata", busController.addBusData);
app.post("/api/deletebusdata", busController.deleteBusData);
app.post("/api/updatebusdata", busController.updateBusData);

export default app;
