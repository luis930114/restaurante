// Función para obtener las reservas y actualizar la tabla
async function fetchReservations() {
    try {
        const response = await fetch('http://localhost:5000/reservas'); 
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
            showEditForm(reservaId);
        });
    });

    document.querySelectorAll('.delete-reservation').forEach(button => {
        button.addEventListener('click', () => {
            const reservaId = button.getAttribute('data-id');
            //deleteReservation(reservaId);
            confirmacionDeEliminarReserva(reservaId);
        });
    });
}

// Función para mostrar el formulario de edición con los datos de la reserva seleccionada
async function showEditForm(reservaId) {
    try {
        const response = await fetch(`http://localhost:5000/reservas/${reservaId}`);
        if (!response.ok) {
            throw new Error('Error al obtener la reserva');
        }
        
        const reserva = await response.json();

        // Cargar los datos de la reserva en el formulario
        document.getElementById('editReservaId').value = reserva.id;
        document.getElementById('editNombre').value = reserva.nombre;
        document.getElementById('editDate').value = reserva.fecha_reserva;
        document.getElementById('editTime').value = reserva.hora_reserva;
        document.getElementById('editPeople').value = reserva.numero_personas;

        // Mostrar el formulario de edición
        document.getElementById('editReservationFormContainer').style.display = 'block';
    } catch (error) {
        console.error('Error al obtener la reserva para editar:', error);
    }
}

// Función para manejar la edición de la reserva
document.getElementById('editReservationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const reservaId = document.getElementById('editReservaId').value;
    const name = document.getElementById('editNombre').value;
    const date = document.getElementById('editDate').value;
    const time = document.getElementById('editTime').value;
    const numeroPersonas = document.getElementById('editPeople').value;

    const reservaData = { name, date: date, time: time, people: numeroPersonas };

    try {
        const response = await fetch(`http://localhost:5000/reservas/${reservaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservaData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            Swal.fire({
                title: 'Éxito',
                text: result.mensaje,
                icon: 'success'
            });
            fetchReservations();
            hideEditForm();
        } else {
            console.error('Error al actualizar la reserva');
        }
    } catch (error) {
        console.error('Error en la solicitud de actualización de reserva:', error);
    }
});

// Función para ocultar el formulario de edición
function hideEditForm() {
    document.getElementById('editReservationFormContainer').style.display = 'none';
}

// Botón para cancelar la edición
document.getElementById('cancelEdit').addEventListener('click', hideEditForm);

// Función para eliminar una reserva
/**async function deleteReservation(reservaId) {
    try {
        const response = await fetch(`http://localhost:5000/reservas/${reservaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchReservations();
        } else {
            console.error('Error al eliminar la reserva');
        }
    } catch (error) {
        console.error('Error en la solicitud de eliminación de reserva:', error);
    }
}*/

// Función que solicita confirmación antes de eliminar una reserva
function confirmacionDeEliminarReserva(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar este menu después de borrarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteReservation(id); // Llama a la función de eliminación
        } else {
            Swal.fire({
                title: 'Cancelado',
                text: 'El producto no ha sido borrado.',
                icon: 'info'
            });
        }
    });
}

// Función para eliminar una reserva
async function deleteReservation(reservaId) {
    try {
        const response = await fetch(`http://localhost:5000/reservas/${reservaId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchReservations(); // Actualizar la tabla
        } else {
            console.error('Error al eliminar la reserva');
        }
    } catch (error) {
        console.error('Error al intentar eliminar la reserva:', error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchReservations);
