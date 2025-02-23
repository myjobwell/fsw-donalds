// import { PrismaClient } from "@prisma/client";

// declare global {
//   var cachedPrisma: PrismaClient;
// }

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient();
//   }

//   prisma = global.cachedPrisma;
// }

// export const db = prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { cachedPrisma?: PrismaClient };

export const db = globalForPrisma.cachedPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.cachedPrisma = db;


