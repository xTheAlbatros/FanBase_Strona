// Część od formularza

const form = document.getElementById("reservation-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Walidacja formularza
    const firstNameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');
    const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
    const ageStatusInputs = document.querySelectorAll('input[name="ageStatus"]');
    const ticketTypeInput = document.querySelector('select[name="ticketType"]');
    const interestsInputs = document.querySelectorAll('input[name="interests"]:checked');

    // Funkcja sprawdzająca, czy dany ciąg znaków składa się tylko z liter alfabetu
    function isAlphabetic(input) {
        const pattern = /^[a-zA-Z]+$/;
        return pattern.test(input);
    }

// Sprawdzanie czy pola Imię, Nazwisko, Numer telefonu są wypełnione
    if (
        firstNameInput.value === "" ||
        lastNameInput.value === "" ||
        phoneNumberInput.value === ""
    ) {
        alert("Proszę wypełnić wszystkie wymagane pola.");
        return;
    }

// Sprawdzanie poprawności pola Imię
    if (
        firstNameInput.value.length < 3 ||
        !isAlphabetic(firstNameInput.value)
    ) {
        alert("Proszę podać poprawne imię (minimum 3 litery alfabetu).");
        return;
    }

// Sprawdzanie poprawności pola Nazwisko
    if (
        lastNameInput.value.length < 3 ||
        !isAlphabetic(lastNameInput.value)
    ) {
        alert("Proszę podać poprawne nazwisko (minimum 3 litery alfabetu).");
        return;
    }

// Sprawdzanie poprawności pola Numer telefonu
    const phoneNumberPattern = /^[0-9]{9}$/;
    if (!phoneNumberPattern.test(phoneNumberInput.value)) {
        alert("Proszę podać poprawny numer telefonu (9 cyfr).");
        return;
    }

// Sprawdzanie czy zaznaczono status wiekowy
    let ageStatus = "";
    for (const input of ageStatusInputs) {
        if (input.checked) {
            ageStatus = input.value;
            break;
        }
    }
    if (ageStatus === "") {
        alert("Proszę wybrać status wiekowy.");
        return;
    }

// Sprawdzanie czy wybrano typ biletu
    if (ticketTypeInput.value === "Wybierz typ biletu") {
        alert("Proszę wybrać typ biletu.");
        return;
    }

    // Pobieranie zaznaczonych zainteresowań
    const interests = Array.from(interestsInputs).map(input => input.value);
    const interestsValue = interests.length > 0 ? interests.join(", ") : "brak";

    // Pobieranie danych z formularza
    const reservationData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        phoneNumber: phoneNumberInput.value,
        ageStatus: ageStatus,
        ticketType: ticketTypeInput.value,
        interests: interestsValue
    };

    // Zapisywanie danych w formacie JSON do localStorage
    let reservations = localStorage.getItem("reservations");
    if (reservations === null) {
        reservations = [];
    } else {
        reservations = JSON.parse(reservations);
    }
    reservations.push(reservationData);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // Wyczyszczenie formularza po zapisaniu danych
    form.reset();
    alert("Rezerwacja została zapisana.");

});



