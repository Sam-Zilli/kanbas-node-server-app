import 'dotenv/config';
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const insertTestDocument = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');


    const db = mongoose.connection.db;

    const admin = db.admin();
    const databases = await admin.listDatabases();
    const dbNames = databases.databases.map(d => d.name);
    if (!dbNames.includes('kanbas')) {
      console.log('The kanbas database does not exist.');
      return;
    }
    else {
        console.log("it exists!")
    }
    const result = await db.collection('courses').insertOne({
      number: 'TEST101',
      name: 'Test Course',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      department: 'TEST',
      credits: 3,
      description: 'This is a test course description.'
    });

    console.log('Test document inserted into kanbas database:', result.insertedId);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

insertTestDocument();