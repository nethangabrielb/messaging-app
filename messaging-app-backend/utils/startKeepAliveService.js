import cron from "node-cron";
import { HeadBucketCommand } from "@aws-sdk/client-s3";
import { prisma } from "../clients/prismaClient.js";
import { s3Client } from "../clients/s3Client.js";

const DEFAULT_CRON = "*/10 * * * *";

const isEnabled = (value) => String(value).toLowerCase() === "true";

const getKeepAliveUrls = () => {
  const rawUrls = process.env.KEEPALIVE_URLS?.trim();

  if (rawUrls) {
    return rawUrls
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);
  }

  if (process.env.SUPABASE_ENDPOINT) {
    return [process.env.SUPABASE_ENDPOINT];
  }

  return [];
};

const pingUrl = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "user-agent": "messaging-app-keepalive",
      },
    });

    console.log(`[keepalive] URL ${url} -> ${response.status}`);
  } catch (error) {
    console.error(`[keepalive] URL ping failed for ${url}:`, error.message);
  }
};

const pingDatabase = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("[keepalive] Database ping OK");
  } catch (error) {
    console.error("[keepalive] Database ping failed:", error.message);
  }
};

const pingStorage = async () => {
  if (!process.env.SUPABASE_BUCKET) {
    console.warn(
      "[keepalive] Storage ping skipped: SUPABASE_BUCKET is not set",
    );
    return;
  }

  try {
    await s3Client.send(
      new HeadBucketCommand({
        Bucket: process.env.SUPABASE_BUCKET,
      }),
    );
    console.log("[keepalive] Storage ping OK");
  } catch (error) {
    console.error("[keepalive] Storage ping failed:", error.message);
  }
};

const runKeepAlive = async () => {
  const urls = getKeepAliveUrls();
  const jobs = urls.map((url) => pingUrl(url));

  if (isEnabled(process.env.KEEPALIVE_DB_PING)) {
    jobs.push(pingDatabase());
  }

  if (isEnabled(process.env.KEEPALIVE_STORAGE_PING)) {
    jobs.push(pingStorage());
  }

  if (jobs.length === 0) {
    console.warn("[keepalive] No keep-alive targets configured");
    return;
  }

  await Promise.allSettled(jobs);
};

const startKeepAliveService = () => {
  if (!isEnabled(process.env.KEEPALIVE_ENABLED)) {
    return;
  }

  const schedule = process.env.KEEPALIVE_CRON || DEFAULT_CRON;

  if (!cron.validate(schedule)) {
    console.error(
      `[keepalive] Invalid KEEPALIVE_CRON value: ${schedule}. Service disabled.`,
    );
    return;
  }

  cron.schedule(schedule, runKeepAlive);
  console.log(`[keepalive] Service started with cron: ${schedule}`);

  runKeepAlive();
};

export default startKeepAliveService;
