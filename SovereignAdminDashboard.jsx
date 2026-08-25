// Sovereign Admin Dashboard - Telcom Mobile Protocol MVNO Engine
// منظومة النسر العربي (A.E.C.) - إدارة تدوير رأس المال ومصنع الباقات 
import React, { useState, useEffect } from 'react';

export default function SovereignAdminDashboard() {
    const [wholesaleSuppliers, setWholesaleSuppliers] = useState([
        { id: 1, name: "Twilio Enterprise", status: "CONNECTED", activeLines: 1420, rateUSD: "2.10/mo" },
        { id: 2, name: "Telnyx LLC", status: "CONNECTED", activeLines: 850, rateUSD: "1.95/mo" }
    ]);

    const [bundles, setBundles] = useState([
        { id: "BNDL-ECONOMY", name: "الباقة الاقتصادية (للموظفين)", wholesaleUSD: 2.00, retailYER: "10.00", sales: 450 },
        { id: "BNDL-MEDIUM", name: "الباقة المتوسطة (للتجار)", wholesaleUSD: 5.00, retailYER: "25.50", sales: 1200 },
        { id: "BNDL-PREMIUM", name: "باقة الـ Premium (للمدراء)", wholesaleUSD: 15.00, retailYER: "76.50", sales: 310 }
    ]);

    const [financials, setFinancials] = useState({
        totalRotatedUSDT: "11,250.00", // رأس مال الموردين المدور لضمان صفر خسائر
        accumulatedPiProfitStroops: "0.0003582", // حصة الأرباح 25% المحجوزة وفق GCV
        activeUsersCount: 1960
    });

    const [marketingMessage, setMarketingMessage] = useState("");

    const handleBroadcastPromo = () => {
        if (marketingMessage.trim()) {
            alert(`🦅 تم بث العرض الذكي أوتوماتيكياً لجميع المستخدمين المستهدفين حسب لغة هواتفهم: \n"${marketingMessage}"`);
            setMarketingMessage("");
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Cairo, sans-serif', direction: 'rtl', textAlign: 'right', backgroundColor: '#0c0c0c', color: '#fff', minHeight: '100vh' }}>
            <h1 style={{ color: '#d4af37', borderBottom: '2px solid #d4af37', paddingBottom: '10px' }}>🦅 لوحة الإدارة السيادية المتكاملة | بروتوكول تلكم موبايل</h1>
            <p style={{ opacity: 0.7 }}>بوابة التحكم المركزي والمقاصة الهجينة (الجملة ← تصنيع الباقات ← التجزئة)</p>

            {/* القسم المالي المزدوج وتدوير رأس المال */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '30px 0' }}>
                <div style={{ background: '#141414', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #00ffcc' }}>
                    <h3 style={{ margin: 0, opacity: 0.8 }}>💵 رأس المال المدوّر للموردين</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ffcc', margin: '10px 0' }}>{financials.totalRotatedUSDT} USDT</p>
                    <small>تم تحويلها لـ USD ورقي لحساب الشركات وصفر خسائر</small>
                </div>
                <div style={{ background: '#141414', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #d4af37' }}>
                    <h3 style={{ margin: 0, opacity: 0.8 }}>💰 الأرباح الصافية المحتجزة (25%)</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d4af37', margin: '10px 0' }}>{financials.accumulatedPiProfitStroops} Pi</p>
                    <small>محسوبة ومفرزة صامتاً بناءً على تقييم GCV</small>
                </div>
                <div style={{ background: '#141414', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #333' }}>
                    <h3 style={{ margin: 0, opacity: 0.8 }}>👥 المشتركون النشطون عالمياً</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{financials.activeUsersCount}</p>
                    <small>شرائح الموظفين، التجار، والشركات الفاخرة</small>
                </div>
            </div>

            {/* مصنع تركيب الباقات وإدارة التجزئة */}
            <div style={{ background: '#141414', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                <h2 style={{ color: '#d4af37', marginTop: 0 }}>📦 مصنع تركيب الباقات وإدارة أسعار التجزئة</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #333', color: '#aaa' }}>
                            <th style={{ padding: '10px', textAlign: 'right' }}>معرّف الباقة</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>سعر الجملة (المورد)</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>سعر البيع بالتجزئة (المستهلك)</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>إجمالي المبيعات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bundles.map(b => (
                            <tr key={b.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '12px' }}>{b.name}</td>
                                <td style={{ padding: '12px', color: '#00ffcc' }}>${b.wholesaleUSD.toFixed(2)} USD</td>
                                <td style={{ padding: '12px', color: '#d4af37', fontWeight: 'bold' }}>{b.retailYER} YER</td>
                                <td style={{ padding: '12px' }}>{b.sales} باقة فعالّة</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* نظام المراسلات والتسويق الذكي للشبكة */}
            <div style={{ background: '#141414', padding: '20px', borderRadius: '10px' }}>
                <h2 style={{ color: '#d4af37', marginTop: 0 }}>📢 نظام المراسلات والتسويق الذكي الموجه (CRM)</h2>
                <p style={{ opacity: 0.7, fontSize: '14px' }}>قم بكتابة عرض ترويجي، وسيقوم محرك الذكاء الاصطناعي ببثه للعملاء المستهدفين تلقائياً حسب حجم استهلاك الباقة ولغة هواتفهم الحالية صامتاً:</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                    <textarea 
                        value={marketingMessage} 
                        onChange={e => setMarketingMessage(e.target.value)}
                        placeholder="مثال: قم بترقية باقتك المتوسطة وفعل ميزة غرف المؤتمرات المرئية الفاخرة بخصم تشغيلي..." 
                        style={{ flex: 1, padding: '15px', borderRadius: '6px', background: '#222', color: '#fff', border: '1px solid #333', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                    <button onClick={handleBroadcastPromo} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '0 30px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        بث العرض الذكي
                    </button>
                </div>
            </div>
        </div>
    );
}
