require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb'); 

// Récupération de l'URI de MongoDB à partir des variables d'environnement
const uri = process.env.MONGODB_URI;

// Création d'un nouveau client MongoDB avec l'URI et les options spécifiées
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Utilisation de la version v1 de l'API du serveur
    strict: true, // Activation du mode strict
    deprecationErrors: true, // Activation des erreurs de dépréciation
  }
});

// Fonction pour générer une localisation aléatoire
function generateRandomLocation() {
  const randomLongitude = Math.random() * (180 - (-180)) - 180; // Génération d'une longitude aléatoire
  const randomLatitude = Math.random() * (90 - (-90)) - 90; // Génération d'une latitude aléatoire
  return {
      type: "Point", // Type de la localisation
      coordinates: [randomLongitude, randomLatitude] 
  };
}

// Fonction pour insérer des utilisateurs dans la base de données
async function insertUsers(db) {
  const usersData = [
    { name: "Utilisateur1", location: generateRandomLocation() }, 
    { name: "Utilisateur2", location: generateRandomLocation() }, 
  ];

  // Insertion des utilisateurs dans la collection "Users" de la base de données
  return await db.collection("Users").insertMany(usersData);
}

// Fonction pour insérer des objets dans la base de données
async function insertStuffs(db, insertedUsers) {
  const stuffsData = [
    { description: "Description1", user_id: insertedUsers.insertedIds[0] }, 
    { description: "Description2", user_id: insertedUsers.insertedIds[1] },
  ];

  // Insertion des objets dans la collection "Stuffs" de la base de données
  return await db.collection("Stuffs").insertMany(stuffsData);
}

// Script de migration pour insérer des données fictives dans la base de données
async function migrationScript() {
  try {
    const db = client.db("database_test"); // Connexion à la base de données "database_test"
    const insertedUsers = await insertUsers(db); // Insertion des utilisateurs
    await insertStuffs(db, insertedUsers); // Insertion des objets
    console.log("Données fictives ajoutées avec succès !"); 
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

module.exports = { migrationScript };