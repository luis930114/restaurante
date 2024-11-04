// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database'); // Importar la conexión a la base de datos

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el formulario de reserva
app.post('/guardar_reserva', (req, res) => {
    const { name, date, time, people, usuario_id } = req.body;

    // Verificar que todos los campos estén presentes
    if (!name || !date || !time || !people || !usuario_id) {
        return res.status(400).send('Faltan datos en la solicitud');
    }

    // Consulta SQL para insertar la reserva
    const query = 'INSERT INTO reservas (usuario_id, fecha_reserva, hora_reserva, num_personas, estado) VALUES (?, ?, ?, ?, ?)';
    const values = [usuario_id, date, time, people, 'pendiente']; // Estado por defecto 'pendiente'

    // Ejecutar la consulta
    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al guardar la reserva:', err);
            return res.status(500).send('Error al guardar la reserva');
        }

        res.send('Reserva guardada exitosamente');
    });
});

// Servir archivos estáticos (si es necesario)
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
