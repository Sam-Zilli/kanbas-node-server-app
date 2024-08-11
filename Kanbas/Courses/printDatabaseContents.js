import 'dotenv/config';
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const printDatabaseContents = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    for (const collection of collections) {
      console.log(`\nCollection: ${collection.name}`);
      const docs = await db.collection(collection.name).find().toArray();
      console.log(`Documents in ${collection.name}:`, docs);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

printDatabaseContents();