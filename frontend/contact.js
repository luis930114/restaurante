document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

        // Obtén los datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;



        
        try {
            // Envía los datos al servidor utilizando fetch
            const response = await fetch('http://localhost:3000/guardar_contacto', { // Asegúrate de que esta URL es correcta
                method: 'POST',
                headers: {

                    
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            // Maneja la respuesta del servidor
            const result = await response.text();
            if (response.ok) {
                
                Swal.fire({
                    title: 'Éxito',
                    text: result,
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


