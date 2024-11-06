// Referencias a los elementos
const manageMenuButton = document.getElementById('manageMenuButton');
const viewReservationsButton = document.querySelector('a[data-section="reservationsSection"]'); // Botón para ver reservas
const dashboardSection = document.getElementById('dashboardSection');
const menuManagementSection = document.getElementById('menuManagementSection');
const productsSection = document.getElementById('productsSection');
const viewProductsButton = document.querySelector('a[data-section="productsSection"]'); // Botón para ver productos
const reservationsSection = document.getElementById('reservationsSection');
const productList = document.getElementById('productList');
const menuForm = document.getElementById('menuForm');
const reservationsTableBody = document.getElementById('reservationsTable').getElementsByTagName('tbody')[0];

// Mostrar la sección de gestión de menú al hacer clic
manageMenuButton.addEventListener('click', function() {
    dashboardSection.style.display = 'none'; // Ocultar el panel de estadísticas
    menuManagementSection.style.display = 'block'; // Mostrar la sección de gestión del menú
    reservationsSection.style.display = 'none'; // Ocultar la sección de reservas
    productsSection.style.display = 'none';
});

// Mostrar la sección de gestión de productos al hacer clic
viewProductsButton.addEventListener('click', function() {
    dashboardSection.style.display = 'none'; // Ocultar el panel de estadísticas
    productsSection.style.display = 'block'; // Mostrar la sección de gestión del producto
    menuManagementSection.style.display = 'none'; 
    reservationsSection.style.display = 'none'; // Ocultar la sección de reservas

});

// Mostrar la sección de reservas al hacer clic
viewReservationsButton.addEventListener('click', function() {
    dashboardSection.style.display = 'none'; // Ocultar el panel de estadísticas
    menuManagementSection.style.display = 'none'; // Ocultar la sección de gestión del menú
    reservationsSection.style.display = 'block'; // Mostrar la sección de reservas
    productsSection.style.display = 'none';
    renderReservations(); // Cargar las reservas desde la base de datos
});

// Función para renderizar productos en la lista
/*function renderProducts() {
    const products = JSON.parse(localStorage.getItem('menuProducts')) || [];
    productList.innerHTML = ''; // Limpiar la lista

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('menu-item');
        productElement.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <h3>${product.nombre}</h3>
            <p>${product.descripcion}</p>
            <span>$${product.precio}</span>
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Eliminar</button>
        `;
        productList.appendChild(productElement);
    });
}*/

// Función para agregar un nuevo producto
/*menuForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const categoria = document.getElementById('category').value;
    const nombre = document.getElementById('nombrePlato').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const newProduct = { categoria, nombre, descripcion, precio, imagen };

    // Obtener productos existentes
    let products = JSON.parse(localStorage.getItem('menuProducts')) || [];
    products.push(newProduct);

    // Guardar productos actualizados
    localStorage.setItem('menuProducts', JSON.stringify(products));

    // Limpiar el formulario
    menuForm.reset();

    // Renderizar los productos actualizados
    renderProducts();
});*/

// Función para eliminar un producto
/*function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('menuProducts')) || [];
    products.splice(index, 1);
    localStorage.setItem('menuProducts', JSON.stringify(products));
    renderProducts();
}*/

// Función para editar un producto
/*function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('menuProducts')) || [];
    const product = products[index];

    document.getElementById('category').value = product.categoria;
    document.getElementById('nombrePlato').value = product.nombre;
    document.getElementById('descripcion').value = product.descripcion;
    document.getElementById('precio').value = product.precio;
    document.getElementById('imagen').value = product.imagen;

    products.splice(index, 1); // Eliminar temporalmente para reemplazar
    localStorage.setItem('menuProducts', JSON.stringify(products));

    renderProducts();
}*/

// Función para renderizar reservas
/**async function renderReservations() {
    try {
        const response = await fetch('get_reservations.php'); // Llamada al archivo PHP
        const reservations = await response.json(); // Obtener las reservas en formato JSON
        reservationsTableBody.innerHTML = ''; // Limpiar la tabla de reservas

        reservations.forEach((reservation) => {
            const row = reservationsTableBody.insertRow();
            row.innerHTML = `
                <td>${reservation.nombre_usuario}</td>
                <td>${reservation.fecha_reserva}</td>
                <td>${reservation.hora_reserva}</td>
                <td>${reservation.num_personas}</td>
                <td>
                    <button class="edit-reservation" onclick="editReservation(${reservation.id})">Editar</button>
                    <button class="delete-reservation" onclick="deleteReservation(${reservation.id})">Eliminar</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error al cargar las reservas:', error);
    }
}*/

// Función para agregar una nueva reserva (puedes personalizarlo)
async function addReservation(reservation) {
    // Aquí podrías implementar la lógica para agregar reservas en la base de datos
}

// Función para eliminar una reserva
async function deleteReservation(id) {
    // Aquí podrías implementar la lógica para eliminar reservas en la base de datos
    renderReservations(); // Volver a cargar las reservas
}

