import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const AUTH_CREDENTIALS = `${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}`;
  const DB_NAME = `${process.env.MONGO_DB_NAME}`;
  const CLUSTER = `${process.env.MONGO_DB_CLUSTER}`;

  const MONGO_DB_URL = `mongodb+srv://${AUTH_CREDENTIALS}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

  try {
    mongoose.set('debug', true);
    await mongoose.connect(MONGO_DB_URL);
    console.log('Successfully connected to db.');
  } catch (error) {
    console.log('Connection to db failed!', error);
  }
};

export default connectDB;
