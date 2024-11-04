from flask import Blueprint, request, jsonify
from .models import Producto, db

productos_bp = Blueprint('productos', __name__)

# Crear un nuevo producto
@productos_bp.route('/productos', methods=['POST'])
def create_producto():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    precio = data.get('precio')
    disponible = data.get('disponible', True)
    categoria = data.get('categoria') 

    # Validación de campos obligatorios
    if not all([nombre, descripcion, precio, categoria]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    producto = Producto(nombre=nombre, descripcion=descripcion, precio=precio, disponible=disponible, categoria=categoria)
    db.session.add(producto)
    db.session.commit()
    return jsonify({"message": "Producto creado exitosamente", "producto": producto.id}), 201

# Leer todos los productos
@productos_bp.route('/productos', methods=['GET'])
def get_productos():
    productos = Producto.query.all()
    result = [
        {
            "id": producto.id,
            "nombre": producto.nombre,
            "descripcion": producto.descripcion,
            "precio": str(producto.precio),
            "disponible": producto.disponible,
            "categoria": producto.categoria
        }
        for producto in productos
    ]
    return jsonify(result), 200

# Leer un producto específico
@productos_bp.route('/productos/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):
    producto = Producto.query.get(producto_id)
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    
    result = {
        "id": producto.id,
        "nombre": producto.nombre,
        "descripcion": producto.descripcion,
        "precio": str(producto.precio),
        "disponible": producto.disponible,
        "categoria": producto.categoria
    }
    return jsonify(result), 200

# Actualizar un producto
@productos_bp.route('/productos/<int:producto_id>', methods=['PUT'])
def update_producto(producto_id):
    producto = Producto.query.get(producto_id)
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    
    data = request.get_json()
    producto.nombre = data.get('nombre', producto.nombre)
    producto.descripcion = data.get('descripcion', producto.descripcion)
    producto.precio = data.get('precio', producto.precio)
    producto.disponible = data.get('disponible', producto.disponible)
    producto.categoria = data.get('categoria', producto.categoria)
    
    db.session.commit()
    return jsonify({"message": "Producto actualizado exitosamente"}), 200

# Eliminar un producto
@productos_bp.route('/productos/<int:producto_id>', methods=['DELETE'])
def delete_producto(producto_id):
    producto = Producto.query.get(producto_id)
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    
    db.session.delete(producto)
    db.session.commit()
    return jsonify({"message": "Producto eliminado exitosamente"}), 200
