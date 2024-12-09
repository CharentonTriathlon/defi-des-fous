const sqlite3 = require('sqlite3').verbose();

// Ouvrir ou créer la base de données
const db = new sqlite3.Database('./defi_des_fous.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
  } else {
    console.log('Connecté à la base de données SQLite');
  }
});

// Créer la table "inscriptions" si elle n'existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS inscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      format TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table :', err.message);
    } else {
      console.log('Table "inscriptions" vérifiée/créée.');
    }
  });
});

module.exports = db;
