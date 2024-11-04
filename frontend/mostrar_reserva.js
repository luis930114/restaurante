// Función para obtener las reservas y actualizar la tabla
async function fetchReservations() {
    try {
        const response = await fetch('http://localhost:5000/reservas'); // Asegúrate de que la URL sea correcta
        if (!response.ok) {
            throw new Error('Error al obtener las reservas');
        }
        
        const reservas = await response.json();
        updateReservationsTable(reservas);
    } catch (error) {
        console.error('Error en la solicitud de reservas:', error);
    }
}

function updateReservationsTable(reservas) {
    const tbody = document.querySelector('#reservationsTable tbody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de añadir nuevos datos

    reservas.forEach(reserva => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Nombre">${reserva.nombre}</td>
            <td data-label="Fecha">${reserva.fecha_reserva}</td>
            <td data-label="Hora">${reserva.hora_reserva}</td>
            <td data-label="Personas">${reserva.numero_personas}</td>
            <td>
                <button class="edit-reservation" data-id="${reserva.id}">Editar</button>
                <button class="delete-reservation" data-id="${reserva.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-reservation').forEach(button => {
        button.addEventListener('click', () => {
            const reservaId = button.getAttribute('data-id');
            // Lógica para editar la reserva
            console.log(`Editar reserva con ID: ${reservaId}`);
        });
    });

    document.querySelectorAll('.delete-reservation').forEach(button => {
        button.addEventListener('click', () => {
            const reservaId = button.getAttribute('data-id');
            // Lógica para eliminar la reserva
            console.log(`Eliminar reserva con ID: ${reservaId}`);
        });
    });
}


// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchReservations);
