// script.js

function calculate() {
    try {
        var usdPaid = parseFloat(document.getElementById("usdPaid").value) || 0;
        var lbpPaid = parseFloat(document.getElementById("lbpPaid").value) || 0;
        var usdPurchase = parseFloat(document.getElementById("usdPurchase").value) || 0;
        var lbpPurchase = parseFloat(document.getElementById("lbpPurchase").value) || 0;
        var exchangeRate = parseFloat(document.getElementById("exchangeRate").value) || 90000;

        if (exchangeRate <= 0) {
            alert("سعر الصرف يجب أن يكون قيمة موجبة.");
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
            message = " لديك مبلغ مستحق.";
        } else if (remainingUsd < 0 || remainingLbp < 0) {
            message = " عليك إرجاع مبلغ.";
        }

        var notification = "المبلغ المتبقي بالدولار: " + usdResult + "\n" +
                           "المبلغ المتبقي بالليرة اللبنانية: " + lbpResult + "\n" + message;

        if (remainingUsd % 1 !== 0 && remainingUsd > 0) {
            var wholeUsd = Math.floor(remainingUsd);
            var fractionalUsd = remainingUsd - wholeUsd;
            var fractionalLbp = fractionalUsd * exchangeRate;

            notification += "\nالمبلغ المصرف: " + wholeUsd + " دولار و " + fractionalLbp.toLocaleString('ar-LB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ليرة لبنانية.";
        }

        alert(notification);

    } catch (error) {
        console.error("حدث خطأ:", error);
        alert("حدث خطأ أثناء الحسابات. الرجاء المحاولة مرة أخرى.");
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
        console.error("حدث خطأ في إعادة التعيين:", error);
        alert("حدث خطأ أثناء إعادة التعيين. الرجاء المحاولة مرة أخرى.");
    }
}
