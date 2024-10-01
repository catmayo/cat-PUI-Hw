class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

const cart = [];

const glazingOptions = {
  'Keep Original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla milk': 0.50,
  'Double chocolate': 1.50
};

const packSizeOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10
};


function populateDropdowns() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');

  for (const glazing in glazingOptions) {
      const option = document.createElement('option');
      option.value = glazingOptions[glazing];
      option.textContent = glazing;
      glazingSelect.appendChild(option);
  }

  for (const size in packSizeOptions) {
      const option = document.createElement('option');
      option.value = packSizeOptions[size];
      option.textContent = size;
      packSizeSelect.appendChild(option);
  }
}

function updatePrice(basePrice) {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');
  const priceElement = document.querySelector('.price');

  const selectedGlazingPrice = parseFloat(glazingSelect.value);
  const selectedPackSizeMultiplier = parseInt(packSizeSelect.value);

  const totalPrice = (basePrice + selectedGlazingPrice) * selectedPackSizeMultiplier;
  priceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function getRollTypeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('roll'); 
}

function loadRollData(rollType) {
  const rollData = rolls[rollType];
  if (rollData) {
      document.querySelector('.product-title').textContent = `${rollType} Cinnamon Roll`;
      document.querySelector('.original-cinnamon-roll-image').src = `../assets/products/${rollData.imageFile}`;
      document.querySelector('.price').textContent = `$${rollData.basePrice.toFixed(2)}`;
      return rollData.basePrice;
  }
  return 2.49;
}

function addToCart(basePrice) {
  const rollType = getRollTypeFromUrl();
  const glazing = document.getElementById('glazing').options[document.getElementById('glazing').selectedIndex].text;
  const packSize = document.getElementById('pack-size').options[document.getElementById('pack-size').selectedIndex].text;
  
  const newRoll = new Roll(rollType, glazing, packSize, basePrice);
  cart.push(newRoll);
  
  console.log(cart);  
}

document.addEventListener('DOMContentLoaded', () => {
  const rollType = getRollTypeFromUrl();
  const basePrice = loadRollData(rollType);

  populateDropdowns();
  
  document.getElementById('glazing').addEventListener('change', () => updatePrice(basePrice));
  document.getElementById('pack-size').addEventListener('change', () => updatePrice(basePrice));
  
  document.querySelector('.add-to-cart').addEventListener('click', () => addToCart(basePrice));
  
  updatePrice(basePrice); 
});