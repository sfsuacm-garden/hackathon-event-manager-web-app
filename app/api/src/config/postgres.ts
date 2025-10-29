// For direct interaction with database

import postgres from 'postgres';
const connectionString: string = process.env.DATABASE_URL ?? 'Env var not found';
const sql: postgres.Sql<{}> = postgres(connectionString);

export default sql;
