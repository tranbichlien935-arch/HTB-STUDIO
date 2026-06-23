import mssql from 'mssql/msnodesqlv8.js';

const config = {
    server: 'localhost\\SQLEXPRESS01',
    database: 'StudioDB',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};
// If direct config fails, we will pass connectionString instead.
const configString = "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS01;Database=StudioDB;Trusted_Connection=yes;";

async function testConfig() {
    try {
        const pool = await mssql.connect({ connectionString: configString });
        const result = await pool.request().query('SELECT * FROM Album');
        console.log("Connected Successfully!", result.recordset);
        process.exit(0);
    } catch (err) {
        try {
            const configString2 = "Driver={SQL Server};Server=localhost\\SQLEXPRESS01;Database=StudioDB;Trusted_Connection=yes;";
            const pool = await mssql.connect({ connectionString: configString2 });
            const result = await pool.request().query('SELECT * FROM Album');
            console.log("Connected Successfully with fallback driver!", result.recordset);
            process.exit(0);
        } catch (err2) {
            console.error("Connection Failed:", err2);
            process.exit(1);
        }
    }
}

testConfig();
