import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import './ChatBot.css';

const INITIAL_MESSAGES = [
    {
        id: 1,
        from: 'bot',
        text: "Hi! I'm CoirBot 🌿 — your expert guide to Kerala's coir industry. Ask me about products, pricing, or sourcing!",
    },
];

const SAMPLE_RESPONSES = [
    "Great question! Brown coir fibre is available from multiple sellers in Alappuzha. It's typically priced between ₹15–22 per kg depending on grade. Check the Raw Materials section for current listings.",
    "Coco peat blocks are highly popular for horticulture exports. A standard 5kg block expands to about 70–75 litres of growing medium. Our sellers in Thrissur and Ernakulam offer export-quality blocks.",
    "For coir rope, I recommend 2-ply or 3-ply twisted rope. The 6mm variety is most popular for decorative and utility uses. Check our Intermediate Products section for current availability.",
    "White coir fibre is produced using traditional water-retting — a technique Alappuzha is famous for. It's preferred for fine yarn and premium mats. Prices range from ₹20–28/kg.",
    "The coir industry in Alappuzha (Alleppey) dates back over 150 years. It employs over 300,000 workers across Kerala. Coir Netra connects you directly to these grassroots producers.",
];

let responseIndex = 0;

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bodyRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages, typing]);

    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;

        const userMsg = { id: Date.now(), from: 'user', text };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                from: 'bot',
                text: SAMPLE_RESPONSES[responseIndex % SAMPLE_RESPONSES.length],
            };
            responseIndex++;
            setMessages((prev) => [...prev, botMsg]);
            setTyping(false);
        }, 1200);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="chat-widget" id="chat-widget">
            {open && (
                <div className="chat-panel" id="chat-panel">
                    <div className="chat-header">
                        <div className="chat-avatar"><Bot size={18} /></div>
                        <div>
                            <div className="chat-name">CoirBot</div>
                            <div className="chat-status">● Online</div>
                        </div>
                        <button className="chat-close" onClick={() => setOpen(false)} id="chat-close" aria-label="Close chat">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="chat-body" ref={bodyRef}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-msg ${msg.from}`}>
                                {msg.text}
                            </div>
                        ))}
                        {typing && (
                            <div className="chat-msg bot typing">
                                <span /><span /><span />
                            </div>
                        )}
                    </div>
                    <div className="chat-footer">
                        <input
                            className="chat-input"
                            type="text"
                            placeholder="Ask about coir products..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            id="chat-input"
                        />
                        <button className="chat-send" onClick={sendMessage} id="chat-send" aria-label="Send message">
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            )}
            <button
                className="chat-trigger"
                onClick={() => setOpen(!open)}
                id="chat-trigger"
                aria-label="Open CoirBot"
            >
                {open ? <X size={22} /> : <MessageCircle size={22} />}
            </button>
        </div>
    );
}
