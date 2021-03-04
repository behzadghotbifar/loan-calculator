// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.getElementById('results').style.display = 'none'
    // Show Loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000)

    e.preventDefault()
})

// Calculate Results
function calculateResults(e){
    console.log('Calculating...');
    // UI Vars
    const amount = document.getElementById('amount')
    const intrest = document.getElementById('intrest')
    const years = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalIntrest = document.getElementById('total-intrest')

    const principal = parseFloat(amount.value)
    const calculatedIntrest = parseFloat(intrest.value) / 100 / 12
    const calculatedPayments = parseFloat(years.value) * 12

    // Compute Monthly Payment
    const x = Math.pow(1 + calculatedIntrest, calculatedPayments)
    const monthly = (principal*x*calculatedIntrest)/(x-1)

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalIntrest.value = ((monthly* calculatedPayments) - principal).toFixed(2)

        //Show results
        document.getElementById('results').style.display = 'block'

        // Loader
        document.getElementById('loading').style.display = 'none'

    }else {
        showError('Please check your Numbers')
    }


}

// Show Error 
function showError(error) {
    //Hide results
    document.getElementById('results').style.display = 'none'

    // Loader
    document.getElementById('loading').style.display = 'none'

    //Create a div
    const errorDiv = document.createElement('div')

    // Get Elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    // Add class 
    errorDiv.className = 'alert alert-danger'

    // Create Text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    // Insert error above heading
    card.insertBefore(errorDiv, heading)

    // Clear error after 3 Seconds
    setTimeout(clearError, 3000)

    // Clear Error
    function clearError() {
        document.querySelector('.alert').remove()
    }
}