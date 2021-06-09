# MLD

- List(id: SERIAL, name: TEXT NOT NULL, position: INTEGER)
- Card(id: SERIAL, title: TEXT NOT NULL, position: INTEGER, color: TEXT, #list_id: INT)
- Tag(id: SERIAL, name: TEXT NOT NULL, color: TEXT)
- card_has_tag(#card_id: INT NOT NULL, #tag_id: INT NOT NULL)

**Note :** même si ils n'apparaissent pas ici, il faudra créer, DANS TOUTES LES TABLES, les timestamps created_at et updated_at