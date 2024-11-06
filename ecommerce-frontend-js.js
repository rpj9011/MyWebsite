// Product data structure
const products = [
    {
        id: 1,
        name: "Classic Black Hoodie",
        price: 59.99,
        description: "Premium cotton blend hoodie in classic black",
        image: "black-hoodie.jpg",
        category: "hoodie"
    }
    // Add more products here
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({
            ...product,
            quantity: 1
        });
        updateCart();
        showNotification('Product added to cart!');
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').textContent = cart.length;
}

// Product display
function displayProducts(products) {
    const productGrid = document.getElementById('featured-products');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Search functionality
function searchProducts(query) {
    return products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCart();

    // Search handler
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const filteredProducts = searchProducts(query);
        displayProducts(filteredProducts);
    });
});
