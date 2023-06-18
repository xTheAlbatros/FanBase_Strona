//Laduje i modyfikuje premiery filmow
function fetchPremieres(premiereType) {
    let jsonFile;
    if (premiereType === 'polish') {
        jsonFile = 'assets/json/polish_premieres.json';
    } else if (premiereType === 'usa') {
        jsonFile = 'assets/json/usa_premieres.json';
    }

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const options = document.getElementsByClassName('option');

            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                const premiereData = data[i];

                option.querySelector('.main').textContent = premiereData.tytuł;
                option.querySelector('.sub').textContent = 'Premiera: ' + premiereData.premiera;
            }
        })
        .catch(error => {
            console.log('Wystąpił błąd:', error);
        });
}

document.getElementById('polishPremieresButton').addEventListener('click', function() {
    fetchPremieres('polish');
});

document.getElementById('usaPremieresButton').addEventListener('click', function() {
    fetchPremieres('usa');
});

// Załaduj polskie premiery standardowo
fetchPremieres('polish');

