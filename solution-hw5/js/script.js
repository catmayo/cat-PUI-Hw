class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}

// Dummy cart data for testing
const cartRolls = [
  new Roll('Original', 'Sugar Milk', 1, 2.49),
  new Roll('Walnut', 'Vanilla Milk', 12, 3.99),
  new Roll('Raisin', 'Sugar Milk', 3, 2.99),
  new Roll('Apple', 'Original', 3, 3.49)
];

function calculateTotalPrice(glazing, size, basePrice) {
  const glazingPriceMap = {
    'Sugar Milk': 0.00,
    'Vanilla Milk': 0.50,
    'Original': 0.00,
    'None': 0.00
  };
  const glazingPrice = glazingPriceMap[glazing];
  return ((basePrice + glazingPrice) * size).toFixed(2);
}

function renderCartItems() {
  const cartContainer = document.getElementById("cart-items-container");
  cartContainer.innerHTML = ''; 

  for (const roll of cartRolls) {
    const cartItemContainer = document.createElement("section");
    cartItemContainer.classList.add("cart-item");

    const itemImage = document.createElement("div");
    itemImage.classList.add("item-image");
    const img = document.createElement("img");
    img.src = `../assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg`;
    img.alt = `${roll.type} Cinnamon Roll`;
    img.classList.add("cart-item-image");
    itemImage.appendChild(img);

    // Remove 
    const remove = document.createElement("p");
    remove.classList.add("remove-item");
    remove.textContent = "Remove";
    remove.addEventListener('click', () => {
      removeFromCart(roll);
    });
    itemImage.appendChild(remove);

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("cart-description");  
    itemDetails.innerHTML = `
      <p>${roll.type} Cinnamon Roll</p>
      <p>Glazing: ${roll.glazing}</p>
      <p>Pack Size: ${roll.size}</p>
      <p class="price">$${calculateTotalPrice(roll.glazing, roll.size, roll.basePrice)}</p>
    `;
    cartItemContainer.appendChild(itemImage);
    cartItemContainer.appendChild(itemDetails);
    cartContainer.appendChild(cartItemContainer);
  }
}

function updateTotalPrice() {
  let total = 0;
  cartRolls.forEach(roll => {
    total += parseFloat(calculateTotalPrice(roll.glazing, roll.size, roll.basePrice));
  });
  document.getElementById("cart-final-total-amount").innerText = `$${total.toFixed(2)}`;
}
document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  updateTotalPrice(); 
});

function removeFromCart(roll) {
  const index = cartRolls.indexOf(roll);
  if (index > -1) {
    cartRolls.splice(index, 1);
  }
  renderCartItems(); 
  updateTotalPrice(); 
}