const { Color, ComponentBoxType, IconType, MobileActionType } = require('../../types');

const seedCampaigns = require('./seed_campaigns');
const seedNotes = require('./seed_notes');

const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbConnectionString = process.env.MONGODB;

const main = async () => {
  await mongoose.connect(mongoDbConnectionString);

  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  for (const collection of collections) {
    await db.dropCollection(collection.name);
  }

  await seedCampaigns();
  await seedNotes();

  mongoose.disconnect();
};

main();
