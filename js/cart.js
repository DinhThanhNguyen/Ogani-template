// Danh sách sản phẩm mẫu
const products = [
    { id: 1, name: 'Beef', price: 20, image: 'img/product/product-1.jpg' },
    { id: 2, name: 'Bananas', price: 20, image: 'img/product/product-2.jpg' },
    { id: 3, name: 'Pink Guava', price: 20, image: 'img/product/product-3.jpg' },
    { id: 4, name: 'Grape', price: 20, image: 'img/product/product-4.jpg' },
    { id: 5, name: 'Hamburger', price: 20, image: 'img/product/product-5.jpg' },
    { id: 6, name: 'Mango', price: 20, image: 'img/product/product-6.jpg' },
    { id: 7, name: 'Watermelon', price: 20, image: 'img/product/product-7.jpg' },
    { id: 8, name: 'Apple', price: 20, image: 'img/product/product-8.jpg' },
    { id: 9, name: 'Plum', price: 20, image: 'img/product/product-9.jpg' },
    { id: 10, name: 'Fried Chicken', price: 20, image: 'img/product/product-10.jpg' },
    { id: 11, name: 'Fruit Milk', price: 20, image: 'img/product/product-11.jpg' },
    { id: 12, name: 'Fruit', price: 20, image: 'img/product/product-12.jpg' },
];

const featuredProductList = [
    { id: 1, name: 'Beef', price: 20, image: 'img/featured/feature-1.jpg', mix: 'fresh-meat' },
    { id: 2, name: 'Bananas', price: 20, image: 'img/featured/feature-2.jpg', mix: 'fresh-fruit' },
    { id: 3, name: 'Pink Guava', price: 20, image: 'img/featured/feature-3.jpg', mix: 'fresh-fruit' },
    { id: 4, name: 'Grape', price: 20, image: 'img/featured/feature-5.jpg', mix: 'fresh-fruit' },
    { id: 5, name: 'Hamburger', price: 20, image: 'img/featured/feature-6.jpg', mix: 'fastfood' },
    { id: 6, name: 'Mango', price: 20, image: 'img/featured/feature-7.jpg', mix: 'fresh-fruit' },
    { id: 7, name: 'Watermelon', price: 20, image: 'img/featured/feature-4.jpg', mix: 'fresh-fruit' },
    { id: 8, name: 'Apple', price: 20, image: 'img/featured/feature-8.jpg', mix: 'fresh-fruit' },
];

function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
        <div class="product__item__pic set-bg" data-setbg="${product.image}" style="background-image: url('${product.image}');">
            <ul class="product__item__pic__hover">
                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                <li><button onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i></button></li>
            </ul>
        </div>
        <div class="product__item__text">
            <h6><a href="/product-details.html">${product.name}</a></h6>
            <h5>$${product.price.toFixed(2)}</h5>
        </div>`;
        productItem.classList.add('col-lg-4');
        productItem.classList.add('col-md-6');
        productItem.classList.add('col-sm-6');
        productItem.classList.add('product__item');
        productList.appendChild(productItem);
    });
}

function renderFeaturedProducts() {
    const featuredProduct = document.getElementById('featured__product');

    if (!featuredProduct) return;

    featuredProduct.innerHTML = '';

    featuredProductList.forEach((product) => {
        featuredProduct.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 mix ${product.mix}">
                <div class="featured__item">
                    <div class="featured__item__pic set-bg" data-setbg="${product.image}" style="background-image: url('${product.image}');">
                        <ul class="featured__item__pic__hover">
                            <li>
                                <a href="#">
                                    <i class="fa fa-heart"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-retweet"></i>
                                </a>
                            </li>
                            <li>
                                <button onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i></button>
                            </li>
                        </ul>
                    </div>
                    <div class="featured__item__text">
                        <h6>
                            <a href="#">${product.name}</a>
                        </h6>
                        <h5>$${product.price.toFixed(2)}</h5>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find((p) => p.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.querySelector('.shoping__cart__table table tbody');
    const checkout = document.querySelector('.shoping__checkout');
    const checkoutOrder = document.querySelector('#checkout__order ul');
    const headerCartNumbers = document.querySelectorAll('.header__cart__number');
    const headerCartPrices = document.querySelectorAll('.header__cart__price');

    const cartNumber = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const total = subtotal - discount;

    headerCartNumbers.forEach((headerCartNumber) => {
        headerCartNumber.innerHTML = `${cartNumber}`;
    });

    headerCartPrices.forEach((headerCartPrice) => {
        headerCartPrice.innerHTML = `item: <span>$${subtotal.toFixed(2)}</span>`;
    });

    if (cartDiv) {
        cartDiv.innerHTML = '';
        // Hiển thị cart trong giỏ hàng
        cart.forEach((item, index) => {
            cartDiv.innerHTML += `
            <tr>
                <td class="shoping__cart__item">
                    <img src="${item.image}" alt="${item.name}">
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
                    <span class="icon_close" onclick="removeItem(${index})"></span>
                </td>
            </tr>`;
        });
    }

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

    // Hiển thị tổng tiền
    if (checkout) {
        checkout.innerHTML = '';

        checkout.innerHTML += `
        <h5>Cart Total</h5>
        <ul>
            <li>Subtotal <span>$${subtotal.toFixed(2)}</span></li>
            <li>Discount <span>$${discount.toFixed(2)}</span></li>
            <li>Total <span>$${total.toFixed(2)}</span></li>
        </ul>
        <a href="/checkout.html" class="primary-btn">PROCEED TO CHECKOUT</a>`;
    }

    if (checkoutOrder) {
        checkoutOrder.innerHTML = '';

        cart.forEach((item) => {
            checkoutOrder.innerHTML += `
                <li>${item.name} x ${item.quantity} <span>$${(item.price*item.quantity).toFixed(2)}</span></li>
            `;
        });

        document.querySelector('.checkout__order__subtotal').innerHTML = `Subtotal <span>$${subtotal.toFixed(2)}</span>`;
        document.querySelector('.checkout__order__discount').innerHTML = `Discount <span>$${discount.toFixed(2)}</span>`;
        document.querySelector('.checkout__order__total').innerHTML = `Total <span>$${total.toFixed(2)}</span>`;
    }
}

//Thay đổi số lượng sản phẩm trong giỏ hàng
function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Tải lại giỏ hàng khi load trang
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderFeaturedProducts();
    renderCart();
});
