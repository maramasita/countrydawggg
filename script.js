// Display current time, updated every second
setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('current-time').textContent = currentTime;
}, 1000);

// Open and close Quick View modal
function openQuickView(title, imageUrl, price, description) {
    document.getElementById('quick-view-modal').style.display = 'block';
    document.getElementById('quick-view-title').innerText = title;
    document.getElementById('quick-view-image').src = imageUrl;
    document.getElementById('quick-view-price').innerText = price;
    document.getElementById('quick-view-description').innerText = description; // Ensure description is passed
}

function closeQuickView() {
    document.getElementById('quick-view-modal').style.display = 'none';
}

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(productTitle, productPrice, productImage, productSize) {
    const existingProductIndex = cart.findIndex(item => item.title === productTitle && item.size === productSize);

    if (existingProductIndex > -1) {
        // If the product with the same size already exists in the cart, increase its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If it's a new product, add it to the cart
        const product = { title: productTitle, price: productPrice, image: productImage, size: productSize, quantity: 1 };
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCart(); // Update the cart after adding the item
}

// Function to update the cart UI
function updateCart() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('.cart-count').innerText = cartCount;

    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = ''; // Clear existing items
    let total = 0; // Initialize total price

    cart.forEach((item, index) => {
        total += parseFloat(item.price.replace('$', '')) * item.quantity; // Calculate total price
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title} ( ${item.size})</p> <!-- Display the selected size -->
                <p>${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>
        `;
    });

    const deliveryFees = cart.length > 0 ? 2 : 0; // Set delivery fee only if there are items in the cart
    const totalWithDelivery = total + deliveryFees; // Add delivery fee to total

    // Update the total price displayed in the cart
    document.querySelector('.cart-total').innerText = `Total: $${totalWithDelivery.toFixed(2)} (including $${deliveryFees} delivery fees)`; 
    document.getElementById('cart-overlay').classList.add('cart-active');
}

// Function to decrease quantity in the cart
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        // If quantity is 1, remove the item from the cart
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCart();
}

// Function to increase quantity in the cart
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCart();
}

// Toggle cart overlay visibility
function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.toggle('cart-active');
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out."); // Alert if cart is empty
        return; // Prevent proceeding to checkout
    }

    // Store cart data in localStorage before redirecting
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to checkout.html
    window.location.href = 'checkout.html';
}

// Update cart count on page load
window.onload = () => {
    updateCart();
};
