const db = require('./database');
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

// Configuration du transporteur d'e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware pour parser les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Serveur du Défi des Fous en ligne !');
});

// Endpoint pour gérer les inscriptions
app.post('/inscription', (req, res) => {
  const { name, email, format } = req.body;

  if (!name || !email || !format) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  // Insérer une nouvelle inscription dans la base de données
  const query = `
    INSERT INTO inscriptions (name, email, format)
    VALUES (?, ?, ?)
  `;

  db.run(query, [name, email, format], function (err) {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err.message);
      return res.status(500).send('Erreur lors de l\'inscription.');
    }

    console.log(`Nouvelle inscription avec l'ID ${this.lastID}`);

    // Envoyer un e-mail de confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de votre inscription au Défi des Fous',
      text: `Bonjour ${name},\n\nMerci pour votre inscription au Défi des Fous !\nVous avez choisi le format : ${format.toUpperCase()}.\n\nSportivement,\nL'équipe du Défi des Fous`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error.message);
        return res.status(500).send('Erreur lors de l\'envoi de l\'e-mail.');
      }
      console.log('E-mail envoyé :', info.response);
      res.status(200).send(`Merci ${name}, votre inscription au format ${format} est confirmée. Un e-mail de confirmation a été envoyé à ${email}.`);
    });
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});