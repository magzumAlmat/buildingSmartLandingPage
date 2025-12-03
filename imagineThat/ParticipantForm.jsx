"use client";

import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

function ParticipantFormContent({ onSuccess }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    specialization: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA не инициализирована");
      }

      const token = await executeRecaptcha("submit");

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "participant",
          ...formData,
          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при отправке формы");
      }

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        specialization: "",
        experience: "",
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при отправке");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">ФИО *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
            placeholder="Ваше полное имя"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
            placeholder="ваш@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">Телефон *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
            placeholder="+7 (999) 999-99-99"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Компания *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
            placeholder="Название компании"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">Должность *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
            placeholder="Ваша должность"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Специализация</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
            placeholder="Ваша специализация"
          />
        </div>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Опыт в BIM (лет)</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
        >
          <option value="">Выберите опыт</option>
          <option value="0-1">0-1 год</option>
          <option value="1-3">1-3 года</option>
          <option value="3-5">3-5 лет</option>
          <option value="5+">5+ лет</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? "Отправка..." : "Зарегистрироваться как участник"}
      </button>

      <p className="text-white/60 text-sm text-center">
        Эта форма защищена reCAPTCHA и применяются{" "}
        <a href="https://policies.google.com/privacy" className="text-indigo-400 hover:underline">
          Политика конфиденциальности
        </a>{" "}
        и{" "}
        <a href="https://policies.google.com/terms" className="text-indigo-400 hover:underline">
          Условия использования
        </a>{" "}
        Google.
      </p>
    </form>
  );
}

export default function ParticipantForm({ onSuccess }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    return (
      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 text-yellow-300">
        Ошибка: ключ reCAPTCHA не сконфигурирован
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ParticipantFormContent onSuccess={onSuccess} />
    </GoogleReCaptchaProvider>
  );
}
