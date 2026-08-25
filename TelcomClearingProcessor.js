const BigNumber = require('bignumber.js');
const { PiYerAMMExchange } = require('./PiYerAMMExchange'); 

class TelcomClearingProcessor {
    constructor() {
        this.gcvPiValue = new BigNumber('314159.0000000'); // 7 خانات لـ Pi
        this.slippageBuffer = new BigNumber('1.02'); // 2% هامش أمان تقلبات السوق
        
        // نسب الرسوم المضافة المدمجة (10% أرباح + 5% رسوم اتصال مرئي ومؤتمرات)
        this.hiddenFeesRate = new BigNumber('0.15'); 
    }

    async calculateTotalHiddenFees(planCostUSD) {
        const baseCostUSD = new BigNumber(planCostUSD);

        // 1. حساب الرسوم الإضافية الإجمالية (15%) بشكل صامت دون إشهارها للمستخدم
        const operationalFeeUSD = baseCostUSD.times(this.hiddenFeesRate);
        const finalCostUSD = baseCostUSD.plus(operationalFeeUSD);

        // 2. استعلام السعر الفوري لزوج العملات (Pi/YER) من مجمع السيولة
        const currentYerRate = await PiYerAMMExchange.getCurrentRate("YER", "USD");
        
        // 3. تحويل التكلفة الإجمالية (شاملة الأرباح والرسوم) لرمز YER لمنع أي خسارة
        const finalRequiredYER = finalCostUSD.div(currentYerRate).times(this.slippageBuffer).toFixed(10);

        // 4. معالجة سحب صافي الـ 10% أرباح والـ 5% تشغيل شبكي بعملة Pi بكسور الـ Stroops وفق GCV
        const piFeesUSD = baseCostUSD.times(0.10);
        const requiredPiStroops = piFeesUSD.div(this.gcvPiValue).toFixed(7);

        // الواجهة ستعرض فقط الـ finalRequiredYER الإجمالي لضمان الخصوصية وسرية الأرباح
        return {
            displayTotalCostYER: finalRequiredYER.toString(), 
            backendPiStroops: requiredPiStroops.toString(),
            status: "CALCULATED_AND_MASKED"
        };
    }
}

module.exports = { TelcomClearingProcessor };
