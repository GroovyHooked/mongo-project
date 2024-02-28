require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function createCollections() {
    // Initialisation de la connexion à la base de données
    let client;

    try {
        // Connexion à la base de données
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Récupération de la base de données
        const db = client.db(dbName);

        // Création de la collection "Users" avec un schéma de validation
        // Le schéma de validation exige que chaque document contienne les champs "type" et "coordinates"
        // Le champ "type" doit être une énumération avec la valeur "Point"
        // Le champ "coordinates" doit être un tableau de nombres avec exactement 2 éléments
        await db.createCollection("Users", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["type", "coordinates"],
                    properties: {
                        type: { enum: ["Point"] },
                        coordinates: {
                            bsonType: "array",
                            items: { bsonType: "number" },
                            minItems: 2,
                            maxItems: 2,
                        },
                    },
                },
            },
        });

        // Création d'un index 2dsphere sur le champ "location" pour permettre des requêtes géospatiales
        await db.collection("Users").createIndex({ "location": "2dsphere" });

        // Création de la collection "Stuffs" avec un schéma de validation
        // Le schéma de validation exige que chaque document contienne les champs "description" et "user_id"
        // Le champ "description" doit être une chaîne de caractères
        // Le champ "user_id" doit être un ObjectId
        await db.createCollection("Stuffs", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["description", "user_id"],
                    properties: {
                        description: { bsonType: "string" },
                        user_id: { bsonType: "objectId" },
                    },
                },
            },
        });

        // Affichage d'un message de succès si toutes les collections ont été créées avec succès
        console.log("Collections créées avec succès !");
    } catch (error) {
        // Affichage d'un message d'erreur si une erreur se produit lors de la création des collections
        console.error("An error occurred while creating collections: ", error);
    } finally {
        // Fermeture de la connexion à la base de données, que la création des collections ait réussi ou non
        await client.close();
    }
}

module.exports = { createCollections };