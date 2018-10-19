// Listen for submit event
document.getElementById('loan-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);
});

// Calculate results
function calculateResults() {
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Algorithm variables
  const principal = parseFloat(amount.value);
  const periodicInterest = parseFloat(interest.value) / 100 / 12;
  const totalPeriodicPayments = parseFloat(years.value) * 12; // number of years times 12 monthly payment

  // Compute monthly payment
  const x = Math.pow(1 + periodicInterest, totalPeriodicPayments);
  const monthly = (principal * periodicInterest * x) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * totalPeriodicPayments).toFixed(2);
    totalInterest.value = (monthly * totalPeriodicPayments - principal).toFixed(
      2
    );

    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Show results
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please Check Your Numbers!');
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Hide results
    document.getElementById('results').style.display = 'none';
  }
}

// Show error
function showError(error) {
  // Create div
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error alert after 2 seconds
  setTimeout(clearError, 2000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
