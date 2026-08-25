const axios = require('axios');

class TelecomGatewayAPI {
    constructor(apiSecret, providerUrl) {
        this.apiSecret = apiSecret;
        this.providerUrl = providerUrl; // ربط مع مزود eSIM الخلوي الحقيقي وليس VoIP
    }

    async requestSovereignNumber(countryCode) {
        try {
            // طلب رقم خلوي حقيقي متوافق مع نظام التشفير وعقود المقاصة لمنظومة النسر العربي
            const response = await axios.post(`${this.providerUrl}/v1/esim/provision`, {
                country: countryCode,
                type: "MOBILE_SIM", // لضمان عدم الكشف من فلاتر الحظر للشبكات الاجتماعية
                features: ["SMS", "VOICE"]
            }, {
                headers: { 'Authorization': `Bearer ${this.apiSecret}` }
            });

            return {
                phoneNumber: response.data.number,
                simId: response.data.id,
                status: "ACTIVE"
            };
        } catch (error) {
            throw new Error(`فشل جلب الخط السيادي من المزود: ${error.message}`);
        }
    }

    async fetchActivationOTP(simId) {
        // جلب كود الـ OTP الوارد لتفعيل الحسابات (WhatsApp/Telegram) بمرونة وسرعة عالية
        const response = await axios.get(`${this.providerUrl}/v1/esim/${simId}/sms`, {
            headers: { 'Authorization': `Bearer ${this.apiSecret}` }
        });
        
        return response.data.messages.map(msg => ({
            sender: msg.from,
            text: msg.body,
            otpCode: this.extractOTP(msg.body)
        }));
    }

    extractOTP(text) {
        const match = text.match(/\b\d{5,6}\b/); // استخراج الكود المكون من 5 أو 6 أرقام تلقائياً
        return match ? match[0] : null;
    }
}

module.exports = { TelecomGatewayAPI };
