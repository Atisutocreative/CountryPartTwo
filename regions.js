// PSEUDO-CODE
// Maak een functie getAllCountries die data kan ophalen => asynchrone functie
// maak GET request naar endpoint https://restcountries.eu/rest/v2/all
// sla response op en zorg dat we de meta-data eraf halen
// sorteer de data die terugkomt van laagste populatie naar hoogste populatie

// onze data is een array met daarin 250 land-objecten
// maak een anker-element waar alle list-items aan toegevoegd kunnen worden (countryList)
// Voor elk element in de array, maak een list item, met daarin:
// een afbeelding van de vlag
// een element voor de naam
// een element voor de populatie
// plaats een eventListener op het list item. Zorg ervoor dat als de gebruiker erop klikt
// en de populatie is zichtbaar, deze onzichtbaar wordt. Als hij onzichtbaar is en er wordt
// op geklikt, moet hij zichtbaar worden.


// sla de referentie op naar ons 'anker' element, de <ul> met id country-list
const countryList = document.getElementById('country-list');

async function getAllCountries() {
    try {
        const result = await axios.get('https://restcountries.eu/rest/v2/all');
        // haal data uit het result object
        const { data } = result;
        // sorteer de huidige data array op de populatie-property van elk land
        data.sort((a, b) => {
            return a.population - b.population;
        });

        data.map((country) => {
            const { flag, name, region, population } = country;

            // <li> element maken om alle informatie in op te slaan
            const countryElement = document.createElement('li');
            countryElement.setAttribute('class', 'country-clickable');

            // <img> element maken voor de vlag
            const flagElement = document.createElement('img');
            flagElement.setAttribute('src', flag);
            flagElement.setAttribute('class', 'flag');
            // <img> aan ons <li> element toevoegen
            countryElement.appendChild(flagElement);

            // <span> element voor de naam
            const countryNameElement = document.createElement('span');
            countryNameElement.textContent = name;
            countryNameElement.setAttribute('class', getRegionClass(region));
            // <span> aan ons <li> element toevoegen
            countryElement.appendChild(countryNameElement);

            // <p> element voor de populatie
            const populationText = document.createElement('p');
            populationText.setAttribute('class', 'population-dropdown');
            populationText.textContent = `Has a population of ${population} people`;
            // voeg <p> element toe aan <li> element
            countryElement.appendChild(populationText);

            // omdat toggleVisibily is gedeclareerd BUITEN het try blok, moeten we de informatie (het <p> element)
            // meegeven als parameter. Omdat onze functie een parameter nodig heeft, moeten we er een anonieme
            // functie omheen zetten, anders wordt toggleVisibility direct uitgevoerd zonder te wachten op het click event
            countryElement.addEventListener('click', () => {
                toggleVisibility(populationText);
            });

            // LET OP: JE HAD OOK HET ELEMENT TELKENS IN EN UIT DE DOM KUNNEN HALEN
            // Dan zou je het <p> element niet standaard aanmaken, maar alleen als onderstaande
            // functie door de event listener wordt aangeroepen. Beide oplossingen zijn prima.

            // function populationMessage() {
            //   // check of, op het moment dat de gebruiker op het element klikt, al een population-text zichtbaar is
            //   const currentPopulationText = document.getElementById(`population-${name}`);
            //
            //   // als er al een tekst is, dan zal currentPopulationText een waarde bevatten. Zo niet, is hij undefined.
            //   if (currentPopulationText) {
            //     // als de tekst (<p> element) al bestaat, haal dan die tekst uit het <li> element
            //     countryElement.removeChild(currentPopulationText);
            //   } else {
            //     // als de tekst (<p> element) nog niet bestaat, dan maken we 'm aan en zetten we 'm in de DOM
            //     const populationText = document.createElement('p');
            //     // geef 'm een uniek ID, zodat we daar altijd mee kunnen checken of dit element al bestaat (zie hierboven)
            //     populationText.setAttribute('id', `population-${name}`);
            //     populationText.setAttribute('class', 'population-text');
            //     populationText.textContent = `Has a population of ${population} people`;
            //     // voeg <p> element toe aan <li> element
            //     countryElement.appendChild(populationText);
            //   }
            // }

            //  <li> aan <ul> toevoegen
            countryList.appendChild(countryElement);
        });

        console.log(data);
    } catch(e) {
        console.error(e);
    }
}

// roep de getAllCountries() functie aan zodra het script wordt aangeroepen
getAllCountries();

// de toggle zorgt ervoor dat er eerst gecheckt wordt of deze class er al op staat, en zo niet,
// dan wordt hij toegevoegd. De basis styling van dit element heeft in de css een opacity: 0 (onzichtbaar)
// en het enige wat de class visible doet, is de opacity op 1 zetten.
function toggleVisibility(populationElement) {
    populationElement.classList.toggle('visible');
}

// deze functie wordt voor elk land opnieuw aangeroepen en krijgt dan de region mee. Op basis daarvan
// voert de switch zijn vergelijking uit, en geeft dan de naam van de class mee die wij op het element zetten.
function getRegionClass(currentRegion) {
    switch (currentRegion) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}

