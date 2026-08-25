const BigNumber = require('bignumber.js');

class TelcomSecurityGuard {
    constructor() {
        this.maxSlippage = new BigNumber('0.05'); // الحد الأقصى للانحراف السعري المسموح به 5%
        this.processedTx = new Set(); // لمنع ثغرات إعادة الدفع (Replay Attack)
    }

    // 1. سد ثغرة إعادة الدفع والتحقق من الهوية المشفرة
    validateTransaction(txHash, userId) {
        if (this.processedTx.has(txHash)) {
            throw new Error("SECURITY_ALERT: تم تكرار المعاملة! محاولة اختراق Replay Attack");
        }
        if (!userId || userId.trim() === "") {
            throw new Error("SECURITY_ALERT: معرف المستخدم غير صالح أو مجهول");
        }
        this.processedTx.add(txHash);
        return true;
    }

    // 2. سد ثغرة التلاعب بأسعار مجمع السيولة (Oracle Manipulation Guard)
    verifyPriceStability(fetchedRate, expectedHistoricalRate) {
        const rate = new BigNumber(fetchedRate);
        const historical = new BigNumber(expectedHistoricalRate);
        
        const deviation = rate.minus(historical).abs().div(historical);
        if (deviation.gt(this.maxSlippage)) {
            throw new Error("SECURITY_ALERT: تلاعب حاد في أسعار مجمع السيولة! تم إيقاف المقاصة حمايةً للمنظومة");
        }
        return true;
    }

    // 3. منع ثغرات الحسابات العشرية العائمة (Zero Floating-Point Audit)
    auditAmount(amountStr, expectedDecimals) {
        const bigAmt = new BigNumber(amountStr);
        if (bigAmt.isNaN() || bigAmt.isLessThanOrEqualTo(0)) {
            throw new Error("SECURITY_ALERT: قيمة المعاملة غير صالحة أو سالبة");
        }
        // التحقق من تطابق الخانات العشرية الصارمة (7 لـ Pi و 10 لـ YER)
        const decimalPlaces = (amountStr.split('.')[1] || []).length;
        if (decimalPlaces > expectedDecimals) {
            throw new Error(`SECURITY_ALERT: تجاوز الخانات العشرية الصارمة المسموح بها وهي ${expectedDecimals}`);
        }
        return true;
    }
}

module.exports = { TelcomSecurityGuard };
