"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import ParticipantForm from "@/components/ParticipantForm";
import SpeakerForm from "@/components/SpeakerForm";
import SponsorForm from "@/components/SponsorForm";

export default function Home() {
  const [activeForm, setActiveForm] = useState("contact");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveForm("contact");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              BuildingSMART Awards 2025
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-white/80 hover:text-white transition">
              О конференции
            </a>
            <a href="#details" className="text-white/80 hover:text-white transition">
              Детали
            </a>
            <a href="#speakers" className="text-white/80 hover:text-white transition">
              Спикеры
            </a>
            <a href="#sponsors" className="text-white/80 hover:text-white transition">
              Спонсоры
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
            Национальная Премия
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BuildingSMART Awards 2025
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Конференция, посвящённая цифровому строительству и openBIM. Объединяем лидеров цифровой трансформации, экспертов, компании и профильные вузы для обсуждения практического внедрения технологий в строительной отрасли.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition transform hover:scale-105 inline-block text-center">
              Зарегистрироваться
            </a>
            <a href="#about" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition inline-block text-center">
              Узнать больше
            </a>
          </div>

          {/* Event Details */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-indigo-400 mb-2">23 октября</div>
              <p className="text-white/70">2025 года, 9:00</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-pink-400 mb-2">Алматы</div>
              <p className="text-white/70">The Ritz-Carlton</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-white/70">Международных экспертов</p>
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
              <p className="text-lg leading-relaxed">
                Национальная Премия и конференция, посвящённая цифровому строительству и openBIM — подходу использования открытых форматов данных о строительных объектах.
              </p>
              <p className="text-lg leading-relaxed">
                Мероприятие объединит лидеров цифровой трансформации строительства и экспертов, компании и профильные вузы для обсуждения практического внедрения технологий и стратегий цифровой трансформации строительной отрасли.
              </p>
              <p className="text-lg leading-relaxed">
                В программе выступления экспертов из Казахстана и зарубежных стран, тематические сессии и обмен опытом.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-lg p-8 border border-white/20 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">Программа конференции:</h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Выступления экспертов из Казахстана и зарубежных стран</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Тематические сессии по цифровому строительству</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Обмен опытом и лучшими практиками</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Церемония вручения BuildingSMART Awards</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-xl">✓</span>
                  <span>Сетевые мероприятия и встречи</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            BuildingSMART Awards
          </h2>
          <div className="bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-lg p-8 border border-white/20 backdrop-blur-md">
            <p className="text-white/80 text-lg leading-relaxed">
              Церемония вручения BuildingSMART Awards пройдёт в рамках конференции и отметит наиболее успешные проекты и инициативы в области BIM в Казахстане. Это признание лучших практик в цифровой трансформации строительной отрасли и внедрении открытых стандартов данных.
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Детали мероприятия
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-indigo-400 mb-4">📅 Дата и время</h3>
              <p className="text-white/80 text-lg mb-2">
                <span className="font-semibold">23 октября 2025 года</span>
              </p>
              <p className="text-white/80 text-lg">
                Начало в <span className="font-semibold">9:00</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-pink-400 mb-4">📍 Место проведения</h3>
              <p className="text-white/80 text-lg mb-2">
                <span className="font-semibold">The Ritz-Carlton, Алматы</span>
              </p>
              <p className="text-white/80 text-lg">
                Ballroom
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">📞 Справки</h3>
              <p className="text-white/80 text-lg mb-3">
                <a href="tel:+77477931665" className="text-indigo-400 hover:text-indigo-300 transition">
                  +7 (747) 793 16 65
                </a>
              </p>
              <p className="text-white/80 text-lg">
                <a href="tel:+77018167481" className="text-indigo-400 hover:text-indigo-300 transition">
                  +7 (701) 816-74-81
                </a>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-indigo-400 mb-4">👥 Участники</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Международные эксперты</li>
                <li>• Представители Министерств РК</li>
                <li>• Лидеры строительных компаний</li>
                <li>• Девелоперские компании</li>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:border-indigo-400/50 transition">
              <div className="h-48 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 flex items-center justify-center">
                <div className="text-6xl">🌍</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Международные эксперты</h3>
                <p className="text-white/70">
                  Ведущие специалисты в области BIM и цифрового строительства из разных стран
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:border-indigo-400/50 transition">
              <div className="h-48 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 flex items-center justify-center">
                <div className="text-6xl">🏛️</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Представители Министерств РК</h3>
                <p className="text-white/70">
                  Официальные представители государственных органов и министерств Республики Казахстан
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:border-indigo-400/50 transition">
              <div className="h-48 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 flex items-center justify-center">
                <div className="text-6xl">🏗️</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Лидеры строительных компаний</h3>
                <p className="text-white/70">
                  Руководители крупнейших строительных и девелоперских компаний Казахстана
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 hover:border-indigo-400/50 transition">
              <div className="h-48 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 flex items-center justify-center">
                <div className="text-6xl">🎓</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Профильные вузы</h3>
                <p className="text-white/70">
                  Представители ведущих университетов и образовательных учреждений
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Спонсорство
          </h2>
          <div className="bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-lg p-8 border border-white/20 backdrop-blur-md mb-12">
            <p className="text-white/80 text-lg leading-relaxed mb-4">
              Мы приглашаем компании присоединиться к нам в качестве спонсоров конференции BuildingSMART Awards 2025. Спонсорство предоставляет уникальную возможность продемонстрировать вашу компанию лидерам строительной отрасли и экспертам в области BIM.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              <span className="font-semibold">Уровни спонсорства:</span> Платиновый, Золотой, Серебряный, Бронзовый и Партнёр. Каждый уровень включает различные преимущества и возможности для продвижения вашего бренда.
            </p>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Присоединяйтесь к конференции
          </h2>

          {/* Form Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setActiveForm("contact")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeForm === "contact"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Обратная связь
            </button>
            <button
              onClick={() => setActiveForm("participant")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeForm === "participant"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Участник
            </button>
            <button
              onClick={() => setActiveForm("speaker")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeForm === "speaker"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Спикер
            </button>
            <button
              onClick={() => setActiveForm("sponsor")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeForm === "sponsor"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              Спонсор
            </button>
          </div>

          {/* Forms */}
          {formSubmitted ? (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-2">Спасибо!</h3>
              <p className="text-white/80">
                Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/20 rounded-lg p-8 backdrop-blur-md">
              {activeForm === "contact" && (
                <ContactForm onSuccess={handleFormSuccess} />
              )}
              {activeForm === "participant" && (
                <ParticipantForm onSuccess={handleFormSuccess} />
              )}
              {activeForm === "speaker" && (
                <SpeakerForm onSuccess={handleFormSuccess} />
              )}
              {activeForm === "sponsor" && (
                <SponsorForm onSuccess={handleFormSuccess} />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-white/60">
          <p>&copy; 2025 BuildingSMART Awards. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
