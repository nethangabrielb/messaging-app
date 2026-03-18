import { PrismaClient } from "../generated/prisma/client.js";

// Use a single PrismaClient instance across the app
// Cache on globalThis in dev to avoid hot-reload duplication
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


