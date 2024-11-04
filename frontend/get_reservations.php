<?php
// Configuración de la base de datos
$host = 'localhost'; // Cambia esto si tu servidor tiene un host diferente
$db = 'restaurante'; // Nombre de tu base de datos
$user = ''; // Tu usuario de base de datos
$pass = ''; // Tu contraseña de base de datos

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener las reservas
$sql = "SELECT nombre_usuario, fecha_reserva, hora_reserva, num_personas FROM reservas";
$result = $conn->query($sql);

$reservations = [];

if ($result->num_rows > 0) {
    // Salida de cada fila
    while($row = $result->fetch_assoc()) {
        $reservations[] = $row;
    }
}

// Devolver los resultados como JSON
header('Content-Type: application/json');
echo json_encode($reservations);

// Cerrar la conexión
$conn->close();
?>
