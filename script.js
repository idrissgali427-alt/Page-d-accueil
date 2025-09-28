document.addEventListener('DOMContentLoaded', () => {

    // --- Fonction pour la Date et l'Heure ---
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('fr-FR', options);
        const timeString = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('date-time').innerHTML = `<i class="far fa-calendar-alt"></i> ${dateString}, ${timeString}`;
    }

    // Met à jour la date et l'heure toutes les secondes
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Appel initial pour éviter un délai

    // --- Fonction pour la Météo ---
    async function getWeather() {
        const apiKey = 'VOTRE_CLE_API'; // Remplacez par votre clé d'API
        const city = 'Paris'; // Remplacez par votre ville

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
            if (!response.ok) {
                throw new Error('Erreur de réseau ou ville non trouvée.');
            }
            const data = await response.json();
            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            document.getElementById('weather-info').innerHTML = `<i class="fas fa-cloud-sun"></i> ${temp}°C, ${description}`;
        } catch (error) {
            console.error('Erreur lors de la récupération de la météo:', error);
            document.getElementById('weather-info').innerHTML = `<i class="fas fa-exclamation-triangle"></i> Météo non disponible`;
        }
    }

    getWeather();
    // Vous pouvez appeler getWeather() périodiquement pour la mettre à jour, par exemple toutes les 30 minutes
    // setInterval(getWeather, 1800000); // 30 minutes
});