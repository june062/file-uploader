const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

module.exports = {
  prisma: new PrismaClient(),
  pool: new Pool({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    port: process.env.DEV_DB_PORT,
    database: process.env.DEV_DB,
  }),
};
