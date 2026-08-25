require('dotenv').config(); // استدعاء متغيرات البيئة الآمنة .env

const GatewayConfig = {
    // إعدادات واجهة الشركات المزودة للأرقام الحقيقية eSIM
    telecomProvider: {
        apiUrl: process.env.TELECOM_PROVIDER_PRODUCTION_URL || "https://sovereign-carrier.net",
        apiKey: process.env.TELECOM_PROVIDER_SECRET_KEY, 
        fallbackUrl: "https://esim-gateway.com"
    },
    // إعدادات المقاصة لتحويل الـ YER لـ الدولار الرقمي والورقي عبر تجار المنظومة
    fiatClearingGateway: {
        dexPoolAddress: process.env.AEC_DEX_POOL_ADDRESS,
        fiatBrokerApi: process.env.FIAT_BROKER_SECRET_API,
        stableCoinType: "USDT" // العملة الرقمية الوسيطة لتغذية الخوادم
    },
    // التحقق من اكتمال مفاتيح الربط قبل تشغيل المستودع
    auditConfig() {
        if (!this.telecomProvider.apiKey) {
            throw new Error("CRITICAL_ERROR: مفتاح الربط البرمجي (API Key) الخاص بشركة الاتصالات مفقود في ملف الـ .env");
        }
        if (!this.fiatClearingGateway.fiatBrokerApi) {
            throw new Error("CRITICAL_ERROR: مفتاح ربط وسيط المقاصة المالية مفقود");
        }
        return "CONFIG_VERIFIED_100_PERCENT";
    }
};

module.exports = { GatewayConfig };
