import app from './app.js';
import mongoose from 'mongoose';

const port = process.env.PORT || 3001;
const uri = 'mongodb+srv://busdb:Admin123@cluster0.u3eot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
