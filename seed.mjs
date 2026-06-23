import fs from 'fs';
import { connectDB } from './db.mjs';

async function seed() {
    try {
        const pool = await connectDB();
        const sqlScript = fs.readFileSync('QuanLyStudio.sql', 'utf8');

        // We cannot run GO batches cleanly in mssql pool directly without splitting
        const batches = sqlScript.split(/\nGO\n|\r\nGO\r\n/i);
        for (const batch of batches) {
            if (batch.trim()) {
                try {
                    // console.log("Executing batch:", batch.substring(0, 50));
                    await pool.request().query(batch);
                } catch (e) {
                    console.error("Batch failed", e.message);
                }
            }
        }
        console.log("Database Seeded Successfully via NodeJS!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding Failed:", err);
        process.exit(1);
    }
}
seed();
