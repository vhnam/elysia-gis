import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_TOKEN!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_TOKEN!,
  },
});

async function listObjects(prefix?: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    Prefix: prefix,
  });
  const response = await S3.send(command);
  return response.Contents?.map((obj) => obj.Key) || [];
}

async function downloadGeoJSON(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    Key: key,
  });
  const response = await S3.send(command);
  const body = await response.Body?.transformToByteArray();
  return body;
}

async function main() {
  const dataDir = join(import.meta.dir, '../../data');

  const keys = [
    'administrative-unit/administrative-unit__provinces.geojson',
    'administrative-unit/administrative-unit__wards.geojson',
    'administrative-unit-legacy/administrative-unit-legacy__provinces.geojson',
    'administrative-unit-legacy/administrative-unit-legacy__districts.geojson',
    'administrative-unit-legacy/administrative-unit-legacy__wards.geojson',
  ];

  // Clear files and directories in data directory
  const items = readdirSync(dataDir);
  for (const item of items) {
    const itemPath = join(dataDir, item);
    const stats = statSync(itemPath);
    console.log(`🗑️  Deleting ${itemPath}...`);
    if (stats.isDirectory()) {
      rmSync(itemPath, { recursive: true, force: true });
    } else {
      unlinkSync(itemPath);
    }
  }

  // List objects to help debug if keys are incorrect
  console.log('🔍 Listing objects in bucket...');

  // Extract unique prefixes from keys (e.g., 'administrative-unit/', 'administrative-unit-legacy/')
  const prefixes = [...new Set(keys.map((key) => key.split('/')[0] + '/'))];

  let foundObjects = false;
  for (const prefix of prefixes) {
    const objects = await listObjects(prefix);
    if (objects.length > 0) {
      console.log(`📋 Found objects with prefix "${prefix}":`);
      objects.forEach((key) => console.log(`  - ${key}`));
      foundObjects = true;
    }
  }

  if (!foundObjects) {
    console.log('⚠️  No objects found with expected prefixes');
    console.log('📋 Listing all objects in bucket...');
    const allObjects = await listObjects();
    if (allObjects.length > 0) {
      allObjects.forEach((key) => console.log(`  - ${key}`));
    } else {
      console.log('⚠️  Bucket appears to be empty');
    }
  }

  for (const key of keys) {
    console.log(`📥 Downloading ${key}...`);
    const data = await downloadGeoJSON(key);

    if (!data) {
      console.error(`❌ Failed to download ${key}`);
      continue;
    }

    const filePath = join(dataDir, key);
    const fileDir = dirname(filePath);

    // Ensure directory exists before writing
    mkdirSync(fileDir, { recursive: true });

    console.log(`💾 Writing to ${filePath}...`);
    writeFileSync(filePath, Buffer.from(data).toString('utf-8'));
  }

  console.log('✅ Download complete!');
}

main();
