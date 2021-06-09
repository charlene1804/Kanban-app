/** But de ce fichier:
 * - require tous les models
 * - créer les associations
 * - ré-exporter tous les models dans un seul objet
 **/

const List = require('./list');
const Card = require('./card');
const Tag = require('./tag');

// une List possède plusieurs Card
List.hasMany(Card, {
    // le nom de la clef étrangère
    foreignKey: "list_id",

    // l'alias de l'association 
    as: "cards"
});

// une Card appartient à une List
Card.belongsTo(List, {
    // le nom de la clef étrangère
    foreignKey: "list_id",

    // l'alias de l'association 
    as: "list"
});


// une Card appartient à plusieurs Tag
Card.belongsToMany(Tag, {
    // le nom de la table de liaison
    through: "card_has_tag",

    // le nom de la clef qui correspond à Card
    foreignKey: "card_id",

    // le nom de la clef qui correspond à Tag
    otherKey: "tag_id",

    // l'alias de l'association
    as: "tags"
});

// un Tag appartient à plusieurs Card
Tag.belongsToMany(Card, {
    // le nom de la table de liaison
    through: "card_has_tag",

    // le nom de la clef qui correspond à Tag
    foreignKey: "tag_id",

    // le nom de la clef qui correspond à Card
    otherKey: "card_id",

    // l'alias de l'association
    as: "cards"
});


// on oublie pas d'exporter !
module.exports = {
    List,
    Card,
    Tag
};