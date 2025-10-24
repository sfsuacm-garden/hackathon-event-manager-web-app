import * as dotenv from 'dotenv'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env.test');

dotenv.config({ path: envPath});
console.log('✅ Loaded env from:', envPath)
console.log('DATABASE_URL (test):', process.env.DATABASE_URL)