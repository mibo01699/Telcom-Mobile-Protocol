import React, { useState, useEffect } from 'react';

export default function TelcomMobileProtocol() {
    const [account, setAccount] = useState(null);
    const [fees, setFees] = useState({ requiredYER: "0", requiredPiStroops: "0" });
    const [allocatedNumber, setAllocatedNumber] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // دمج والتحقق من Pi SDK المدمج في بيئة النسر العربي ومتصفح Pi Browser
        if (window.Pi) {
            window.Pi.init({ version: "2.0", sandbox: false });
            // جلب بيانات محفظة المستخدم بعد التوثيق الآمن
        }
        // حساب الرسوم المبدئية عند فتح التطبيق لاشتراك سنوي افتراضي بقيمة 30 دولار
        fetch('/api/telecom/calculate?planUSD=30')
            .then(res => res.json())
            .then(data => setFees(data));
    }, []);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            // 1. طلب الدفع والتسوية عبر بروتوكول المقاصة الهجينة ومجمع السيولة
            const paymentResult = await fetch('/api/telecom/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fees })
            }).then(res => res.json());

            if (paymentResult.success) {
                // 2. تفعيل الرقم وتوليده فور نجاح المقاصة المالية وصفر خسائر
                setAllocatedNumber(paymentResult.phoneNumber);
            }
        } catch (err) {
            alert("خطأ في معالجة الدفع عبر البلوكشين: " + err.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl', textAlign: 'center' }}>
            <h1 style={{ color: '#d4af37' }}>🦅 بروتوكول تلكم موبايل</h1>
            <p>منصة الاتصالات السيادية الموثقة - منظومة النسر العربي</p>
            
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#f9f9f9' }}>
                <h3>تفاصيل الاشتراك السنوي المقوم بـ GCV</h3>
                <p>التكلفة المطلوبة بـ YER: <strong>{fees.requiredYER} YER</strong></p>
                <p>رسوم الأرباح 10% بـ Pi (وفق GCV): <strong>{fees.requiredPiStroops} Pi Stroops</strong></p>
                
                <button onClick={handleSubscribe} disabled={loading} style={{ background: '#d4af37', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }}>
                    {loading ? "جاري معالجة المقاصة الهجينة..." : "اشترك الآن وحكاي رقمك"}
                </button>
            </div>

            {allocatedNumber && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <h2>رقمك السيادي الجديد الفعال: {allocatedNumber}</h2>
                    <p>الرقم جاهز للتنشيط الفوري على WhatsApp و Telegram دون خوف من الحظر.</p>
                </div>
            )}
        </div>
    );
}
