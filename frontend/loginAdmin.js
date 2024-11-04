document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    // Captura los valores ingresados en los campos
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Datos a enviar
    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:5000/login", {  // Cambia la URL si es necesario
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)  // Convierte los datos a JSON
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el inicio de sesión");
        }

        // Convierte la respuesta a JSON
        const data = await response.json();
        
        // Procesa la respuesta
        if (data.success) {
            swal("Éxito", "Inicio de sesión exitoso", "success");
            // Redirigir o actualizar la UI según sea necesario
            window.location.href = 'admin.html';
        } else {
            swal("Error", data.message, "error");
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        swal("Error", error.message, "error");
    }
});
