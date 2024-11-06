from flask import Blueprint, request, jsonify, render_template, redirect, url_for, flash
from .models import Reserva, Usuario
from . import db
from datetime import datetime
from flask_login import login_user, logout_user, login_required, current_user, LoginManager
from werkzeug.security import generate_password_hash, check_password_hash 
from . import login_manager
# Crear un Blueprint para las rutas
routes_bp = Blueprint('routes', __name__)
auth_bp = Blueprint('auth', __name__)

@routes_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Cambia para recibir JSON
    email = data.get('email')
    password = data.get('password')
    nombre = data.get('nombre')
    telefono = data.get('telefono')

    # Verificación de campos
    if not email or not password or not nombre or not telefono:
        return jsonify({"success": False, "message": "Por favor completa todos los campos"}), 400

    # Verificación de existencia de usuario
    if Usuario.query.filter_by(email=email).first():
        return jsonify({"success": False, "message": "El correo electrónico ya está registrado"}), 409

    # Creación del usuario
    user = Usuario(email=email, nombre=nombre, telefono=telefono)
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": True, "message": "Usuario registrado exitosamente"}), 201


@routes_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('email')
    password = data.get('password')

    user = Usuario.query.filter_by(email=username).first()

    if user and user.check_password(password):
        login_user(user)
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Usuario o contraseña incorrectos"}), 401

@routes_bp.route('/logout',methods=['POST'])
@login_required
def logout():
    logout_user()
    return {'message': 'Logout exitoso'}, 200 

@login_manager.user_loader
def load_user(user_id):
    return Usuario.query.get(int(user_id))

@routes_bp.route('/guardar_reserva', methods=['POST'])
def crear_reserva():
    datos = request.get_json()

    # Validar que todos los campos necesarios estén en los datos
    if not all(key in datos for key in ("name", "date", "time", "people", "usuario_id")):
        return jsonify({"error": "Faltan datos necesarios para crear la reserva"}), 400

    try:
        nueva_reserva = Reserva(
            usuario_id=datos['usuario_id'],
            fecha_reserva=datetime.strptime(datos['date'], '%Y-%m-%d').date(),
            hora_reserva=datetime.strptime(datos['time'], '%H:%M').time(),
            num_personas=datos['people'],
            estado='pendiente',
            nombre_usuario=datos['name']
        )

        db.session.add(nueva_reserva)
        db.session.commit()

        return jsonify({"mensaje": "Reserva creada exitosamente", "reserva_id": nueva_reserva.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear la reserva: {str(e)}"}), 500


#reservas_bp = Blueprint('reservas', __name__)

@routes_bp.route('/reservas', methods=['GET'])
def listar_reservas():
    reservas = Reserva.query.all()
    reservas_lista = [
        {
            'id': reserva.id,
            'nombre': reserva.nombre_usuario,
            'fecha_reserva': reserva.fecha_reserva.isoformat(),
            'hora_reserva': reserva.hora_reserva.strftime('%H:%M:%S'),
            'numero_personas': reserva.num_personas,
            'usuario_id': reserva.usuario_id
        }
        for reserva in reservas
    ]
    return jsonify(reservas_lista), 200


@routes_bp.route('/reservas/<int:id>', methods=['PUT'])
def actualizar_reserva(id):
    datos = request.get_json()
    print(datos)
    # Validar que los campos a actualizar están en los datos
    if not all(key in datos for key in ("name", "date", "time", "people")):
        return jsonify({"error": "Faltan datos necesarios para actualizar la reserva"}), 400

    try:
        reserva = Reserva.query.get(id)
        if reserva is None:
            return jsonify({"error": "Reserva no encontrada"}), 404

        reserva.nombre_usuario = datos['name']
        reserva.fecha_reserva = datetime.strptime(datos['date'], '%Y-%m-%d').date()
        
        # Ajustar el formato de la hora según si tiene o no segundos
        time_str = datos['time']
        
        # Si la hora tiene solo "HH:MM", agregar ":00" para completar "HH:MM:SS"
        if len(time_str) == 5:  # Solo "HH:MM"
            time_str += ":00"

        # Parsear el string de hora con formato "HH:MM:SS"
        reserva.hora_reserva = datetime.strptime(time_str, '%H:%M:%S').time()
        reserva.num_personas = datos['people']
        reserva.estado = datos.get('estado', reserva.estado)  # Actualizar estado si se proporciona

        db.session.commit()
        return jsonify({"mensaje": "Reserva actualizada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar la reserva: {str(e)}"}), 500


@routes_bp.route('/reservas/<int:id>', methods=['DELETE'])
def eliminar_reserva(id):
    try:
        reserva = Reserva.query.get(id)
        if reserva is None:
            return jsonify({"error": "Reserva no encontrada"}), 404

        db.session.delete(reserva)
        db.session.commit()
        return jsonify({"mensaje": "Reserva eliminada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar la reserva: {str(e)}"}), 500


@routes_bp.route('/reservas/<int:reserva_id>', methods=['GET'])
def get_reserva(reserva_id):
    # Busca la reserva por ID
    reserva = Reserva.query.get(reserva_id)
    
    if reserva is None:
        abort(404, description="Reserva no encontrada")

    result = {
        'id': reserva.id,
        'nombre': reserva.nombre_usuario,
        'fecha_reserva': reserva.fecha_reserva.isoformat(),
        'hora_reserva': reserva.hora_reserva.strftime('%H:%M:%S'),
        'numero_personas': reserva.num_personas,
        'usuario_id': reserva.usuario_id
    }
    
    return jsonify(result), 200




