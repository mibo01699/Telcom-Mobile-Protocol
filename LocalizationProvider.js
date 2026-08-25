const locales = {
    ar: {
        title: "بروتوكول تلكم موبايل",
        subtitle: "منظومة النسر العربي السيادية",
        subscribeBtn: "اشترك الآن وحكاي رقمك",
        calculating: "جاري معالجة المقاصة الهجينة...",
        successMsg: "تم تفعيل الاشتراك بنجاح واستمرار الخدمة دون انقطاع",
        yerFees: "التكلفة المطلوبة بـ YER",
        piFees: "رسوم الأرباح 10% بـ Pi (وفق GCV)"
    },
    en: {
        title: "Telcom Mobile Protocol",
        subtitle: "A.E.C. Sovereign Telecom Node",
        subscribeBtn: "Subscribe Now & Claim Number",
        calculating: "Processing Hybrid Clearing...",
        successMsg: "Subscription activated successfully with Zero Loss",
        yerFees: "Required YER Amount",
        piFees: "10% Profit Fees in Pi (via GCV)"
    },
    zh: { // الصينية (جمهور ضخم لـ Pi)
        title: "泰康移动协议",
        subtitle: "阿拉伯鹰主权电信节点",
        subscribeBtn: "立即订阅并获取号码",
        calculating: "正在处理混合清算...",
        successMsg: "订阅成功激活，零损失",
        yerFees: "所需的 YER 金额",
        piFees: "10% Pi 利润费 (通过 GCV)"
    }
};

class LocalizationProvider {
    constructor(defaultLang = "ar") {
        this.currentLang = defaultLang;
    }

    setLanguage(lang) {
        if (locales[lang]) {
            this.currentLang = lang;
        }
    }

    translate(key) {
        return locales[this.currentLang][key] || locales["en"][key] || key;
    }
}

module.exports = { LocalizationProvider };
