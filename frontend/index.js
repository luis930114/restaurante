const API_BASE_URL = 'http://localhost:5000';

async function loadTopProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`);
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }
        const productos = await response.json();
        renderProducts(productos);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

function renderProducts(productos) {
    const containerProducts = document.querySelector('.container-products');
    containerProducts.innerHTML = '';

    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('card-product');
        productCard.innerHTML = `
            <div class="container-img">
                <img src="img/irish.png" alt="${producto.nombre}" />
                <div class="button-group">
                    <span><i class="fa-regular fa-eye"></i></span>
                    <span><i class="fa-regular fa-heart"></i></span>
                    <span><i class="fa-solid fa-code-compare"></i></span>
                </div>
            </div>
            <div class="content-card-product">
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                </div>
                <h3>${producto.nombre}</h3>
                <span class="add-cart"><i class="fa-solid fa-basket-shopping"></i></span>
                 <p >$${producto.descripcion} </p>
                <p class="price">$${producto.precio} </p>
            </div>
        `;
        containerProducts.appendChild(productCard);
    });
}

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', loadTopProducts);