'use server';

import postgres, { type Sql } from 'postgres';
import { setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare namespace globalThis {
  let postgresSqlClient: Sql;
}

// export const sql = postgres({
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// });

function connectOneToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }

  return globalThis.postgresSqlClient;
}

export const sql = connectOneToDatabase();

// Count postgres connection slot
// sql`
//     Select
//       count(*)
//     FROM
//       pg_stat_activity;
//    `
//   .then((result) => console.log('result: ', result))
//   .catch((error) => error);
