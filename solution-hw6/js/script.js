class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}

const glazingOptions = {
  'Sugar Milk': 0.00,
  'Vanilla Milk': 0.50,
  'Original': 0.00,
  'None': 0.00
};

const queryParams = new URLSearchParams(window.location.search);
const rollType = queryParams.get('roll') || 'Original';
const basePrice = rolls[rollType]?.basePrice || 2.49; 
const imageFile = rolls[rollType]?.imageFile || 'original-cinnamon-roll.jpg';

function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(rollType, glazing, packSize, basePrice) {
  const cart = getCartFromLocalStorage();
  const newRoll = new Roll(rollType, glazing, packSize, basePrice);
  cart.push(newRoll);
  saveCartToLocalStorage(cart);
  console.log('Cart after adding new item:', cart);
}

function calculateTotalPrice(glazing, size, basePrice) {
  const glazingPrice = glazingOptions[glazing] || 0;
  return ((basePrice + glazingPrice) * size).toFixed(2);
}

function renderCartItems() {
  const cartContainer = document.getElementById("cart-items-container");
  cartContainer.innerHTML = '';

  const cart = getCartFromLocalStorage();

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById("cart-final-total-amount").innerText = "$0.00";
    return;
  }

  cart.forEach((roll, index) => {
    if (!roll.type) {
      console.error("Roll type is undefined or null", roll);
      return;
    }

    const cartItemContainer = document.createElement("section");
    cartItemContainer.classList.add("cart-item");

    const itemImage = document.createElement("div");
    itemImage.classList.add("item-image");
    const img = document.createElement("img");
    img.src = `../assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg`;
    img.alt = `${roll.type} Cinnamon Roll`;
    img.classList.add("cart-item-image");
    itemImage.appendChild(img);

    const remove = document.createElement("p");
    remove.classList.add("remove-item");
    remove.textContent = "Remove";
    remove.addEventListener('click', () => {
      removeFromCart(index);
    });
    itemImage.appendChild(remove);

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");
    itemDetails.innerHTML = `
      <p>${roll.type} Cinnamon Roll</p>
      <p>Glazing: ${roll.glazing}</p>
      <p>Pack Size: ${roll.size}</p>
      <p class="price">$${calculateTotalPrice(roll.glazing, roll.size, roll.basePrice)}</p>
    `;

    cartItemContainer.appendChild(itemImage);
    cartItemContainer.appendChild(itemDetails);

    cartContainer.appendChild(cartItemContainer);
  });
}

function updateTotalPrice() {
  const cart = getCartFromLocalStorage();
  let total = 0;
  cart.forEach(roll => {
    total += parseFloat(calculateTotalPrice(roll.glazing, roll.size, roll.basePrice));
  });
  document.getElementById("cart-final-total-amount").innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  const cart = getCartFromLocalStorage();
  cart.splice(index, 1);
  saveCartToLocalStorage(cart);
  renderCartItems();
  updateTotalPrice();
}

document.addEventListener('DOMContentLoaded', () => {
  const productTitleElement = document.querySelector('.product-title');
  const productImageElement = document.querySelector('.original-cinnamon-roll-image');
  const priceElement = document.querySelector('.price');
  if (productTitleElement && productImageElement && priceElement) {
    productTitleElement.textContent = `${rollType} Cinnamon Roll`;
    productImageElement.src = `../assets/products/${imageFile}`;
    productImageElement.alt = `${rollType} Cinnamon Roll`;
    priceElement.textContent = `$${basePrice.toFixed(2)}`;

    const addToCartButton = document.getElementById('addToCartButton');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        const glazing = document.getElementById('glazing').value;
        const packSize = parseInt(document.getElementById('pack-size').value);
        addToCart(rollType, glazing, packSize, basePrice);
        alert('Item added to cart!');
      });
    }

    function updatePrice() {
      const glazing = document.getElementById('glazing')?.value;
      const packSize = parseInt(document.getElementById('pack-size')?.value);
      if (glazing && packSize) {
        const glazingPrice = glazingOptions[glazing];
        const updatedPrice = ((basePrice + glazingPrice) * packSize).toFixed(2);
        priceElement.textContent = `$${updatedPrice}`;
      }
    }

    if (document.getElementById('glazing') && document.getElementById('pack-size')) {
      document.getElementById('glazing').addEventListener('change', updatePrice);
      document.getElementById('pack-size').addEventListener('change', updatePrice);
    }

    updatePrice();
  }
  if (document.getElementById("cart-items-container")) {
    renderCartItems();
    updateTotalPrice();
  }
});
