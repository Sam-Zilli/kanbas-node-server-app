import 'dotenv/config';
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const listDatabases = async () => {
  try {

    await mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');

    const db = mongoose.connection.db;
    const admin = db.admin();

    const databases = await admin.listDatabases();
    const dbNames = databases.databases.map(d => d.name);
    console.log('Available databases:', dbNames);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

listDatabases();
