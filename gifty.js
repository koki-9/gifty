// script.js

function calculate() {
    try {
        var usdPaid = parseFloat(document.getElementById("usdPaid").value) || 0;
        var lbpPaid = parseFloat(document.getElementById("lbpPaid").value) || 0;
        var usdPurchase = parseFloat(document.getElementById("usdPurchase").value) || 0;
        var lbpPurchase = parseFloat(document.getElementById("lbpPurchase").value) || 0;
        var exchangeRate = parseFloat(document.getElementById("exchangeRate").value) || 90000;

        if (exchangeRate <= 0) {
            alert("Exchange rate must be a positive number.");
            return;
        }

        var totalUsdPaid = usdPaid + (lbpPaid / exchangeRate);
        var totalLbpPaid = lbpPaid + (usdPaid * exchangeRate);
        var totalUsdPurchase = usdPurchase + (lbpPurchase / exchangeRate);
        var totalLbpPurchase = lbpPurchase + (usdPurchase * exchangeRate);

        var remainingUsd = totalUsdPaid - totalUsdPurchase;
        var remainingLbp = totalLbpPaid - totalLbpPurchase;

        var usdResult = remainingUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var lbpResult = remainingLbp.toLocaleString('ar-LB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        var message = "";
        if (remainingUsd > 0 || remainingLbp > 0) {
            message = "You have an outstanding amount.";
        } else if (remainingUsd < 0 || remainingLbp < 0) {
            message = "You need to return an amount.";
        }

        var notification = "Remaining USD: " + usdResult + "\n" +
                           "Remaining LBP: " + lbpResult + "\n" + message;

        if (remainingUsd % 1 !== 0 && remainingUsd > 0) {
            var wholeUsd = Math.floor(remainingUsd);
            var fractionalUsd = remainingUsd - wholeUsd;
            var fractionalLbp = fractionalUsd * exchangeRate;

            notification += "\nSettled Amount: " + wholeUsd + " USD and " + fractionalLbp.toLocaleString('ar-LB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " LBP.";
        }

        alert(notification);

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during calculations. Please try again.");
    }
}

function resetCalculator() {
    try {
        document.getElementById("usdPaid").value = "";
        document.getElementById("lbpPaid").value = "";
        document.getElementById("usdPurchase").value = "";
        document.getElementById("lbpPurchase").value = "";
        document.getElementById("exchangeRate").value = "90000";
    } catch (error) {
        console.error("Error resetting:", error);
        alert("An error occurred resetting the calculator.");
    }
}
