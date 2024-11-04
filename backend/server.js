const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('./database'); // Ruta al archivo de conexión a la base de datos

const app = express();
const port = 3000;

// Middleware
app.use(cors({


    origin: 'http://127.0.0.1:5500'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar reservas


app.post('/guardar_reserva', (req, res) => {

    const { name, date, time, people } = req.body;

    if (!name || !date || !time || !people) {
        return res.status(400).send('Faltan datos en la solicitud');
    }

    const usuario_id = 1; // ID de usuario predeterminado
    const estado = 'pendiente'; // Estado por defecto

    const query = 'INSERT INTO reservas (usuario_id, fecha_reserva, hora_reserva, num_personas, estado, nombre_usuario) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [usuario_id, date, time, people, estado, name];

    mysql.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al guardar la reserva:', err);
            return res.status(500).send('Error al guardar la reserva');
        }

        res.send('Reserva guardada exitosamente');
    });
});

// Ruta para manejar mensajes de contacto
app.post('/guardar_contacto', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('Faltan datos en la solicitud');
    }

    const query = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
    const values = [name, email, message];

    mysql.query(query, values, (err, results) => {
        if (err) {
            console.error('Error al guardar el mensaje de contacto:', err);
            return res.status(500).send('Error al guardar el mensaje de contacto');
        }

        res.send('Mensaje enviado exitosamente');
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

