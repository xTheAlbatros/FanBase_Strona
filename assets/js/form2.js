// Pobieranie rezerwacji z localStorage i wyświetlanie ich w tabeli
function displayReservations() {
    const reservationTable = document.getElementById("reservation-table");
    const reservationList = JSON.parse(localStorage.getItem("reservations"));

    if (reservationList && reservationList.length > 0) {
        const tbody = reservationTable.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";

        for (const reservation of reservationList) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reservation.firstName}</td>
                <td>${reservation.lastName}</td>
                <td>${reservation.phoneNumber}</td>
                <td>${reservation.ageStatus}</td>
                <td>${reservation.ticketType}</td>
                <td>${reservation.interests}</td>
                <td>
                    <button class="edit-button" onclick="editReservation(${reservationList.indexOf(reservation)})">Edytuj</button>
                    <button class="delete-button" onclick="deleteReservation(${reservationList.indexOf(reservation)})">Usuń</button>
                </td>
            `;
            tbody.appendChild(row);
        }
    } else {
        reservationTable.innerHTML = "<p>Brak rezerwacji.</p>";
    }
}


// Usunięcie rezerwacji
function deleteReservation(index) {
    const reservationList = JSON.parse(localStorage.getItem("reservations"));
    reservationList.splice(index, 1);

    localStorage.setItem("reservations", JSON.stringify(reservationList));

    displayReservations(); // Ponowne wyświetlenie listy rezerwacji
}

// Edycja rezerwacji
function editReservation(index) {
    const reservationList = JSON.parse(localStorage.getItem("reservations"));
    const reservation = reservationList[index];

    // Przygotowanie formularza edycji
    const editForm = document.createElement("form");
    editForm.innerHTML = `
        <input type="text" id="edit-firstName" value="${reservation.firstName}">
        <input type="text" id="edit-lastName" value="${reservation.lastName}">
        <input type="text" id="edit-phoneNumber" value="${reservation.phoneNumber}">
        <input type="text" id="edit-ageStatus" value="${reservation.ageStatus}">
        <input type="text" id="edit-ticketType" value="${reservation.ticketType}">
        <input type="text" id="edit-interests" value="${reservation.interests}">
        <button type="submit">Zapisz</button>
        <button type="button" onclick="cancelEdit()">Anuluj</button>
    `;

    // Funkcja obsługująca zapisanie zmienionych danych
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Pobranie zmienionych danych z formularza
        const updatedReservation = {
            firstName: document.getElementById("edit-firstName").value,
            lastName: document.getElementById("edit-lastName").value,
            phoneNumber: document.getElementById("edit-phoneNumber").value,
            ageStatus: document.getElementById("edit-ageStatus").value,
            ticketType: document.getElementById("edit-ticketType").value,
            interests: document.getElementById("edit-interests").value,
        };

        // Zapisanie zmienionych danych do listy rezerwacji
        reservationList[index] = updatedReservation;

        // Zapisanie zaktualizowanej listy rezerwacji w localStorage
        localStorage.setItem("reservations", JSON.stringify(reservationList));

        // Ponowne wyświetlenie listy rezerwacji
        displayReservations();

        // Usunięcie formularza edycji
        editForm.remove();
    });

    // Dodanie formularza edycji do wiersza tabeli
    const row = document.getElementById("reservation-table").getElementsByTagName("tbody")[0].rows[index];
    const editCell = row.cells[row.cells.length - 1];
    editCell.innerHTML = "";
    editCell.appendChild(editForm);
}

// Anulowanie edycji
function cancelEdit() {
    displayReservations(); // Ponowne wyświetlenie listy rezerwacji
}

// Wywołanie funkcji displayReservations() przy załadowaniu strony
displayReservations();
