"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '3306', 10),
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10), // ✅ default to 3306 for MySQL
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
});
