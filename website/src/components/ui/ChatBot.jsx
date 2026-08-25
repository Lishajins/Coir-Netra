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

    const sendMessage = async () => {
        const text = input.trim();
        if (!text) return;

        const userMsg = { id: Date.now(), from: 'user', text };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        try {
            const response = await fetch('http://localhost:3000/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: text })
            });
            const data = await response.json();

            const botMsg = {
                id: Date.now() + 1,
                from: 'bot',
                text: data.reply || data.error || "Sorry, I couldn't understand that.",
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch {
            setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: "Error connecting to AI server." }]);
        } finally {
            setTyping(false);
        }
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
