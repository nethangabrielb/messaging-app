import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  forcePathStyle: true,
  region: "us-east-2",
  endpoint: process.env.SUPABASE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY,
  },
});
