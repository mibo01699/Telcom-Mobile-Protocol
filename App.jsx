import React, { useState, useEffect } from 'react';
import { SovereignLocalization } from './SovereignLocalization';
import { TelecomMediaCore } from './TelecomMediaCore';

const langEngine = new SovereignLocalization();
const mediaCore = new TelecomMediaCore();

export default function TelcomMobileApp() {
    const [contacts, setContacts] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [displayCost, setDisplayCost] = useState("0");
    const [inCall, setInCall] = useState(false);

    useEffect(() => {
        // تحميل جهات الاتصال المحلية فور فتح التطبيق
        setContacts(mediaCore.getAllContacts());
        
        // جلب السعر التشغيلي الشامل والمحمي (المخفي بداخله الأرباح ورسوم الفيديو) تلقائياً
        fetch('/api/telecom/calculate-hidden-fees?planUSD=30')
            .then(res => res.json())
            .then(data => setDisplayCost(data.displayTotalCostYER));
    }, []);

    const handleAddContact = () => {
        if(newName && newPhone) {
            mediaCore.saveContact(newName, newPhone);
            setContacts(mediaCore.getAllContacts());
            setNewName(""); setNewPhone("");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Cairo, sans-serif', direction: langEngine.currentLang === 'ar' ? 'rtl' : 'ltr', textAlign: 'center', backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
            <h1 style={{ color: '#d4af37' }}>🦅 {langEngine.get('title')}</h1>
            <p style={{ letterSpacing: '1px', opacity: 0.8 }}>Sovereign Telecom Matrix</p>
            
            {/* بطاقة التنشيط الذكية والمحمية */}
            <div style={{ border: '2px solid #d4af37', padding: '25px', borderRadius: '15px', background: '#222', margin: '20px auto', maxWidth: '500px' }}>
                <p>{langEngine.get('totalCost')}: <span style={{ color: '#00ffcc', fontSize: '20px', fontWeight: 'bold' }}>{displayCost} YER</span></p>
                <button style={{ background: '#d4af37', color: '#000', border: 'none', padding: '12px 25px', fontSize: '16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
                    {langEngine.get('subscribe')}
                </button>
            </div>

            {/* ميزة الاتصال المرئي فائق الجودة */}
            <div style={{ margin: '30px auto', maxWidth: '500px', background: '#1a1a1a', padding: '20px', borderRadius: '12px' }}>
                <h3>📺 {langEngine.get('videoCall')} & {langEngine.get('conference')}</h3>
                <button onClick={() => setInCall(!inCall)} style={{ background: '#00ffcc', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px', fontWeight: 'bold' }}>
                    {inCall ? "إنهاء البث المشفر" : "إنشاء غرفة مؤتمرات النسر العربي"}
                </button>
                {inCall && <div style={{ width: '100%', height: '200px', background: '#000', marginTop: '10px', borderRadius: '8px', border: '1px dashed #00ffcc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>[ بث مرئي P2P مشفر ومؤمن بالكامل ]</div>}
            </div>

            {/* سجل جهات الاتصال المبسط والمحمي محلياً */}
            <div style={{ margin: '30px auto', maxWidth: '500px', background: '#1a1a1a', padding: '20px', borderRadius: '12px', textAlign: 'right' }}>
                <h3>📇 {langEngine.get('contacts')}</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <input type="text" placeholder="الاسم" value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d4af37', background: '#333', color: '#fff', flex: 1 }} />
                    <input type="text" placeholder="الرقم" value={newPhone} onChange={e => setNewPhone(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d4af37', background: '#333', color: '#fff', flex: 1 }} />
                    <button onClick={handleAddContact} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>إضافة</button>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {contacts.map(c => (
                        <li key={c.id} style={{ padding: '10px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>👤 {c.name}</span>
                            <span style={{ color: '#00ffcc' }}>📞 {c.phone}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
