| URI | GET | POST | PATCH | DELETE |
|---|---|---|---|---|
| /list | récupérer toutes les listes | créer une nouvelle liste avec les infos du body | Mettre à jour TOUTES les listes avec les infos du body | Supprimer TOUTES les listes |
| /list/:id | récupérer la liste qui porte l'id demandé (ou 404) | N/A (ne pas implémenter) | Mettre à jour la liste ciblée, avec les infos du body | Supprimer la liste ciblée |
| /card |récupérer toutes les cartes |créer une nouvelle carte avec les infos du body | Mettre à jour TOUTES les cartes avec les infos du body| Supprimer TOUTES les cartes
| /card/:id | récupérer la carte qui porte l'id demandé (ou 404) | N/A (ne pas implémenter) | Mettre à jour la carte ciblée, avec les infos du body | Supprimer la carte ciblée |
| /tag|récupérer tous les tags |créer un nouveau tag avec les infos du body | Mettre à jour TOUS les tags avec les infos du body| Supprimer TOUS les tags
| /tag/:id | récupérer le tag qui porte l'id demandé (ou 404) | N/A (ne pas implémenter) | Mettre à jour le tag ciblé, avec les infos du body | Supprimer le tag ciblé |

**Remarque :** ce tableau couvre la majorité de nos use cases. Mais pas la totalité !  
Il manque les 2 actions : associer et dissocier un tag à une carte  
Pour ces 2 actions, on va donc définir 2 routes supplémentaires, qui sont "hors REST"  :

- `PATCH /card/:cardId/tag/:tagId` pour associer la carte X au tag Y.
- `DELETE /card/:cardId/tag/:tagId` pour dissocier la carte X du tag Y.

Astuce: pour implémenter ces 2 routes, nous aurons besoin des "mixins" de Sequelize, c'est-à-dire des fonctions créées automatiquement lorsqu'on crée une association, et qui servent à manipuler l'association en question.

CF : https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances