document.addEventListener('DOMContentLoaded', () => {
    console.log('KÜID Personalized Protection Platform UI Initialized');

    // --- Cost Counter Elements & Config ---
    const currentMonthlyCostElement = document.getElementById('current-cost'); // Displays static "$XX.XX / month"
    const costBarInnerElement = document.getElementById('cost-bar-inner');
    const coverageItems = document.querySelectorAll('.coverage-item');

    let totalMonthlyCost = 0; // Static total based on active plans
    const coverageMonthlyCosts = {}; // Object to store monthly costs {health: 50, income: 40, ...}
    let maxPossibleMonthlyCost = 0;

    // --- Simulation Variables ---
    let currentAccumulatedCost = 0; // The cost that increases over time
    let currentRatePerInterval = 0; // How much to increase cost every interval
    const intervalTime = 3000; // 3 seconds in milliseconds
    let costIntervalId = null; // To store the interval ID

    // --- Initialization ---
    coverageItems.forEach(item => {
        const type = item.dataset.coverage;
        const cost = parseFloat(item.dataset.cost) || 0;
        coverageMonthlyCosts[type] = cost;
        maxPossibleMonthlyCost += cost;
    });

    // --- Function to Calculate Current Rate ---
    // Calculates how much the cost should increase *per interval* based on active plans
    function calculateRatePerInterval() {
        let rate = 0;
        coverageItems.forEach(item => {
            if (item.classList.contains('active')) {
                const type = item.dataset.coverage;
                const monthlyCost = coverageMonthlyCosts[type] || 0;
                // --- SIMULATION RATE CALCULATION ---
                // Divide monthly cost by a factor to get a noticeable increase per 3s interval.
                // This factor is arbitrary for simulation purposes. Adjust for desired speed.
                // Smaller factor = faster increase.
                // Example: $50/month / 200 = $0.25 per interval
                const simulationFactor = 200;
                if (monthlyCost > 0 && simulationFactor > 0) {
                     rate += monthlyCost / simulationFactor;
                }
            }
        });
        // console.log(`Calculated Rate Per Interval: $${rate.toFixed(4)}`); // For debugging
        return rate;
    }

    // --- Function to Update Static Monthly Cost Display ---
    // This shows the total potential cost per month, like "$80.00 / month"
    function updateMonthlyCostDisplay() {
        if (!currentMonthlyCostElement) return;
        currentMonthlyCostElement.textContent = `$${totalMonthlyCost.toFixed(2)} / month`;
         // We *don't* update the bar width here anymore based on monthly cost.
         // The bar width will now reflect the *accumulated* cost.
    }


    // --- Function to Update Accumulated Cost and Bar ---
    // This runs every `intervalTime`
    function updateAccumulatedCost() {
        if (currentRatePerInterval <= 0) {
            // If rate is zero (no active plans or paused), do nothing.
            // The bar stays where it is.
            // console.log("Rate is 0, accumulation paused."); // For debugging
            return;
        }

        currentAccumulatedCost += currentRatePerInterval;

        // Cap the accumulated cost at the maximum possible monthly cost
        if (currentAccumulatedCost > maxPossibleMonthlyCost) {
            currentAccumulatedCost = maxPossibleMonthlyCost;
        }
         // Ensure cost doesn't dip below zero (shouldn't happen with addition, but good practice)
        if (currentAccumulatedCost < 0) {
            currentAccumulatedCost = 0;
        }

        // Calculate bar width percentage based on *accumulated* cost
        let barWidthPercentage = 0;
        if (maxPossibleMonthlyCost > 0) {
            barWidthPercentage = (currentAccumulatedCost / maxPossibleMonthlyCost) * 100;
        }

         // Ensure percentage is within bounds
         barWidthPercentage = Math.max(0, Math.min(100, barWidthPercentage));

        // Update the visual bar width
        if (costBarInnerElement) {
            costBarInnerElement.style.width = `${barWidthPercentage}%`;
            // Update text inside the bar to show accumulated cost
            costBarInnerElement.textContent = `$${currentAccumulatedCost.toFixed(2)}`;
            // console.log(`Accumulated: $${currentAccumulatedCost.toFixed(2)}, Width: ${barWidthPercentage.toFixed(1)}%`); // For debugging
        }
    }

    // --- Plan Customization Logic (Button Clicks) ---
    coverageItems.forEach(item => {
        const button = item.querySelector('.toggle-button');
        const coverageType = item.dataset.coverage;

        button.addEventListener('click', () => {
            const cost = coverageMonthlyCosts[coverageType] || 0;

            // Toggle the 'active' class
            item.classList.toggle('active');

            // Update static total monthly cost
            if (item.classList.contains('active')) {
                button.textContent = 'Pause Coverage';
                totalMonthlyCost += cost;
                console.log(`Activated coverage: ${coverageType}, Monthly Cost: +${cost}`);
            } else {
                button.textContent = 'Add to Plan';
                totalMonthlyCost -= cost;
                 if (totalMonthlyCost < 0) totalMonthlyCost = 0;
                console.log(`Deactivated coverage: ${coverageType}, Monthly Cost: -${cost}`);
            }

            // Update the static monthly cost display (e.g., "$XX.XX / month")
            updateMonthlyCostDisplay();

            // --- IMPORTANT: Recalculate the rate for the interval timer ---
            currentRatePerInterval = calculateRatePerInterval();

             // Start the interval timer if it's not already running
             // It will automatically adjust based on the new `currentRatePerInterval`
            if (costIntervalId === null) {
                 console.log("Starting cost accumulation interval.");
                costIntervalId = setInterval(updateAccumulatedCost, intervalTime);
            }
             // Note: We don't need to stop/restart the interval here.
             // The `updateAccumulatedCost` function itself checks the `currentRatePerInterval`.
             // If the rate becomes 0, it simply stops accumulating internally.
        });
    });

    // --- Initialize Displays ---
    updateMonthlyCostDisplay(); // Set initial "$0.00 / month" text
    // Initialize the bar visually (starts empty or at currentAccumulatedCost if page reloads/persists state)
     let initialBarWidth = 0;
     if (maxPossibleMonthlyCost > 0) {
         initialBarWidth = (currentAccumulatedCost / maxPossibleMonthlyCost) * 100;
     }
     if (costBarInnerElement) {
        costBarInnerElement.style.width = `${initialBarWidth}%`;
        costBarInnerElement.textContent = `$${currentAccumulatedCost.toFixed(2)}`;
     }

     // --- Start the interval timer automatically on page load ---
     // It will start calculating based on initially active plans (if any) or rate 0.
     // Recalculate initial rate in case some plans start as 'active' in HTML
     currentRatePerInterval = calculateRatePerInterval();
     if (costIntervalId === null) { // Check again, just in case
          console.log("Starting cost accumulation interval on page load.");
         costIntervalId = setInterval(updateAccumulatedCost, intervalTime);
     }


    // --- Dashboard Interactions & Dynamic Content (remain the same) ---
    const recommendationsCard = document.getElementById('recommendations');
    if (recommendationsCard) {
        setTimeout(() => {
            const recommendationElement = document.createElement('p');
            recommendationElement.innerHTML = '<strong>New Tip:</strong> Consider adding Pet coverage based on recent vet visit data.';
            recommendationElement.style.marginTop = '10px';
            recommendationElement.style.fontWeight = 'bold';
            recommendationElement.style.color = 'var(--primary-color)'; // Use primary color from palette
            recommendationsCard.appendChild(recommendationElement);
        }, 5000); // Delay slightly more
    }
    const alertsCard = document.getElementById('risk-alerts');
    if (alertsCard) {
        setTimeout(() => {
            const alertElement = document.createElement('p');
            alertElement.innerHTML = '<strong><i class="fa-solid fa-triangle-exclamation"></i> Alert:</strong> High pollen count detected. Check health recommendations.';
            alertElement.style.marginTop = '10px';
            alertElement.style.fontWeight = 'bold';
            alertElement.style.color = 'var(--warning-color)';
            alertsCard.appendChild(alertElement);
        }, 8000); // Delay slightly more
    }

}); // End DOMContentLoaded