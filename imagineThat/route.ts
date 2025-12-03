import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
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

// Initialize Google Sheets API (using base64 encoded credentials)
async function appendToGoogleSheet(
  name: string,
  email: string,
  phone: string,
  company: string,
  message: string
): Promise<void> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64 || "", "base64").toString("utf-8")
      ) as any,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, name, email, phone, company, message]],
      },
    });

    console.log("Row appended to Google Sheet:", response.data);
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw new Error("Ошибка при записи данных в таблицу");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !recaptchaToken) {
      return NextResponse.json(
        { message: "Пожалуйста, заполните все обязательные поля" },
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

    // Append to Google Sheet
    await appendToGoogleSheet(name, email, phone || "", company || "", message || "");

    return NextResponse.json(
      { message: "Спасибо! Ваша заявка успешно отправлена." },
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
