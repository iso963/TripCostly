const travelStyleDefaults = {
  backpacker: { accommodation: 20, transport: 10, food: 15, shopping: 10 },
  midrange: { accommodation: 40, transport: 15, food: 25, shopping: 20 },
  luxury: { accommodation: 80, transport: 25, food: 40, shopping: 30 }
};

function updateStyleDefaults() {
  const travelStyle = document.getElementById("travelStyle").value;
  const accommodationInput = document.getElementById("accommodation");
  const transportInput = document.getElementById("transport");
  const foodInput = document.getElementById("food");
  const shoppingInput = document.getElementById("shopping");

  if (travelStyleDefaults[travelStyle]) {
    accommodationInput.value = travelStyleDefaults[travelStyle].accommodation;
    transportInput.value = travelStyleDefaults[travelStyle].transport;
    foodInput.value = travelStyleDefaults[travelStyle].food;
    shoppingInput.value = travelStyleDefaults[travelStyle].shopping;
  }
}

function calculate() {
  const destination = Number(document.getElementById("destination").value);
  const days = Number(document.getElementById("days").value);
  const accommodation = Number(document.getElementById("accommodation").value);
  const transport = Number(document.getElementById("transport").value);
  const food = Number(document.getElementById("food").value);
  const shopping = Number(document.getElementById("shopping").value);
  const fixedBuffer = 0.15; // 15% fixed safety buffer

  if (!days || days <= 0) {
    alert("Please enter a valid number of travel days.");
    return;
  }
  if (accommodation < 0 || transport < 0 || food < 0 || shopping < 0) {
    alert("Daily costs cannot be negative.");
    return;
  }

  let dailyDestinationCost = destination;
  let dailyAccommodationCost = accommodation;
  let dailyTransportCost = transport;
  let dailyFoodCost = food;
  let dailyShoppingCost = shopping;

  let dailyBaseCost = dailyDestinationCost + dailyAccommodationCost + dailyTransportCost + dailyFoodCost + dailyShoppingCost;
  let totalEstimatedCost = dailyBaseCost * days;

  const bufferAmount = totalEstimatedCost * fixedBuffer;
  totalEstimatedCost += bufferAmount;

  const finalDailySpending = (totalEstimatedCost / days).toFixed(0);

  const resultElement = document.getElementById("result");
  resultElement.style.display = "block";
  resultElement.innerHTML = `
    <strong>Total estimated cost:</strong>
    $${totalEstimatedCost.toFixed(0)} for ${days} days (+${(fixedBuffer*100).toFixed(0)}% buffer)<br>
    <small>Average daily spending: $${finalDailySpending} (with buffer)</small>
    <div class="breakdown">
      <p><span>Daily Destination:</span> <span>$${dailyDestinationCost.toFixed(0)}</span></p>
      <p><span>Daily Accommodation:</span> <span>$${dailyAccommodationCost.toFixed(0)}</span></p>
      <p><span>Daily Transport:</span> <span>$${dailyTransportCost.toFixed(0)}</span></p>
      <p><span>Daily Food & Drinks:</span> <span>$${dailyFoodCost.toFixed(0)}</span></p>
      <p><span>Daily Activities & Shopping:</span> <span>$${dailyShoppingCost.toFixed(0)}</span></p>
    </div>
  `;
}

// Initialize calculation and update defaults on page load
document.addEventListener('DOMContentLoaded', () => {
  updateStyleDefaults();
  calculate();
});
