import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Verify reCAPTCHA token
async function verifyRecaptcha(token) {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

// Initialize Google Sheets API
async function appendToGoogleSheet(sheetName, values) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64 || "", "base64").toString("utf-8")
      ),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [values],
      },
    });

    console.log(`Row appended to ${sheetName}:`, response.data);
  } catch (error) {
    console.error(`Error appending to ${sheetName}:`, error);
    throw new Error(`Ошибка при записи данных в таблицу ${sheetName}`);
  }
}

// Handle Contact Form
async function handleContactForm(body) {
  const { name, email, phone, company, message } = body;

  if (!name || !email) {
    throw new Error("Пожалуйста, заполните все обязательные поля");
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  await appendToGoogleSheet("Обратная связь", [
    timestamp,
    name,
    email,
    phone || "",
    company || "",
    message || "",
  ]);

  return "Спасибо! Ваша заявка успешно отправлена.";
}

// Handle Participant Form
async function handleParticipantForm(body) {
  const { fullName, email, phone, company, position, specialization, experience } = body;

  if (!fullName || !email || !phone || !company || !position) {
    throw new Error("Пожалуйста, заполните все обязательные поля");
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  await appendToGoogleSheet("Участники", [
    timestamp,
    fullName,
    email,
    phone,
    company,
    position,
    specialization || "",
    experience || "",
  ]);

  return "Спасибо за регистрацию! Вы успешно добавлены как участник конференции.";
}

// Handle Speaker Form
async function handleSpeakerForm(body) {
  const { fullName, email, phone, company, position, expertise, bio, topicTitle, topicDescription, country } = body;

  if (!fullName || !email || !phone || !company || !position || !expertise || !topicTitle || !topicDescription || !country) {
    throw new Error("Пожалуйста, заполните все обязательные поля");
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  await appendToGoogleSheet("Спикеры", [
    timestamp,
    fullName,
    email,
    phone,
    country,
    company,
    position,
    expertise,
    bio || "",
    topicTitle,
    topicDescription,
  ]);

  return "Спасибо! Ваша заявка на выступление успешно отправлена. Мы свяжемся с вами в ближайшее время.";
}

// Handle Sponsor Form
async function handleSponsorForm(body) {
  const { companyName, contactPerson, email, phone, website, sponsorLevel, industry, message } = body;

  if (!companyName || !contactPerson || !email || !phone || !sponsorLevel || !industry) {
    throw new Error("Пожалуйста, заполните все обязательные поля");
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  await appendToGoogleSheet("Спонсоры", [
    timestamp,
    companyName,
    contactPerson,
    email,
    phone,
    website || "",
    sponsorLevel,
    industry,
    message || "",
  ]);

  return "Спасибо за интерес к спонсорству! Мы свяжемся с вами в ближайшее время.";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, recaptchaToken } = body;

    if (!recaptchaToken) {
      return NextResponse.json(
        { message: "Ошибка проверки безопасности" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { message: "Ошибка проверки reCAPTCHA. Пожалуйста, попробуйте снова." },
        { status: 400 }
      );
    }

    let message = "";

    // Route to appropriate handler based on form type
    switch (type) {
      case "contact":
        message = await handleContactForm(body);
        break;
      case "participant":
        message = await handleParticipantForm(body);
        break;
      case "speaker":
        message = await handleSpeakerForm(body);
        break;
      case "sponsor":
        message = await handleSponsorForm(body);
        break;
      default:
        throw new Error("Неизвестный тип формы");
    }

    return NextResponse.json(
      { message },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Произошла ошибка при обработке формы",
      },
      { status: 500 }
    );
  }
}
