// on require la bonne classe
const { Sequelize } = require('sequelize');


// on instancie cette classe, avec des options
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true, // pour passer en snake_case par défaut

        // pour changer le nom des timestamps dans les models
        createdAt: "created_at",
        updatedAt: "updated_at",

        // c'est la valeur par défaut, donc pas nécessaire.
        // timestamps: true
    }
});


// ne pas oublier d'exporter la connexion !
module.exports = sequelize;
