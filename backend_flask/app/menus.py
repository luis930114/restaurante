from flask import Blueprint, request, jsonify
from .models import Menu, Producto, db

menus_bp = Blueprint('menus', __name__)

# Crear un nuevo menú
@menus_bp.route('/menus', methods=['POST'])
def create_menu():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    precio = data.get('precio')
    disponible = data.get('disponible', True)

    menu = Menu(nombre=nombre, descripcion=descripcion, precio=precio, disponible=disponible)
    db.session.add(menu)
    db.session.commit()
    return jsonify({"message": "Menú creado exitosamente", "menu": menu.id}), 201

# Leer todos los menús
@menus_bp.route('/menus', methods=['GET'])
def get_menus():
    menus = Menu.query.all()
    result = [
        {
            "id": menu.id,
            "nombre": menu.nombre,
            "descripcion": menu.descripcion,
            "precio": str(menu.precio),
            "disponible": menu.disponible,
            "productos": [{"id": producto.id, "nombre": producto.nombre} for producto in menu.productos]
        }
        for menu in menus
    ]
    return jsonify(result), 200

# Leer un menú específico
@menus_bp.route('/menus/<int:menu_id>', methods=['GET'])
def get_menu(menu_id):
    menu = Menu.query.get(menu_id)
    if not menu:
        return jsonify({"error": "Menú no encontrado"}), 404
    
    result = {
        "id": menu.id,
        "nombre": menu.nombre,
        "descripcion": menu.descripcion,
        "precio": str(menu.precio),
        "disponible": menu.disponible,
        "productos": [{"id": producto.id, "nombre": producto.nombre} for producto in menu.productos]
    }
    return jsonify(result), 200

# Actualizar un menú
@menus_bp.route('/menus/<int:menu_id>', methods=['PUT'])
def update_menu(menu_id):
    menu = Menu.query.get(menu_id)
    if not menu:
        return jsonify({"error": "Menú no encontrado"}), 404
    
    data = request.get_json()
    menu.nombre = data.get('nombre', menu.nombre)
    menu.descripcion = data.get('descripcion', menu.descripcion)
    menu.precio = data.get('precio', menu.precio)
    menu.disponible = data.get('disponible', menu.disponible)
    
    db.session.commit()
    return jsonify({"message": "Menú actualizado exitosamente"}), 200

# Eliminar un menú
@menus_bp.route('/menus/<int:menu_id>', methods=['DELETE'])
def delete_menu(menu_id):
    menu = Menu.query.get(menu_id)
    if not menu:
        return jsonify({"error": "Menú no encontrado"}), 404
    
    db.session.delete(menu)
    db.session.commit()
    return jsonify({"message": "Menú eliminado exitosamente"}), 200

# Añadir producto a un menú
@menus_bp.route('/menus/<int:menu_id>/productos/<int:producto_id>', methods=['POST'])
def add_product_to_menu(menu_id, producto_id):
    menu = Menu.query.get(menu_id)
    producto = Producto.query.get(producto_id)
    if not menu or not producto:
        return jsonify({"error": "Menú o Producto no encontrado"}), 404

    menu.productos.append(producto)
    db.session.commit()
    return jsonify({"message": "Producto añadido al menú exitosamente"}), 200

# Eliminar producto de un menú
@menus_bp.route('/menus/<int:menu_id>/productos/<int:producto_id>', methods=['DELETE'])
def remove_product_from_menu(menu_id, producto_id):
    menu = Menu.query.get(menu_id)
    producto = Producto.query.get(producto_id)
    if not menu or not producto:
        return jsonify({"error": "Menú o Producto no encontrado"}), 404

    menu.productos.remove(producto)
    db.session.commit()
    return jsonify({"message": "Producto eliminado del menú exitosamente"}), 200

# Obtener productos de un menú específico
@menus_bp.route('/menus/<int:menu_id>/productos', methods=['GET'])
def get_products_for_menu(menu_id):
    menu = Menu.query.get(menu_id)
    if not menu:
        return jsonify({"error": "Menú no encontrado"}), 404

    productos = menu.productos
    productos_data = [{'id': producto.id, 'nombre': producto.nombre, 'precio': producto.precio} for producto in productos]
    
    return jsonify(productos_data), 200
