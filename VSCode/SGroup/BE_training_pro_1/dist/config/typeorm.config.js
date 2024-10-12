import { config } from "dotenv";
import { DataSource } from "typeorm";
config();
export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    //   entities: [User],
    migrationsTableName: "migrations",
    //   migrations: [join(__dirname, "../../src/migrations/**/*.ts")],
    synchronize: false,
});
