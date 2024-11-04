document.getElementById('logoutButton').addEventListener('click', async function() {
    console.log('Logout button clicked');  // Verificar si el botón se hace clic
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response status:', response.status);  // Mostrar el código de estado de la respuesta

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); 
            window.location.href = 'loginAdmin.html';
        } else {
            const errorData = await response.json();
            console.error('Error en el logout:', errorData.message);
        }
    } catch (error) {
        console.error('Error en la solicitud de logout:', error);
    }
});
