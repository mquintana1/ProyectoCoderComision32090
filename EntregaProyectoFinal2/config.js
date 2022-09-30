import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const firebaseKey = JSON.parse(fs.readFileSync(__dirname + '/firebase.json', 'utf-8'));
const mongoConection = JSON.parse(fs.readFileSync(__dirname + '/mongo.json', 'utf-8'));

const config = {
  dbPath: __dirname + '/db',
  firestore: firebaseKey,
  mongodb: mongoConection,
  env: process.argv[2],
  isAdmin: true,
};

export default config;