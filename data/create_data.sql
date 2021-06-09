
BEGIN TRANSACTION;

/* Commencer par supprimer toutes les tables si elles existent */
DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

/* Table List */
CREATE TABLE IF NOT EXISTS "list" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

/* Table Card */
CREATE TABLE IF NOT EXISTS "card" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "position" INTEGER DEFAULT 0,
    "color" TEXT DEFAULT '#fff',
    "list_id" INT NOT NULL REFERENCES "list"("id") ,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

/* Table Tag */
CREATE TABLE IF NOT EXISTS "tag"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT DEFAULT '#fff',
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

/* Table de liaison Card<->Tag */
CREATE TABLE IF NOT EXISTS "card_has_tag" (
    "card_id" INT NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
    "tag_id" INT NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("card_id", "tag_id")
);


/* Toutes les tables sont créées, il est temps de les remplir ! */
INSERT INTO "list" ("name", "position") VALUES 
('TODO', 0),
('En cours', 1),
('Terminé', 2);

INSERT INTO "card" ("title", "position", "color", "list_id") VALUES
('Nourrir le chat', 0, '#0066ff', 1),
('Faire la vaiselle', 1, DEFAULT , 1),
('Ecrire les models', 0, '#ff0000', 2),
('MCD', 0, DEFAULT, 3);

INSERT INTO "tag" ("name", "color") VALUES
('Urgent', '#ff0000'),
('Relou', '#00ff00');

INSERT INTO "card_has_tag" ("card_id", "tag_id") VALUES
(3,1),
(2,1),
(2,2),
(1,2);

COMMIT TRANSACTION;