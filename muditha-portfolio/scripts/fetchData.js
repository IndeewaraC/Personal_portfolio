import { client } from '../src/contentfulClient.js';
import fs from 'fs';
import path from 'path';

const contentTypes = [
  { type: 'experience', order: '-sys.createdAt' },
  { type: 'affiliation', order: '-sys.createdAt' },
  { type: 'awards', order: '-sys.createdAt' },
  { type: 'certifications', order: '-sys.createdAt' },
  { type: 'education', order: '-sys.createdAt' },
  { type: 'hobbies', order: '-sys.createdAt' },
  { type: 'leadership', order: '-sys.createdAt' },
  { type: 'publication', order: '-fields.date' },
  { type: 'conferences', order: '-fields.date' },
  { type: 'skills', order: '-sys.createdAt' },
  { type: 'profile', order: '-sys.createdAt' },
  { type: 'projects', order: '-sys.createdAt' }
];

async function fetchAllData() {
  const data = {};

  for (const { type, order } of contentTypes) {
    try {
      const response = await client.getEntries({
        content_type: type,
        order: order,
      });
      data[type] = response;
      console.log(`Fetched ${response.items.length} ${type} entries`);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  }

  return data;
}

async function saveData(data) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'staticData.js');
  const content = `export const staticData = ${JSON.stringify(data, null, 2)};`;

  fs.writeFileSync(filePath, content);
  console.log('Data saved to staticData.js');
}

fetchAllData().then(saveData).catch(console.error);