// إضافة هذه الأجزاء داخل ملف App.jsx الرئيسي في واجهة المستخدم
import React, { useState } from 'react';
import { TelcomSupportEngine } from './TelcomSupportEngine';

const supportSystem = new TelcomSupportEngine();

// مكون الدعم الفني المدمج بأسفل التطبيق (Support Component)
export function SupportWidget({ userId, currentLang }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { sender: "user", text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // استدعاء محرك الدعم الفني الذكي
        const response = await supportSystem.processSupportMessage(userId, inputValue, currentLang);
        
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: "system", text: response.message }]);
        }, 600); // محاكاة سرعة استجابة الذكاء الاصطناعي
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', background: '#1c1c1c', borderRadius: '12px', border: '1px solid #333', textAlign: 'right' }}>
            <h3 style={{ color: '#d4af37', marginTop: 0 }}>💬 مركز الدعم الفني السيادي (AI & البشر)</h3>
            
            <div style={{ height: '150px', overflowY: 'auto', background: '#111', padding: '10px', borderRadius: '6px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? '#d4af37' : '#222', color: msg.sender === 'user' ? '#000' : '#fff', padding: '6px 12px', borderRadius: '8px', maxWidth: '80%', fontSize: '14px' }}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" placeholder="اكتب استفسارك هنا..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #333', background: '#222', color: '#fff' }} />
                <button onClick={handleSendMessage} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>إرسال</button>
            </div>
        </div>
    );
}
