document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

        // Obtén los datos del formulario
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const people = document.getElementById('people').value;

        try {
            // Envía los datos al servidor utilizando fetch
            const response = await fetch('http://localhost:5000/guardar_reserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    date,
                    time,
                    people,
                    usuario_id: 1 // Cambia esto según el ID del usuario
                })
            });
            
            console.log(response.text)
            // Maneja la respuesta del servidor
            const result = await response.text();
            if (response.ok) {
                Swal.fire({
                    title: 'Éxito',
                    text: result.mensaje,
                    icon: 'success'
                });
            } else {
                throw new Error(result);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error'
            });
        }
    });
});
