import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';

export const ChatWidget: React.FC = () => {
  const { isChatOpen, chatMessages, chatUnread, openChat, closeChat, addChatMessage, lang } = useStore();
  const [text, setText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChatOpen, chatMessages.length]);

  const handleSend = () => {
    if (!text.trim()) return;
    addChatMessage(text.trim(), 'user');
    setText('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = lang === 'hy'
    ? ['Ոսկու գին?', 'Չափ ստուգել', 'Առաքում', 'Գրասենյակ']
    : lang === 'ru'
    ? ['Цена золота?', 'Проверить размер', 'Доставка', 'Офис']
    : ['Gold price?', 'Size check', 'Delivery', 'Location'];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => isChatOpen ? closeChat() : openChat()}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A8860A] flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_36px_rgba(212,175,55,0.6)] transition-all duration-300"
        style={{ animation: 'pulse-gold 2s ease-in-out infinite' }}
      >
        {isChatOpen ? (
          <X size={22} className="text-black" />
        ) : (
          <MessageCircle size={22} className="text-black" />
        )}
        {!isChatOpen && chatUnread > 0 && (
          <motion.span
            key={chatUnread}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
          >
            {chatUnread}
          </motion.span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 glass-card rounded-lg overflow-hidden flex flex-col"
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4AF37]/10 bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/10">
                    <span className="font-serif text-sm font-bold text-[#D4AF37]">A</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#111]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">AURUM Support</p>
                  <p className="text-xs text-emerald-400">
                    {lang === 'hy' ? 'Առցանց' : lang === 'ru' ? 'Онлайн' : 'Online'}
                  </p>
                </div>
              </div>
              <button onClick={closeChat} className="text-white/40 hover:text-[#D4AF37] transition-colors">
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '300px' }}>
              {chatMessages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'admin' && (
                    <div className="w-6 h-6 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/10 mr-2 shrink-0 mt-1">
                      <span className="text-[10px] font-bold text-[#D4AF37]">A</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-admin'} px-3 py-2`}>
                    <p className="text-sm text-white/85 leading-relaxed">{msg.text}</p>
                    <p className="text-[10px] text-white/25 mt-1">
                      {format(new Date(msg.timestamp), 'HH:mm')}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
              {quickReplies.map(reply => (
                <button
                  key={reply}
                  onClick={() => { addChatMessage(reply, 'user'); }}
                  className="shrink-0 px-3 py-1.5 text-xs border border-[#D4AF37]/20 text-[#D4AF37]/70 rounded-full hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-200 whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 pb-3 flex gap-2">
              <input
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKey}
                placeholder={lang === 'hy' ? 'Ձեր հարցը...' : lang === 'ru' ? 'Ваш вопрос...' : 'Your question...'}
                className="flex-1 gold-input rounded-full px-4 py-2.5 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black hover:bg-[#F0D060] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
