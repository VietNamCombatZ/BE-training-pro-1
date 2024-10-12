import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12341234",
    database: "sgroup",
    port: 3306,
});
export default pool;
