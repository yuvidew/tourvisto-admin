import mysql, { Connection } from "mysql2/promise";

let connection: Connection | null = null;

/**
 * Establishes a MySQL database connection.
 * Reads credentials from environment variables.
 */
export const connectDB = async (): Promise<void> => {
    if (connection) {
        console.log("ℹ️ MySQL is already connected.");
        return;
    }

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("✅ MySQL database is connected.");
    } catch (error) {
        console.error("❌ MySQL connection failed:", error);
        throw error;
    }
};

/**
 * Gets the active MySQL connection.
 * Throws if the connection has not been established yet.
 */
export const getDB = (): Connection => {
    if (!connection) {
        throw new Error("DB not connected yet! Call connectDB() first.");
    }
    return connection;
};