// Función para editar una reserva (puedes personalizarlo)
async function editReservation(id) {
    // Aquí podrías implementar la lógica para editar reservas
    alert('Función de editar no implementada aún.');
}

// Cargar productos desde el backend
async function loadProducts() {
    const response = await fetch('http://localhost:5000/productos');
    const productos = await response.json();
    
    const productosSelect = document.getElementById('productos_menus');
    productosSelect.innerHTML = ''; // Limpiar el select antes de agregar opciones
    
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id; // Asumiendo que tu objeto producto tiene un ID
        option.textContent = producto.nombre; // Asumiendo que tiene un nombre
        productosSelect.appendChild(option);
    });
}

// URL base para el backend
const API_BASE_URL = 'http://localhost:5000';  // Cambia este valor si tu backend tiene otra URL o puerto

// Referencias a elementos del DOM
//menuForm = document.getElementById('menuForm');
const menuIdInput = document.getElementById('menuId');
const menuTableBody = document.getElementById('menuTableBody');
const productosSelect = document.getElementById('productos_menus');

// Cargar productos al cargar la página para el selector de productos en el menú
async function loadProductosMenu() {
    try {
        const response = await fetch(`http://localhost:5000/productos`);
        const productos = await response.json();
        const productosSelect = document.getElementById('productos_menus');

        if (productosSelect != null) {
            productosSelect.innerHTML = ''; // Limpiar opciones previas
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                productosSelect.appendChild(option); // Agregar opción solo si productosSelect existe
            });
        }
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}


// Cargar menús existentes
async function loadMenus() {
    try {
        const response = await fetch(`${API_BASE_URL}/menus`);
        const menus = await response.json();
        

        menuTableBody.innerHTML = '';
        menus.forEach(menu => {
            // Crear una lista de nombres de productos asociados al menú
            const productosNombres = menu.productos.map(producto => producto.nombre).join(', ');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${menu.nombre}</td>
                <td>${menu.descripcion}</td>
                <td>${menu.precio}</td>
                <td>${menu.disponible ? 'Sí' : 'No'}</td>
                <td>${productosNombres}</td> <!-- Aquí se muestra la lista de productos -->
                <td>
                    <button onclick="editMenu(${menu.id})">Editar</button>
                    <button onclick="confirmacionDelMenu(${menu.id})">Eliminar</button>
                </td>
            `;
            menuTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar menús:", error);
    }
}

// Agregar o actualizar un menú
menuForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const productosSelect = document.getElementById('productos_menus');
    let menuId = menuIdInput.value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const disponible = document.getElementById('disponible').value === 'true';
    
    // Obtener los IDs de los productos seleccionados
    const productos = Array.from(productosSelect.selectedOptions).map(option => option.value);

    const menuData = { nombre, descripcion, precio, disponible};

    try {
        let response;
        if (menuId) {
            // Editar menú existente
            response = await fetch(`${API_BASE_URL}/menus/${menuId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menuData)
            });


            if (response.ok) {
                // Primero eliminar productos no seleccionados
                const currentProductsResponse = await fetch(`${API_BASE_URL}/menus/${menuId}/productos`);
                const currentProducts = await currentProductsResponse.json();
                const currentProductIds = currentProducts.map(product => product.id);
                
                // Encontrar productos a eliminar
                const productsToRemove = currentProductIds.filter(id => !productos.includes(id.toString()));
                for (const productId of productsToRemove) {
                    await fetch(`${API_BASE_URL}/menus/${menuId}/productos/${productId}`, {
                        method: 'DELETE'
                    });
                }
            }
        } else {
            // Crear nuevo menú
            response = await fetch(`${API_BASE_URL}/menus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menuData)
            });
            if (response.ok) {
                const responseData = await response.json();
                menuId = responseData.menu; // Obtener el ID del menú creado desde la respuesta
            }
        }

        if (response.ok) {
            // Llamar a la función para asociar cada producto al menú
            await associateProductsToMenu(menuId, productos);

            loadMenus();
            menuForm.reset();
            menuIdInput.value = '';  // Limpiar el ID después de agregar o actualizar
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
    }
});

//asociar un producto al menu
async function associateProductsToMenu(menuId, productos) {
    for (let productoId of productos) {
        try {
            const response = await fetch(`http://localhost:5000/menus/${menuId}/productos/${productoId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al asociar producto:", errorData);
            }
        } catch (error) {
            console.error("Error en la asociación de productos al menú:", error);
        }
    }
}


// Editar un menú
async function editMenu(id) {
    try {
        const productosSelect = document.getElementById('productos_menus');
        const response = await fetch(`${API_BASE_URL}/menus/${id}`);
        const menu = await response.json();

        menuIdInput.value = menu.id;
        document.getElementById('nombre').value = menu.nombre;
        document.getElementById('descripcion').value = menu.descripcion;
        document.getElementById('precio').value = menu.precio;
        document.getElementById('disponible').value = menu.disponible.toString();
        
        // Seleccionar productos asociados al menú
        Array.from(productosSelect.options).forEach(option => {
            option.selected = menu.productos.includes(parseInt(option.value));
        });
    } catch (error) {
        console.error("Error al cargar el menú para editar:", error);
    }
}

