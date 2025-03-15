// script.js

function calculate() {
    try {
        // الحصول على القيم من حقول الإدخال وتحويلها إلى أرقام
        var usdPaid = parseFloat(document.getElementById("usdPaid").value) || 0;
        var lbpPaid = parseFloat(document.getElementById("lbpPaid").value) || 0;
        var usdPurchase = parseFloat(document.getElementById("usdPurchase").value) || 0;
        var lbpPurchase = parseFloat(document.getElementById("lbpPurchase").value) || 0;
        var exchangeRate = parseFloat(document.getElementById("exchangeRate").value) || 90000;

        // التحقق من أن سعر الصرف قيمة موجبة
        if (exchangeRate <= 0) {
            alert("سعر الصرف يجب أن يكون قيمة موجبة.");
            return;
        }

        // حساب المبالغ الإجمالية بالدولار والليرة
        var totalUsdPaid = usdPaid + (lbpPaid / exchangeRate);
        var totalLbpPaid = lbpPaid + (usdPaid * exchangeRate);
        var totalUsdPurchase = usdPurchase + (lbpPurchase / exchangeRate);
        var totalLbpPurchase = lbpPurchase + (usdPurchase * exchangeRate);

        // حساب المبالغ المتبقية
        var remainingUsd = totalUsdPaid - totalUsdPurchase;
        var remainingLbp = totalLbpPaid - totalLbpPurchase;

        // تنسيق الأرقام وعرض النتائج
        var usdResult = remainingUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var lbpResult = remainingLbp.toLocaleString('ar-LB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        var message = "";
        if (remainingUsd > 0 || remainingLbp > 0) {
            message = " لديك مبلغ مستحق.";
        } else if (remainingUsd < 0 || remainingLbp < 0) {
            message = " عليك إرجاع مبلغ.";
        }

        // إنشاء نص الإشعار مع عرض النتائج بشكل واضح
        var notification = "نتائج الحساب:\n\n" +
                           "المبلغ المتبقي بالدولار: " + usdResult + " دولار\n" +
                           "المبلغ المتبقي بالليرة اللبنانية: " + lbpResult + " ليرة لبنانية\n\n" + message;

        // إجراء التصريف التلقائي إذا كان هناك كسور في المبلغ المتبقي بالدولار
        if (remainingUsd % 1 !== 0 && remainingUsd > 0) {
            var wholeUsd = Math.floor(remainingUsd);
            var fractionalUsd = remainingUsd - wholeUsd;
            var fractionalLbp = fractionalUsd * exchangeRate;

            notification += "\n\nالمبلغ المصرف:\n" +
                            wholeUsd + " دولار و " + fractionalLbp.toLocaleString('ar-LB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ليرة لبنانية.";
        }

        // عرض الإشعار
        alert(notification);

    } catch (error) {
        console.error("حدث خطأ:", error);
        alert("حدث خطأ أثناء الحسابات. الرجاء المحاولة مرة أخرى.");
    }
}

function resetCalculator() {
    try {
        // إعادة تعيين حقول الإدخال إلى القيم الافتراضية أو الفارغة
        document.getElementById("usdPaid").value = "";
        document.getElementById("lbpPaid").value = "";
        document.getElementById("usdPurchase").value = "";
        document.getElementById("lbpPurchase").value = "";
        document.getElementById("exchangeRate").value = "90000"; // إعادة تعيين سعر الصرف
    } catch (error) {
        console.error("حدث خطأ في إعادة التعيين:", error);
        alert("حدث خطأ أثناء إعادة التعيين. الرجاء المحاولة مرة أخرى.");
    }
}
