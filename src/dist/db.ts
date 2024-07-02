import mysql from 'mysql2'
import * as dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: 5000,
    connectionLimit: 5,



})