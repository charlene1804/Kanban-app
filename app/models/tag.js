const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Tag extends Model {

};


Tag.init({
    name: DataTypes.TEXT,
    color: DataTypes.TEXT
}, {
    // le nom de la table
    tableName: "tag",

    // l'instance de connexion
    sequelize
});

module.exports = Tag;