// on charge les variables d'environnements
require('dotenv').config();

const { List } = require('./app/models');

// la petite astuce géniale mais un peu risquée : "all"
// https://sequelize.org/master/manual/eager-loading.html#including-everything
List.findByPk(1,{
    include: {all: true, nested: true}
}).then((list) => {
    console.log(`---- ${list.name} ----`);
    console.log('----------------------');
    console.log('----------------------')
    for (const card of list.cards) {
        console.log(`  -- ${card.title} --  `);
        for (const tag of card.tags) {
            console.log(`   - ${tag.name} -   `);
        }
        console.log('----------------------')
    }
});


