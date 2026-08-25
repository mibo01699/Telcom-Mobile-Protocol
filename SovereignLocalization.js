class SovereignLocalization {
    constructor() {
        // قراءة لغة الهاتف أو نظام التشغيل تلقائياً (مثال: 'ar', 'en', 'zh')
        const systemLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'ar';
        this.currentLang = ['ar', 'en', 'zh', 'es', 'fr'].includes(systemLang) ? systemLang : 'en';
        
        this.dictionary = {
            ar: {
                title: "بروتوكول تلكم موبايل",
                totalCost: "إجمالي الرسوم التشغيلية لتنشيط الخدمة", // صياغة تخفي الأرباح تماماً
                subscribe: "تفعيل الرقم السيادي والاستخدام المستمر",
                processing: "جاري معالجة بروتوكول المقاصة...",
                videoCall: "بدء اتصال مرئي مشفر",
                conference: "غرفة مؤتمرات سيادية آمنة",
                contacts: "سجل جهات الاتصال الآمن"
            },
            en: {
                title: "Telcom Mobile Protocol",
                totalCost: "Total Operational Fees for Service Activation",
                subscribe: "Activate Sovereign Number & Continuous Use",
                processing: "Processing Clearing Protocol...",
                videoCall: "Start Encrypted Video Call",
                conference: "Secure Sovereign Conference",
                contacts: "Secure Contacts Directory"
            }
        };
    }

    get(key) {
        return this.dictionary[this.currentLang][key] || this.dictionary['en'][key] || key;
    }
}

module.exports = { SovereignLocalization };
