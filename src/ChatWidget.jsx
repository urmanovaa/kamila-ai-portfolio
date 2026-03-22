import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const API_BASE = 'http://localhost:8000'

const GREETING =
  'Привет! Я AI-ассистент Камилы. Задайте вопрос об услугах, сроках, стоимости или процессе работы.'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEnd = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  function handleOpen() {
    setOpen(true)
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: GREETING }])
    }
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || sending) return

    const updatedMessages = [...messages, { role: 'user', text }]
    setMessages(updatedMessages)
    setInput('')
    setSending(true)

    const history = updatedMessages
      .filter((m) => m.role !== 'bot' || m.text !== GREETING)
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))
      .slice(0, -1)

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, top_k: 3, history }),
      })
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'bot', text: data.answer }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Не удалось получить ответ. Попробуйте позже или напишите в Telegram @kamiurrr.',
        },
      ])
    } finally {
      setSending(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!open) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand hover:bg-brand-hover text-white flex items-center justify-center shadow-[0_4px_24px_rgba(85,107,47,0.3)] hover:shadow-[0_8px_32px_rgba(85,107,47,0.4)] transition-all duration-300 hover:-translate-y-0.5"
        aria-label="Открыть чат"
      >
        <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[480px] max-h-[calc(100vh-48px)] flex flex-col rounded-2xl bg-white border border-black/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border-light bg-surface">
        <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
          <MessageCircle className="w-4 h-4 text-brand" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary leading-tight">
            AI-ассистент
          </p>
          <p className="text-[11px] text-brand font-medium leading-tight mt-0.5">
            онлайн
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-black/[0.04] transition-colors"
          aria-label="Закрыть чат"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-surface/50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-[1.6] whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-brand/[0.08] text-text-primary rounded-2xl rounded-br-md'
                  : 'bg-white border border-border-light text-text-primary rounded-2xl rounded-bl-md'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-white border border-border-light rounded-full px-4 py-2.5">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-pulse" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand/30 animate-pulse"
                  style={{ animationDelay: '200ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand/20 animate-pulse"
                  style={{ animationDelay: '400ms' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-border-light bg-white">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Задайте вопрос..."
          disabled={sending}
          className="flex-1 text-[13px] text-text-primary bg-surface rounded-full px-4 py-2.5 border border-border placeholder:text-text-muted outline-none focus:border-brand/30 transition-colors disabled:opacity-60"
        />
        <button
          onClick={handleSend}
          disabled={sending || !input.trim()}
          className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center shrink-0 hover:bg-brand-hover transition-colors disabled:opacity-40 disabled:cursor-default"
          aria-label="Отправить"
        >
          <Send className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
