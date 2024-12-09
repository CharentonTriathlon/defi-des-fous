document.getElementById('form-inscription').addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const format = document.getElementById('format').value;
    const messageBox = document.getElementById('message-box');
  
    try {
      const response = await fetch('http://localhost:3000/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, format }),
      });
  
      const result = await response.json();
  
      // Afficher les messages dans le conteneur #message-box
      messageBox.style.display = 'block';
      if (response.ok) {
        messageBox.className = 'success';
        messageBox.textContent = result.message;
      } else {
        messageBox.className = 'error';
        messageBox.textContent = result.message;
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      messageBox.style.display = 'block';
      messageBox.className = 'error';
      messageBox.textContent = 'Erreur réseau : Impossible de soumettre le formulaire.';
    }
  });
  