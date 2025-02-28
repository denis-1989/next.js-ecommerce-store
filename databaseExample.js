import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// This is connecting to postgres from node.js
const sql = postgres();

console.log(
  'products',
  await sql`
    Select
      *
    FROM
      products
   `,
);

// This is only for the example, in your code you will want
// a persistent connection to the database
await sql.end();
