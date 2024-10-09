console.log('JavaScript is working');

const cart = [];

const queryString = window.location.search;

console.log(queryString);

const params = new URLSearchParams(queryString);

console.log(params);

const chosenRoll = params.get("roll");

console.log('Chosen Roll:', chosenRoll);   // Check if the roll type from the URL is correct

// Ensure rollsData.js is loaded and the roll data exists
const rollInfo = rolls[chosenRoll];  // Get roll data from rolls object

if (!rollInfo) {
    console.error('Error: Roll information not found for:', chosenRoll);
    return;
}

console.log('Roll Info:', rollInfo);  // Check if rollInfo is correct

// Update header 
const headerElement = document.querySelector('#detail-header-text');
headerElement.innerText = `${chosenRoll} Cinnamon Roll`;

// Update image
const detailImg = document.querySelector('#detail-img');
detailImg.src = `https://claricedu.github.io/pui-homework-claricedu/assets/products/${rollInfo.imageFile}`;

// Update price
const priceElement = document.querySelector('#detail-price');
priceElement.textContent = `$${rollInfo.basePrice.toFixed(2)}`;

// =========================

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const addToCartButton = document.querySelector('#detail-add-cart-button');
addToCartButton.addEventListener('click', () => {
    const selectedGlazing = glazingSelect.value;
    const selectedPackSize = parseInt(packSelect.value);

    // Create a new Roll instance and add it to the cart
    const newRoll = new Roll(chosenRoll, selectedGlazing, selectedPackSize, rollInfo.basePrice);
    cart.push(newRoll);

    // Log the cart to the console for now
    console.log(cart);
});

// =========================

let basePrice = rollInfo.basePrice;  // Use the base price from rollInfo dynamically

let glazingOptions = [
    { name: 'Keep original', priceAdaptation: 0.00},
    { name: 'Sugar milk', priceAdaptation: 0.00},
    { name: 'Vanilla milk', priceAdaptation: 0.50},
    { name: 'Double Chocolate', priceAdaptation: 1.50},
];

let packOptions = [
    { name: '1', priceAdaptation: 1 },
    { name: '3', priceAdaptation: 3 },
    { name: '6', priceAdaptation: 5 },
    { name: '12', priceAdaptation: 10 }
]

function populateDropdowns() {
    let glazingSelect = document.getElementById('glazingSelect');
    let packSelect = document.getElementById('packSelect');

    glazingOptions.forEach(glazing => {
        const option = document.createElement('option');
        option.textContent = glazing.name;  
        option.value = glazing.priceAdaptation;
        glazingSelect.appendChild(option);  
    });

    packOptions.forEach(size => {
        const option = document.createElement('option');
        option.textContent = size.name;
        option.value = size.priceAdaptation;
        packSelect.appendChild(option);
    });
}

function updatePrice() {
    const glazingSelect = document.getElementById('glazingSelect');
    const packSizeSelect = document.getElementById('packSelect');
    const priceElement = document.querySelector('.price');
  
    const selectedGlazingPrice = parseFloat(glazingSelect.value);
    const selectedPackSizeMultiplier = parseInt(packSizeSelect.value);
  
    const totalPrice = (basePrice + selectedGlazingPrice) * selectedPackSizeMultiplier;
    priceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Add event listeners for dropdown changes
document.getElementById('glazingSelect').addEventListener('change', updatePrice);
document.getElementById('packSelect').addEventListener('change', updatePrice);

document.addEventListener('DOMContentLoaded', () => {
    const rollType = getRollTypeFromUrl();
    const basePrice = loadRollData(rollType);

    populateDropdowns();
    updatePrice();
});

// Get the roll type from the URL
function getRollTypeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('roll');
}

// Load the roll data from rollsData.js
function loadRollData(rollType) {
    const rollData = rolls[rollType];
    if (rollData) {
        // Update product title and image
        document.querySelector('#detail-header-text').textContent = `${rollType} Cinnamon Roll`;
        document.querySelector('#detail-img').src = `../assets/products/${rollData.imageFile}`;
        
        // Set base price dynamically
        document.querySelector('.price').textContent = `$${rollData.basePrice.toFixed(2)}`;
        
        // Return the base price for further calculations
        return rollData.basePrice;
    }
    return 2.49; // Default base price
}
app.js