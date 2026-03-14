import { useState, useEffect, useRef } from 'react'
import {
  Bot,
  Search,
  Zap,
  FileText,
  Send,
  Mail,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#cases', label: 'Кейсы' },
    { href: '#benefits', label: 'Польза' },
    { href: '#services', label: 'Услуги' },
    { href: '#about', label: 'Обо мне' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/85 backdrop-blur-2xl border-b border-border-light shadow-[0_1px_8px_rgba(0,0,0,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-[80px] flex items-center justify-between">
        <a href="#" className="font-display text-xl font-semibold text-text-primary">
          КУ
        </a>

        <div className="hidden md:flex items-center gap-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-text-muted hover:text-brand transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="text-[13px] font-medium text-brand border border-brand/20 bg-brand-subtle hover:bg-brand hover:text-white hover:border-brand px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Связаться
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Меню"
        >
          <span className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-2xl border-b border-border-light px-6 pb-6 pt-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3.5 text-sm text-text-secondary hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-3 text-sm font-medium text-white bg-brand px-6 py-2.5 rounded-full"
          >
            Связаться
          </a>
        </div>
      )}
    </nav>
  )
}

function HeroChatCard() {
  const [ref, isVisible] = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`w-[380px] lg:w-[420px] transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: '400ms' }}
    >
      <div
        className="rounded-[18px] bg-white border border-black/[0.06] overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-black/[0.05]">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
            <Bot className="w-4 h-4 text-brand" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary leading-tight">AI помощник</p>
            <p className="text-[11px] text-brand font-medium leading-tight mt-0.5">онлайн</p>
          </div>
          <div className="ml-auto flex gap-1">
            <div className="w-2 h-2 rounded-full bg-black/[0.06]" />
            <div className="w-2 h-2 rounded-full bg-black/[0.06]" />
            <div className="w-2 h-2 rounded-full bg-black/[0.06]" />
          </div>
        </div>

        {/* Chat */}
        <div className="px-6 py-5 space-y-4">
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-brand/[0.08] rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
              <p className="text-[13px] text-text-primary leading-[1.6]">
                Подбери тур в Турцию на&nbsp;7&nbsp;дней
              </p>
            </div>
          </div>

          {/* AI response */}
          <div className="flex justify-start">
            <div className="bg-surface rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%] border border-border-light">
              <p className="text-[13px] text-text-primary leading-[1.6] mb-3">
                Нашёл 3 варианта. Лучший:
              </p>
              <div className="bg-white rounded-xl border border-border p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-semibold text-text-primary">Анталья</span>
                  <span className="text-[11px] font-medium text-brand bg-brand/[0.08] px-2 py-0.5 rounded-full">7 дней</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand/40" />
                    <span className="text-[12px] text-text-secondary">4★ отель, всё включено</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand/40" />
                    <span className="text-[12px] text-text-secondary">Вылет из Москвы</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="bg-surface rounded-full px-4 py-2.5 border border-border-light">
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/30 animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-brand/20 animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full pt-36 pb-28 md:pt-48 md:pb-40">
        <div className="flex items-center gap-12 lg:gap-16">
        <div className="max-w-xl lg:max-w-[55%] shrink-0">
          <Reveal>
            <p className="text-[13px] font-medium text-text-muted tracking-[0.2em] uppercase mb-10">
              AI-автоматизация для бизнеса
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[clamp(2.75rem,6.5vw,5rem)] font-bold text-text-primary leading-[1.06] mb-8 tracking-tight">
              Камила Урманова
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-xl md:text-[1.65rem] text-text-secondary leading-[1.5] mb-6 font-light">
              Помогаю бизнесу экономить время
              <br className="hidden md:block" />
              с&nbsp;помощью AI&#8209;ботов и&nbsp;нейросетей
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-base md:text-lg text-text-muted leading-[1.7] max-w-xl mb-14">
              Создаю ботов и настраиваю нейросети так, чтобы они упрощали
              рутинные задачи, ускоряли работу с&nbsp;клиентами и помогали
              быстрее получать результат.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div>
              <a
                href="#contacts"
                className="group inline-flex items-center gap-3 bg-brand hover:bg-brand-hover text-white font-medium text-base px-9 py-[18px] rounded-full transition-all duration-300 shadow-[0_2px_12px_rgba(85,107,47,0.15)] hover:shadow-[0_8px_30px_rgba(85,107,47,0.25)] hover:-translate-y-0.5"
              >
                Обсудить задачу
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <p className="mt-10 text-[13px] text-text-muted tracking-wide">
                AI&#8209;боты&ensp;·&ensp;автоматизация задач&ensp;·&ensp;нейросети для бизнеса
              </p>
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:flex flex-1 justify-end">
          <HeroChatCard />
        </div>
        </div>
      </div>
    </section>
  )
}

const processSteps = [
  {
    num: '01',
    title: 'Разбор задачи',
    text: 'Вы рассказываете, какую задачу хотите автоматизировать.',
  },
  {
    num: '02',
    title: 'Подбор решения',
    text: 'Я предлагаю, как это можно сделать с помощью AI.',
  },
  {
    num: '03',
    title: 'Создание инструмента',
    text: 'Создаю бота или систему под вашу задачу.',
  },
  {
    num: '04',
    title: 'Использование',
    text: 'Вы начинаете пользоваться инструментом и экономить время.',
  },
]

function Process() {
  return (
    <section className="py-32 md:py-48 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-[13px] font-medium text-brand tracking-[0.2em] uppercase mb-4">
            Процесс
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-tight mb-20 md:mb-24 max-w-lg">
            Как проходит работа
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
          {processSteps.map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative p-8 md:p-9 rounded-2xl bg-surface-card border border-border h-full">
                <span className="text-[40px] md:text-[44px] font-display font-bold text-olive-100 leading-none select-none">
                  {step.num}
                </span>
                <h3 className="text-base font-semibold text-text-primary mt-4 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-[1.7]">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const cases = [
  {
    num: '01',
    title: 'AI-бот для тур-агентов',
    problem: 'Агенты тратят много времени на просмотр предложений вручную.',
    solution: 'Создан бот, который подбирает туры по параметрам.',
    result: 'Подбор туров стал занимать значительно меньше времени.',
  },
  {
    num: '02',
    title: 'Бот для составления ТЗ',
    problem: 'Заказчики не могли четко сформулировать задачу.',
    solution:
      'Бот задает уточняющие вопросы и собирает структурированное ТЗ.',
    result: 'Время согласования требований сократилось.',
  },
]

function Cases() {
  return (
    <section id="cases" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-[13px] font-medium text-brand tracking-[0.2em] uppercase mb-4">
            Кейсы
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-tight mb-20 md:mb-24">
            Реальные задачи —<br /> реальные результаты
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-7 md:gap-8">
          {cases.map((c, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group relative p-10 md:p-12 rounded-2xl bg-surface-card border border-border hover:border-olive-200 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_56px_rgba(85,107,47,0.08)] hover:-translate-y-1 h-full">
                <span className="text-[13px] font-mono text-brand/30 tracking-wider">
                  {c.num}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary mt-4 mb-10 leading-snug">
                  {c.title}
                </h3>

                <div className="space-y-8">
                  <div>
                    <p className="text-[11px] font-semibold text-brand tracking-[0.15em] uppercase mb-2.5">
                      Проблема
                    </p>
                    <p className="text-text-secondary leading-[1.75]">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-brand tracking-[0.15em] uppercase mb-2.5">
                      Решение
                    </p>
                    <p className="text-text-secondary leading-[1.75]">
                      {c.solution}
                    </p>
                  </div>
                  <div className="pt-8 border-t border-border-light">
                    <p className="text-[11px] font-semibold text-brand tracking-[0.15em] uppercase mb-2.5">
                      Результат
                    </p>
                    <p className="text-text-primary font-medium leading-[1.75]">
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const benefitItems = [
  {
    title: 'Экономия времени сотрудников',
    text: 'Часть задач выполняют нейросети.',
  },
  {
    title: 'Ускорение работы с информацией',
    text: 'Быстрый поиск решений и вариантов.',
  },
  {
    title: 'Меньше ручной работы',
    text: 'Автоматизация повторяющихся процессов.',
  },
  {
    title: 'Более понятные процессы',
    text: 'Структурирование задач и информации.',
  },
]

function Benefits() {
  return (
    <section id="benefits" className="py-32 md:py-48 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-[13px] font-medium text-brand tracking-[0.2em] uppercase mb-4">
            Преимущества
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-tight mb-20 md:mb-24 max-w-lg">
            Польза для бизнеса
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-20 gap-y-14 md:gap-y-16">
          {benefitItems.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="relative pl-7 border-l-2 border-olive-200">
                <h3 className="text-lg font-semibold text-text-primary mb-2.5 leading-snug">
                  {b.title}
                </h3>
                <p className="text-text-secondary leading-[1.7]">
                  {b.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const serviceItems = [
  {
    icon: Bot,
    title: 'AI-боты для бизнеса',
    text: 'Автоматизация задач с помощью нейросетей.',
  },
  {
    icon: Search,
    title: 'Подбор решений по параметрам',
    text: 'Боты, которые помогают быстрее находить подходящие варианты.',
  },
  {
    icon: Zap,
    title: 'Создание промптов',
    text: 'Настройка эффективных запросов для работы с AI.',
  },
  {
    icon: FileText,
    title: 'Генерация текстов и документов',
    text: 'Помощь в создании контента и рабочих материалов.',
  },
]

function Services() {
  return (
    <section id="services" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <p className="text-[13px] font-medium text-brand tracking-[0.2em] uppercase mb-4">
            Услуги
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-tight mb-20 md:mb-24 max-w-md">
            С чем я могу помочь
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-7">
          {serviceItems.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group p-8 md:p-10 rounded-2xl bg-surface-card border border-border hover:border-olive-200 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(85,107,47,0.06)] hover:-translate-y-0.5 h-full">
                <div className="w-11 h-11 rounded-xl bg-olive-50 flex items-center justify-center mb-6 group-hover:bg-olive-100 transition-colors duration-300">
                  <s.icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-text-secondary leading-[1.7]">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-32 md:py-48 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[13px] font-medium text-brand tracking-[0.2em] uppercase mb-4">
              Обо мне
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-tight mb-12">
              Камила Урманова
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6 text-lg text-text-secondary leading-[1.8]">
              <p>
                Я — промпт-инженер. Помогаю предпринимателям и&nbsp;специалистам
                использовать нейросети в&nbsp;реальных рабочих задачах.
              </p>
              <p>
                Создаю ботов и настраиваю AI&#8209;инструменты так, чтобы они
                экономили время и&nbsp;упрощали работу.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Contacts() {
  return (
    <section id="contacts" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-[13px] font-medium text-brand tracking-[0.2em] uppercase mb-4">
              Контакты
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-text-primary leading-tight mb-6">
              Обсудим вашу задачу
            </h2>
            <p className="text-lg text-text-secondary leading-[1.7] mb-16">
              Если вы хотите автоматизировать часть процессов
              с&nbsp;помощью нейросетей — напишите мне.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col gap-6 mb-16">
              <a
                href="https://t.me/kamiurrr"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-text-primary hover:text-brand transition-colors duration-300"
              >
                <Send className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors duration-300" strokeWidth={1.5} />
                <span className="text-base">Telegram</span>
                <span className="text-text-muted">—</span>
                <span className="font-medium">@kamiurrr</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <a
                href="mailto:camila-urm@yandex.ru"
                className="group inline-flex items-center gap-3 text-text-primary hover:text-brand transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors duration-300" strokeWidth={1.5} />
                <span className="text-base">Email</span>
                <span className="text-text-muted">—</span>
                <span className="font-medium">camila-urm@yandex.ru</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <a
              href="https://t.me/kamiurrr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-brand hover:bg-brand-hover text-white font-medium text-base px-9 py-[18px] rounded-full transition-all duration-300 shadow-[0_2px_12px_rgba(85,107,47,0.15)] hover:shadow-[0_8px_30px_rgba(85,107,47,0.25)] hover:-translate-y-0.5"
            >
              Написать в Telegram
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border-light">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <p className="text-[13px] text-text-muted">
          © {new Date().getFullYear()} Камила Урманова
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Process />
      <Cases />
      <Benefits />
      <Services />
      <About />
      <Contacts />
      <Footer />
    </div>
  )
}
