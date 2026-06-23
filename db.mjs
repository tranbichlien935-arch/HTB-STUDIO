import mssql from 'mssql/msnodesqlv8.js';

const configString = "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS01;Database=QuanLyStudio;Trusted_Connection=yes;";
const configStringFallback = "Driver={SQL Server};Server=localhost\\SQLEXPRESS01;Database=QuanLyStudio;Trusted_Connection=yes;";

let dbPool = null;

export async function connectDB() {
    if (dbPool) return dbPool;
    try {
        dbPool = await mssql.connect({ connectionString: configString });
        console.log('Connected to MS SQL Server (QuanLyStudio) via ODBC Driver 17');
        return dbPool;
    } catch (err) {
        try {
            dbPool = await mssql.connect({ connectionString: configStringFallback });
            console.log('Connected to MS SQL Server (QuanLyStudio) via SQL Server default driver');
            return dbPool;
        } catch (err2) {
            console.error('Database Connection Failed', err2);
            throw err2;
        }
    }
}
