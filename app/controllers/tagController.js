const { Tag } = require('../models');

// un objet d'options qu'on passera à toutes les méthode find...
const findOptions = {
    include: {all: true, nested: true},
    order: [
        // d'abord ranger les listes par positions croissantes
        ['position', 'ASC'],
    ]
};

const tagController = {

    getAll: async (req, res, next) => {
        try {
            const tags = await Tag.findAll(findOptions);
            res.json( tags );
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
            const tagId = parseInt(req.params.id, 10);

            //2. récupérer la liste ciblée
            const tag = await Tag.findByPk(tagId,findOptions);

            //3. renvoyer, soit la liste, soit une erreur 404
            if (tag) {
                res.json(tag);
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
            const newTag = await Tag.create(req.body);

            // lors d'une création (ça sera pareil sur un update),
            // le plus simple c'est de renvoyer l'instance qui vient d'être créée
            res.json(newTag);
            
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
            const result = await Tag.update( req.body, {
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
            const tag = await Tag.findByPk(id);
            if (tag) {
                await tag.update(req.body);
                res.json(tag);
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
            
            const nbDestoyed = await Tag.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (nbDestoyed === 0) {
                // si on a rien supprimé, c'est qu'on a pas trouvé la bonne list => 404
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


module.exports = tagController;