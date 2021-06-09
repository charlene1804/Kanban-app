const { Card } = require('../models');

// un objet d'options qu'on passera à toutes les méthodes find...
const findOptions = {
    include: {all: true, nested: true},
    order: [
        // d'abord ranger les listes par positions croissantes
        ['position', 'ASC']
    ]
};

const cardController = {

    getAll: async (req, res, next) => {
        try {
            const cards = await Card.findAll(findOptions);
            res.json( cards );
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message,
                "hint": error.original.hint
            } );
        }
    },

    getOne: async (req, res, next) => {
        try {
            //1. récupérer l'id cible
            const cardId = parseInt(req.params.id, 10);

            //2. récupérer la liste ciblée
            const card = await Card.findByPk(cardId,findOptions);

            //3. renvoyer, soit la liste, soit une erreur 404
            if (card) {
                res.json(card);
            } else {
                // on passe au MW suivant (le "404 not found")
                next();
            }
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message,
                "hint": error.original.hint
            });
        }
    },

    create: async (req, res, next) => {
        try {

            // utiliser les méthodes statiques des models (cf la doc de Sequelize)
            const newCard = await Card.create(req.body);

            // lors d'une création (ça sera pareil sur un update),
            // le plus simple c'est de renvoyer l'instance qui vient d'être créée
            res.json(newCard);
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    updateAll: async (req, res, next) => {
        try {

            // on veut update les listes depuis les infos du body
            const result = await Card.update( req.body, {
                where: {}, // on ne trie pas, on update TOUT
                returning: true
            });

            // result[0] contient le nombre de List modifiées
            // et result[1] contient la liste des List modifiées
            // ici, on envoie la liste des instances modifiées
            res.json(result[1]);
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    updateOne: async (req, res, next) => {
        try {

            // 2 requetes
            // 1. récupérer la liste ciblée
            // 2A. si elle n'existe pas => 404
            // 2B. si elle existe => mise à jour et on renvoie l'instance mise à jour
            const id = parseInt(req.params.id);
            const card = await Card.findByPk(id);
            if (card) {
                await card.update(req.body);
                res.json(card);
            } else {
                next()
            }

            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            
            const nbDestoyed = await Card.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (nbDestoyed === 0) {
                // si on a rien supprimé, c'est qu'on a pas trouvé la bonne liste => 404
                next();
            } else {
                // si au moins une liste a été supprimée, on renvoie un petit message de vaidation
                res.json({message: "ok"});
            }
            
        } catch (error) {
            // ici quelque chose s'est mal passé...
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    }

}


module.exports = cardController;