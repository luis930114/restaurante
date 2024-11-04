from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy


class Contacto(db.Model):
    __tablename__ = 'contactos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    fecha = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

class Menu(db.Model):
    __tablename__ = 'menus'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    disponible = db.Column(db.Boolean, default=True)
    
    # Relación muchos-a-muchos con Producto
    productos = db.relationship('Producto', secondary='menu_producto', back_populates='menus')


class Producto(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    disponible = db.Column(db.Boolean, default=True)
    categoria = db.Column(db.String(50), nullable=False)

    # Relación muchos-a-muchos con Menu
    menus = db.relationship('Menu', secondary='menu_producto', back_populates='productos')


# Tabla intermedia para la relación muchos-a-muchos
menu_producto = db.Table(
    'menu_producto',
    db.Column('menu_id', db.Integer, db.ForeignKey('menus.id'), primary_key=True),
    db.Column('producto_id', db.Integer, db.ForeignKey('productos.id'), primary_key=True)
)


class Mesa(db.Model):
    __tablename__ = 'mesas'
    id = db.Column(db.Integer, primary_key=True)
    num_mesa = db.Column(db.Integer, unique=True, nullable=False)
    capacidad = db.Column(db.Integer, nullable=False)
    disponible = db.Column(db.Boolean, default=True)

class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    fecha_registro = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    password_hash = db.Column(db.String(128))  # Agrega un campo para el hash de la contraseña

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Reserva(db.Model):
    __tablename__ = 'reservas'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    fecha_reserva = db.Column(db.Date, nullable=False)
    hora_reserva = db.Column(db.Time, nullable=False)
    num_personas = db.Column(db.Integer, nullable=False)
    estado = db.Column(db.Enum('pendiente', 'confirmada', 'cancelada'), default='pendiente')
    nombre_usuario = db.Column(db.String(255))

    usuario = db.relationship('Usuario', backref=db.backref('reservas', lazy=True))
