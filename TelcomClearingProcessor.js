const BigNumber = require('bignumber.js');
// استيراد محرك الـ DEX من مستودع BIGISH-YER
const { PiYerAMMExchange } = require('./PiYerAMMExchange'); 

class TelcomClearingProcessor {
    constructor() {
        this.gcvPiValue = new BigNumber('314159.0000000'); // 7 Decimals
        this.slippageBuffer = new BigNumber('1.02'); // 2% هامش أمان لحماية المنصة
    }

    async calculateFees(planCostUSD) {
        const costUSD = new BigNumber(planCostUSD);

        // 1. جلب السعر الفوري لـ YER/USD من مجمع السيولة المباشر في الـ DEX
        const currentYerRate = await PiYerAMMExchange.getCurrentRate("YER", "USD");
        
        // 2. حساب التكلفة الإجمالية برمز YER الصارم لمنع خسائر تقلبات السيولة
        const requiredYER = costUSD.div(currentYerRate).times(this.slippageBuffer).toFixed(10);

        // 3. حساب الـ 10% أرباح الصافية بعملة Pi وفقاً لقيمة GCV
        const profitUSD = costUSD.times(0.10);
        const requiredPiStroops = profitUSD.div(this.gcvPiValue).toFixed(7);

        return {
            requiredYER: requiredYER.toString(),
            requiredPiStroops: requiredPiStroops.toString(),
            status: "READY_FOR_CLEARING"
        };
    }

    async executeHybridClearing(userId, calculatedFees) {
        // تنفيذ المقاصة الهجينة 50/50 وتحويل الـ YER إلى دولار رقمي لتغذية خوادم الـ eSIM
        const txYer = await PiYerAMMExchange.swapYERtoUSDT(userId, calculatedFees.requiredYER);
        const txPi = await PiYerAMMExchange.lockPiProfit(userId, calculatedFees.requiredPiStroops);

        if (txYer.success && txPi.success) {
            return { success: true, transactionId: txYer.hash, message: "تمت التسوية وصفر خسائر" };
        }
        throw new Error("فشل في معالجة المقاصة الهجينة عبر مجمع السيولة");
    }
}

module.exports = { TelcomClearingProcessor };
