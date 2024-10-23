"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../model/user.entity");
const post_entity_1 = require("../model/post.entity");
const role_entity_1 = require("../model/role.entity");
const permission_entity_1 = require("../model/permission.entity");
(0, dotenv_1.config)();
exports.default = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user_entity_1.User, post_entity_1.Post, role_entity_1.Role, permission_entity_1.Permission],
    migrationsTableName: "migrations",
    migrations: [(0, path_1.join)(__dirname, "../../src/migrations/**/*.ts")],
    synchronize: false,
});
