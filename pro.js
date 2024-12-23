
    let cartItems = [];

    // Function to toggle the cart overlay visibility
    function toggleCart() {
        const cartOverlay = document.getElementById('cart-overlay');
        cartOverlay.classList.toggle('cart-active');
    }

    // Function to add a product to the cart
    function addToCart(productName, productPrice, productImage, productSize) {
        // Check if the product is already in the cart
        const existingProductIndex = cartItems.findIndex(item => item.name === productName && item.size === productSize);

        if (existingProductIndex !== -1) {
            // Update the quantity if the product already exists in the cart
            cartItems[existingProductIndex].quantity += 1;
        } else {
            // Add new product to the cart
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                size: productSize,
                quantity: 1
            });
        }

        updateCartUI();
    }

    // Function to update the cart UI
    function updateCartUI() {
        const cartContent = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        cartContent.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            total += parseFloat(item.price.replace('$', '')) * item.quantity; // Update the total price calculation
            cartContent.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Size: ${item.size}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart('${item.name}', '${item.size}')">Remove</button>
                </div>
            `;
        });

        // Update the cart count
        cartCount.innerText = cartItems.length;
        document.querySelector('.cart-total').innerText = `Total: $${total.toFixed(2)}`;
    }

    // Function to remove an item from the cart
    function removeFromCart(productName, productSize) {
        // Remove item from cartItems
        cartItems = cartItems.filter(item => !(item.name === productName && item.size === productSize));
        updateCartUI();
    }

    // Function to close the quick view modal
    function closeQuickView() {
        document.getElementById('quick-view-modal').style.display = 'none';
    }

    // Function to open the quick view modal and show the product details
    function openQuickView(title, image, price, description) {
        document.getElementById('quick-view-title').innerText = title;
        document.getElementById('quick-view-image').src = image;
        document.getElementById('quick-view-price').innerText = price;
        document.getElementById('quick-view-description').innerText = description;
        document.getElementById('quick-view-modal').style.display = 'block';
    }

