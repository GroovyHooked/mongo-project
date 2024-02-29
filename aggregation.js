require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

// Création d'une instance du client MongoDB avec l'URI et les options nécessaires
const client = new MongoClient(uri, {});

// Définition des constantes pour la base de données, la collection, la distance maximale et les coordonnées
const DATABASE_NAME = "database_test";
const COLLECTION_NAME = "Users";
const MAX_DISTANCE = 10000000; // En mètres
const LONGITUDE = 48.856614;
const LATITUDE = 2.3522219;

// Fonction asynchrone pour exécuter le script d'agrégation
async function aggregationScript() {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);

        // Définition du pipeline d'agrégation
        const aggregationPipeline = [
            {
                // Opérateur $geoNear pour obtenir les documents à proximité d'un point donné
                $geoNear: {
                    near: { type: "Point", coordinates: [LONGITUDE, LATITUDE] },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: MAX_DISTANCE,
                }
            },
            {
                // Opérateur $lookup pour joindre les documents d'une autre collection
                $lookup: {
                    from: "Stuffs",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "userStuffs"
                }
            }
        ];
        
        // Exécution de l'agrégation et conversion du résultat en tableau
        const result = await db.collection(COLLECTION_NAME).aggregate(aggregationPipeline).toArray();

        console.log(result);

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    } finally {
        await client.close();
    }
}

module.exports = { aggregationScript };