const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',      // Generalmente es 'localhost' o '127.0.0.1'
    user: 'root',           // Usuario de MySQL en XAMPP (generalmente 'root')
    password: '',           // Contraseña de MySQL (por defecto está vacía)
    database: 'restaurante' // Nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL de XAMPP');
});

module.exports = connection;
