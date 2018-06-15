import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../..", "config", `${env}.json`));

import user from "./user";

config.DB_CONFIG.logging = false;

let sequelize;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, config.DB_CONFIG);
} else {
    sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, config.DB_CONFIG);
}

let db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return file.indexOf(".") !== 0 && file !== "index.js";
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

import db from "../models";

const models = db.sequelize.models;
