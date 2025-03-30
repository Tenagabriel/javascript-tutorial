
import {cart, addToCart, saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productContainer = '';

products.forEach((product) => {
 const html = `
 <div class="product-container">

   <div class="product-image-container">
   <img class="product-image" src="${product.image}">
   </div>

   <div class="product-name limit-text-to-2-lines">
   ${product.name}
   </div>
  <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

           <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
       
            <div class="product-quantity-container">
             <select class="js-quantity-selector">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
             </select>
            </div>

            <div class="added-to-cart js-added-to-cart">
           
          </div>
          

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>

 </div>
 `
productContainer = productContainer + html;
})

document.querySelector('.js-product-grid').innerHTML = productContainer;




function updateCartQuantity() {
     let cartQuantity = 0; 

      cart.forEach((cartItem) => {
       cartQuantity = cartQuantity + cartItem.quantity;
      })

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

  const buttonElements = document.querySelectorAll('.js-add-to-cart')
    buttonElements.forEach((button) => {
      button.addEventListener('click', () => {
       const productId = button.dataset.productId;

      const quantitySelector = button.closest('.product-container').querySelector('.js-quantity-selector')

      const quantity = Number(quantitySelector.value);

       addToCart(productId, quantity);
       
       updateCartQuantity();
 
      const addedMessage = button.closest('.product-container').querySelector('.js-added-to-cart');
      addedMessage.innerHTML = `
        <img src="images/icons/checkmark.png">
        Added
      `;

      addedMessage.classList.add('added-to-cart-visible');

      setTimeout(() => {
        addedMessage.innerHTML = '';
        addedMessage.classList.remove('added-to-cart-visible'); 
      }, 2000);

   console.log(cart);

   })
});