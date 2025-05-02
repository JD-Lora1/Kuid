document.addEventListener('DOMContentLoaded', () => {
    console.log('KÜID Personalized Protection Platform UI Initialized');

    // --- Cost Counter Elements & Config ---
    const currentCostElement = document.getElementById('current-cost');
    const costBarInnerElement = document.getElementById('cost-bar-inner');
    const coverageItems = document.querySelectorAll('.coverage-item'); // Get items again for cost
    let totalCost = 0;
    const coverageCosts = {}; // Object to store costs {health: 50, income: 40, ...}
    let maxPossibleCost = 0; // Calculate the max cost for the progress bar

    coverageItems.forEach(item => {
        const type = item.dataset.coverage;
        const cost = parseFloat(item.dataset.cost) || 0; // Get cost from data-cost attribute
        coverageCosts[type] = cost;
        maxPossibleCost += cost; // Sum up all potential costs
    });

    // --- Function to Update Cost Display ---
    function updateCostDisplay() {
        if (!currentCostElement || !costBarInnerElement) return; // Exit if elements not found

        currentCostElement.textContent = `$${totalCost.toFixed(2)} / month`;

        let barWidthPercentage = 0;
        if (maxPossibleCost > 0) { // Avoid division by zero
            barWidthPercentage = (totalCost / maxPossibleCost) * 100;
        }

        costBarInnerElement.style.width = `${barWidthPercentage}%`;
        // Optional: Add text inside the bar if there's enough space
        // costBarInnerElement.textContent = barWidthPercentage > 10 ? `$${totalCost.toFixed(0)}` : '';
    }

    // Initialize cost display
    updateCostDisplay();

    // --- Plan Customization Logic (with Cost Update) ---
    coverageItems.forEach(item => {
        const button = item.querySelector('.toggle-button');
        const coverageType = item.dataset.coverage;

        button.addEventListener('click', () => {
            const cost = coverageCosts[coverageType] || 0; // Get cost for this type

            // Toggle the 'active' class
            item.classList.toggle('active');

            // Update button text and total cost
            if (item.classList.contains('active')) {
                button.textContent = 'Pause Coverage';
                totalCost += cost; // Add cost
                console.log(`Activated coverage: ${coverageType}, Cost: +${cost}, New Total: ${totalCost}`);
            } else {
                button.textContent = 'Add to Plan';
                totalCost -= cost; // Subtract cost
                 // Ensure totalCost doesn't go below zero due to float precision issues
                 if (totalCost < 0) totalCost = 0;
                console.log(`Deactivated coverage: ${coverageType}, Cost: -${cost}, New Total: ${totalCost}`);
            }

            // Update the displayed cost and bar
            updateCostDisplay();
        });
    });

    // --- Dashboard Interactions ---
    // NOTE: The buttons that now navigate (View Rewards, Connect, etc.)
    // don't need JS event listeners here anymore unless you want to
    // perform an action *before* navigating (e.g., track click).
    // The alert placeholders have been moved inline (onclick) to the
    // specific buttons on the new pages (like connect-wearables.html).

    // Example: Simulate dynamic content loading (remains the same)
    const recommendationsCard = document.getElementById('recommendations');
    if (recommendationsCard) {
        setTimeout(() => {
            const recommendationElement = document.createElement('p');
            recommendationElement.innerHTML = '<strong>New Tip:</strong> Consider adding Pet coverage based on recent vet visit data.';
            recommendationElement.style.marginTop = '10px';
            recommendationElement.style.fontWeight = 'bold';
            recommendationElement.style.color = 'var(--accent-color)';
            recommendationsCard.appendChild(recommendationElement);
        }, 4000);
    }
    const alertsCard = document.getElementById('risk-alerts');
    if (alertsCard) {
        setTimeout(() => {
            const alertElement = document.createElement('p');
            alertElement.innerHTML = '<strong><i class="fa-solid fa-triangle-exclamation"></i> Alert:</strong> High pollen count detected in your area. Check health recommendations.';
            alertElement.style.marginTop = '10px';
            alertElement.style.fontWeight = 'bold';
            alertElement.style.color = 'var(--warning-color)'; // Use warning color
            alertsCard.appendChild(alertElement);
        }, 6000);
    }

}); // End DOMContentLoaded