// Eliminar un menú
async function deleteMenu(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/menus/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                title: 'Éxito',
                text: result.mensaje,
                icon: 'success'
            });
            loadMenus();
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
    } catch (error) {
        console.error("Error al eliminar el menú:", error);
    }
}

// Función que solicita confirmación antes de eliminar el menu
function confirmacionDelMenu(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar este menu después de borrarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteMenu(id); // Llama a la función de eliminación
        } else {
            Swal.fire({
                title: 'Cancelado',
                text: 'El producto no ha sido borrado.',
                icon: 'info'
            });
        }
    });
}

// Cargar los datos iniciales al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    loadProductosMenu();
    loadMenus();
});

// Llamar a la función para cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);

// Inicializar las vistas
//renderProducts();

document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const productForm = document.getElementById("productForm");
    //const productTableBody = document.getElementById("productTableBody");

    // Función para manejar el envío del formulario de producto
    productForm.addEventListener("submit", event => {
        event.preventDefault();
        const id = document.getElementById("productId").value;
        const nombre = document.getElementById("productName").value;
        const descripcion = document.getElementById("productDescription").value;
        const precio = document.getElementById("productPrice").value;
        const disponible = document.getElementById("productAvailable").value === "true";
        const categoria = document.getElementById("productCategory").value;

        const productData = { nombre, descripcion, precio, disponible, categoria };

        if (id) {
            // Editar producto existente
            fetch(`${API_BASE_URL}/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData)
            }).then(response => {
                if (response.ok) {
                    cargarProductos();
                    productForm.reset();
                } else {
                    console.error("Error al actualizar el producto");
                }
            });
        } else {
            // Crear un nuevo producto
            fetch(`${API_BASE_URL}/productos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData)
            }).then(response => {
                if (response.ok) {
                    cargarProductos();
                    productForm.reset();
                } else {
                    console.error("Error al crear el producto");
                }
            });
        }
    });

    // Función para eliminar un producto
    window.deleteProduct = function(id) {
        if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            fetch(`${API_BASE_URL}/productos/${id}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        loadProducts();
                    } else {
                        console.error("Error al eliminar el producto");
                    }
                });
        }
    };

    // Función para editar un producto (llenar el formulario con datos existentes)
    window.editProduct = function(id) {
        fetch(`${API_BASE_URL}/productos/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById("productId").value = product.id;
                document.getElementById("productName").value = product.nombre;
                document.getElementById("productDescription").value = product.descripcion;
                document.getElementById("productPrice").value = product.precio;
                document.getElementById("productAvailable").value = product.disponible ? "true" : "false";
                document.getElementById("productCategory").value = product.categoria;
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    };
});

function cargarProductos() {
    fetch(`http://localhost:5000/productos`) // Asegúrate de que esta ruta sea correcta
        .then(response => response.json())
        .then(data => {
            const productTableBody = document.getElementById("productTableBody");
            if (productTableBody) {
                productTableBody.innerHTML = "";
                data.forEach(product => {
                    const row = `
                        <tr>
                            <td>${product.nombre}</td>
                            <td>${product.descripcion}</td>
                            <td>$${product.precio}</td>
                            <td>${product.disponible ? 'Sí' : 'No'}</td>
                            <td>${product.categoria}</td>
                            <td>
                                <button onclick="editarProducto(${product.id})">Editar</button>
                                <button onclick="confirmarEliminacion(${product.id})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                    productTableBody.insertAdjacentHTML('beforeend', row);
                });
            } else {
                console.error("Elemento productTableBody no encontrado en el DOM.");
            }
        })
        .catch(error => console.error("Error al cargar los productos:", error));
}
document.addEventListener("DOMContentLoaded", cargarProductos);
// Llamar a la función para cargar productos al cargar la página
cargarProductos();

// Eliminar un producto
async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:5000/productos/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            cargarProductos();
            Swal.fire({
                title: 'Éxito',
                text: result.mensaje,
                icon: 'success'
            });
        } else {
            const errorData = await response.json();
            console.error("Error:", errorData);
        }
    } catch (error) {
        console.error("Error al eliminar el menú:", error);
    }
}

// Función que solicita confirmación antes de eliminar el producto
function confirmarEliminacion(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar este producto después de borrarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarProducto(id); // Llama a la función de eliminación
        } else {
            Swal.fire({
                title: 'Cancelado',
                text: 'El producto no ha sido borrado.',
                icon: 'info'
            });
        }
    });
}

// Editar producto
async function editarProducto(id) {
    const productIdInput = document.getElementById('productId');
    try {
        const response = await fetch(`http://localhost:5000/productos/${id}`);
        const product = await response.json();

        productIdInput.value = product.id;
        document.getElementById('productName').value = product.nombre;
        document.getElementById('productDescription').value = product.descripcion;
        document.getElementById('productPrice').value = product.precio;
        document.getElementById('productAvailable').value = product.disponible.toString();
        document.getElementById('productCategory').value = product.categoria;
        
    } catch (error) {
        console.error("Error al cargar el producto para editar:", error);
    }
}


