import mysql from "mysql2/promise";

export async function connectToDB() {
    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "nhbnbrfkt",
        database: "cwrsu",
    });
}
