let addBtn = document.querySelectorAll('.add_btn');

let products = [
    {
        name: 'Lorem Ipsum is simply dummy text',
        tag: 'lorem',
        price: 45,
        inCart: 0
    }
];

for(let i = 0; i < addBtn.length; i++){
    addBtn[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

onLoadCartNumbers = () => {
    let productNumbers = localStorage.getItem('cartNums');
    if (productNumbers) {
        document.querySelector('.cart sup').textContent = productNumbers;
    }
}

cartNumbers = (product) => {
    let productNumbers = localStorage.getItem('cartNums');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNums', productNumbers + 1);
        document.querySelector('.cart sup').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNums', 1);
        document.querySelector('.cart sup').textContent = 1;
    }

    setItems(product);

}

setItems = (product) => {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems !== null) {
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

totalCost = (product) => {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost !== null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

displayCartItems = () => {
    let prodImg = localStorage.getItem('prodImage');
    // let prodSize = localStorage.getItem('prodSize');
    let cartCost = localStorage.getItem('totalCost');

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.product-container');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr class="rem1">
                <td class="invert-image">
                    <img src="${prodImg}" alt=" " width="130px" height="150px" class="img-responsive">
                    <span>${item.name}</span>
                </td>
                <td class="invert">GH&cent; ${item.price}</td>
                <td class="invert">
                    <div class="quantity">
                        <div class="quantity-select">
                            <div class="entry value-minus">&nbsp;</div>
                            <div class="entry value">
                                <span>${item.inCart}</span>
                            </div>
                            <div class="entry value-plus active">&nbsp;</div>
                        </div>
                    </div>
                </td>
                <td class="total">GH&cent; ${item.price * item.inCart}</td>
                <td class="invert">
                    <div class="rem">
                        <div class="close1"> </div>
                    </div>
                </td>
            </tr>
            `;
        });

        productContainer.innerHTML += `

            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle">Cart Total</h4>
                <h4 class="cartTotal">GH&cent; ${cartCost}</h4>
            </div>

        `;

    } else {
        let productImage = document.querySelector('.etalage_thumb_image').src;
        // let productSize = document.querySelector('.product_size').value;



        localStorage.setItem('prodImage', productImage);
        // localStorage.setItem('prodSize', productSize);
        // console.log(productSize);
    }
}

onLoadCartNumbers();
displayCartItems();