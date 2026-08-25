class TelcomNotificationEngine {
    constructor(userInterfaceCallback) {
        this.uiCallback = userInterfaceCallback; // ربط مباشر مع واجهة المستخدم
    }

    send(userId, type, payload, lang = "ar") {
        const messages = {
            ar: {
                OTP_RECEIVED: `🦅 بروتوكول تلكم: تم استقبال رمز التفعيل الجديد بنجاح: ${payload.otp}`,
                SUBSCRIPTION_SUCCESS: `🦅 تم تفعيل اشتراكك السنوي بنجاح! صفر خسائر. رقمك الجديد: ${payload.number}`,
                BALANCE_LOW: "⚠️ تنبيه: رصيد المحفظة التشغيلية منخفض، يرجى مراجعة مجمع السيولة."
            },
            en: {
                OTP_RECEIVED: `🦅 Telcom Protocol: New activation code received: ${payload.otp}`,
                SUBSCRIPTION_SUCCESS: `🦅 Annual subscription activated successfully! Zero loss. Your number: ${payload.number}`,
                BALANCE_LOW: "⚠️ Alert: Operational gateway balance is low."
            }
        };

        const currentLang = messages[lang] ? lang : "en"; // الافتراض الإنجليزي إذا لم تتوفر اللغة
        const messageText = messages[currentLang][type] || payload.customMessage;

        const notificationEvent = {
            userId,
            type,
            message: messageText,
            timestamp: Date.now(),
            blockchainSynced: true
        };

        // تمرير الإشعار لواجهة المستخدم وبثه كحدث (Event) داخل المستودع
        if (this.uiCallback) this.uiCallback(notificationEvent);
        return notificationEvent;
    }
}

module.exports = { TelcomNotificationEngine };
