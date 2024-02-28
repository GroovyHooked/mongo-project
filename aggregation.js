require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const DATABASE_NAME = "database_test";
const COLLECTION_NAME = "Users";
const MAX_DISTANCE = 10000000; // En mètres
const LONGITUDE = 48.856614;
const LATITUDE = 2.3522219;

async function aggregationScript() {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);

        const aggregationPipeline = [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [LONGITUDE, LATITUDE] },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: MAX_DISTANCE,
                }
            },
            {
                $lookup: {
                    from: "Stuffs",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "userStuffs"
                }
            }
        ];

        const result = await db.collection(COLLECTION_NAME).aggregate(aggregationPipeline).toArray();

        console.log(result);

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    } finally {
        await client.close();
    }
}

module.exports = { aggregationScript };