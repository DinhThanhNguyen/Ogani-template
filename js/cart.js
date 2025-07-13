function addToCart(name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã có trong giỏ
    const index = cart.findIndex((item) => item.name === name);
    if (index >= 0) {
        cart[index].quantity += 1;
    } else {
        cart.push({ name, image, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

//Thay đổi số lượng sản phẩm trong giỏ hàng
function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart[index].quantity += amount;

    // Nếu số lượng < 1 thì xóa luôn sản phẩm
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.querySelector('.shoping__cart__table table tbody');
    const checkout = document.querySelector('.shoping__checkout');
    cartDiv.innerHTML = '';
    checkout.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p style="display: flex; font-size: 18px; margin-top: 12px;">Your cart is empty.</p>';
        checkout.innerHTML = `
        <h5>Cart Total</h5>
        <ul>
            <li>Subtotal <span>$${Number(0).toFixed(2)}</span></li>
            <li>Discount <span>$${Number(0).toFixed(2)}</span></li>
            <li>Total <span>$${Number(0).toFixed(2)}</span></li>
        </ul>
        <a href="checkout.html" class="primary-btn">PROCEED TO CHECKOUT</a>`;
        return;
    }

    cart.forEach((item, index) => {
        cartDiv.innerHTML += `
        <tr>
            <td class="shoping__cart__item">
                <img src="${item.image}" alt="">
                <h5>${item.name}</h5>
            </td>
            <td class="shoping__cart__price">$${item.price.toFixed(2)}</td>
            <td class="shoping__cart__quantity">
                <div class="quantity">
                    <div class="pro-qty">
                        <span class="dec qtybtn" onclick="changeQuantity(${index}, -1)">-</span>
                        <input name="quantity" type="text" value="${item.quantity}">
                        <span class="inc qtybtn" onclick="changeQuantity(${index}, 1)">+</span>
                    </div>
                </div>
            </td>
            <td class="shoping__cart__total">$${(item.price * item.quantity).toFixed(2)}</td>
            <td class="shoping__cart__item__close">
                <span class="icon_close" onclick="removeFromCart(${index})"></span>
            </td>
        </tr>`;
    });

    // Hiển thị tổng tiền
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const total = subtotal - discount;

    checkout.innerHTML += `
    <h5>Cart Total</h5>
    <ul>
        <li>Subtotal <span>$${subtotal.toFixed(2)}</span></li>
        <li>Discount <span>$${discount.toFixed(2)}</span></li>
        <li>Total <span>$${total.toFixed(2)}</span></li>
    </ul>
    <a href="checkout.html" class="primary-btn">PROCEED TO CHECKOUT</a>`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// Tải lại giỏ hàng khi load trang
window.onload = displayCart;
