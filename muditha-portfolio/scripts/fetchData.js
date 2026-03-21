import { client, fetchOrderedData } from '../src/contentfulClient.js';
import fs from 'fs';
import path from 'path';

const contentTypes = [
  'experience',
  'affiliation',
  'awards',
  'certifications',
  'education',
  'hobbies',
  'leadership',
  'publication',
  'conferences',
  'skills',
  'profile',
  'projects'
];

async function fetchAllData() {
  const data = {};

  for (const type of contentTypes) {
    try {
      const entries = await fetchOrderedData(type);
      data[type] = entries;
      console.log(`Fetched ${entries.length} ${type} entries`);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  }

  // Also fetch profile if needed
  // Assuming profile is a separate entry

  return data;
}

async function saveData(data) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'staticData.js');
  const content = `export const staticData = ${JSON.stringify(data, null, 2)};`;

  fs.writeFileSync(filePath, content);
  console.log('Data saved to staticData.js');
}

fetchAllData().then(saveData).catch(console.error);