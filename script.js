document.getElementById('form-inscription').addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page
  
    // Récupérer les données du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const format = document.getElementById('format').value;
  
    try {
      // Envoyer les données au backend
      const response = await fetch('http://localhost:3000/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, format }),
      });
  
      // Vérifier la réponse
      const result = await response.text();
      if (response.ok) {
        alert(result);
      } else {
        alert(`Erreur : ${result}`);
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert('Impossible de soumettre le formulaire.');
    }
  });
  