"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              TechConf 2024
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-white/80 hover:text-white transition">
              О конференции
            </a>
            <a href="#speakers" className="text-white/80 hover:text-white transition">
              Спикеры
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition">
              Контакты
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Добро пожаловать на
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TechConf 2024
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Присоединяйтесь к ведущим экспертам технологической индустрии на самой ожидаемой конференции года.
            Откройте для себя инновации, установите новые связи и вдохновитесь будущим.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition transform hover:scale-105">
              Зарегистрироваться
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition">
              Узнать больше
            </button>
          </div>

          {/* Event Details */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-indigo-400 mb-2">25-27</div>
              <p className="text-white/70">Декабря 2024</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-pink-400 mb-2">500+</div>
              <p className="text-white/70">Участников</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-white/70">Спикеров</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            О конференции
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-white/80 space-y-4">
              <p className="text-lg">
                TechConf 2024 — это ежегодная конференция, собирающая лучших специалистов в области технологий, 
                инноваций и цифровой трансформации.
              </p>
              <p className="text-lg">
                На протяжении трёх дней вы услышите вдохновляющие доклады, примете участие в интерактивных 
                воркшопах и встретитесь с единомышленниками из разных уголков мира.
              </p>
              <p className="text-lg">
                Наша миссия — создать площадку для обмена идеями и укрепления сообщества технологических 
                профессионалов.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-lg p-8 border border-white/20 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">Что вас ждёт:</h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Лекции от ведущих экспертов индустрии</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Практические воркшопы и мастер-классы</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Сетевые мероприятия и встречи</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Выставка технологических решений</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Сертификат участника</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Наши спикеры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i: number) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:border-indigo-400/50 transition group"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 flex items-center justify-center">
                  <div className="text-6xl text-white/30">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Спикер {i}</h3>
                  <p className="text-sm text-indigo-400 mb-3">Технологический эксперт</p>
                  <p className="text-white/70 text-sm">
                    Специалист с более чем 15 годами опыта в области инноваций и цифровой трансформации.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Зарегистрируйтесь сейчас
          </h2>
          <p className="text-white/70 text-center mb-12">
            Заполните форму ниже, чтобы зарезервировать своё место на конференции
          </p>
          {formSubmitted ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-2">Спасибо за регистрацию!</h3>
              <p className="text-white/80">
                Мы отправили подтверждение на ваш email. Следите за обновлениями!
              </p>
            </div>
          ) : (
            <ContactForm onSuccess={() => setFormSubmitted(true)} />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-white/60">
          <p>&copy; 2024 TechConf. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
