import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

const uri = 'mongodb+srv://busdb:Admin123@cluster0.u3eot.mongodb.net/bookme_test?retryWrites=true&w=majority&appName=Cluster0';

describe('API Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }, 30000);

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }, 30000);

  // Booking Endpoints
  describe('Booking Endpoints', () => {
    it('GET /api/bookingdata should return booking data', async () => {
      const response = await request(app).get('/api/bookingdata');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    }, 10000);

    it('POST /api/addbookingdata should add new booking', async () => {
      const bookingData = {
        userId: "test-user",
        busId: "test-bus",
        seatNumber: "A1",
        date: new Date().toISOString()
      };
      const response = await request(app)
        .post('/api/addbookingdata')
        .send(bookingData);
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
    }, 10000);

    it('POST /api/updatebookingdata should update booking', async () => {
      // First create a booking to update
      const booking = await request(app)
        .post('/api/addbookingdata')
        .send({
          userId: "test-user",
          busId: "test-bus",
          seatNumber: "A1",
          date: new Date().toISOString()
        });

      const updateData = {
        bookingId: booking.body._id,
        seatNumber: "B2"
      };
      const response = await request(app)
        .post('/api/updatebookingdata')
        .send(updateData);
      expect(response.status).toBe(200);
      expect(response.body.seatNumber).toBe("B2");
    }, 10000);

    it('POST /api/deletebookingdata should delete booking', async () => {
      // First create a booking to delete
      const booking = await request(app)
        .post('/api/addbookingdata')
        .send({
          userId: "test-user",
          busId: "test-bus",
          seatNumber: "A1",
          date: new Date().toISOString()
        });

      const deleteData = {
        bookingId: booking.body._id
      };
      const response = await request(app)
        .post('/api/deletebookingdata')
        .send(deleteData);
      expect(response.status).toBe(200);
    }, 10000);
  });

  // Bus Endpoints
  describe('Bus Endpoints', () => {
    it('GET /api/busdata should return bus data', async () => {
      const response = await request(app).get('/api/busdata');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    }, 10000);

    it('POST /api/addbusdata should add new bus', async () => {
      const busData = {
        busNumber: "TEST-123",
        route: "Test Route",
        capacity: 40
      };
      const response = await request(app)
        .post('/api/addbusdata')
        .send(busData);
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
    }, 10000);

    it('POST /api/updatebusdata should update bus', async () => {
      // First create a bus to update
      const bus = await request(app)
        .post('/api/addbusdata')
        .send({
          busNumber: "TEST-123",
          route: "Test Route",
          capacity: 40
        });

      const updateData = {
        busId: bus.body._id,
        route: "Updated Test Route"
      };
      const response = await request(app)
        .post('/api/updatebusdata')
        .send(updateData);
      expect(response.status).toBe(200);
      expect(response.body.route).toBe("Updated Test Route");
    }, 10000);

    it('POST /api/deletebusdata should delete bus', async () => {
      // First create a bus to delete
      const bus = await request(app)
        .post('/api/addbusdata')
        .send({
          busNumber: "TEST-123",
          route: "Test Route",
          capacity: 40
        });

      const deleteData = {
        busId: bus.body._id
      };
      const response = await request(app)
        .post('/api/deletebusdata')
        .send(deleteData);
      expect(response.status).toBe(200);
    }, 10000);
  });
}); 