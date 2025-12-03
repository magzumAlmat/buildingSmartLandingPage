"use server";

import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

async function readSubmissionsFromJson() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    const defaultStructure = {
      "Обратная связь": [],
      "Участники": [],
      "Спикеры": [],
      "Спонсоры": []
    };

    let needsUpdate = false;
    const dataWithIds = {
      ...defaultStructure,
      ...parsedData,
    };

    for (const sheetName in dataWithIds) {
      if (Array.isArray(dataWithIds[sheetName])) {
        dataWithIds[sheetName] = dataWithIds[sheetName].map((submission) => {
          if (!submission.id) {
            needsUpdate = true;
            return { ...submission, id: Date.now().toString() + Math.random().toString(36).substring(2, 8), status: submission.status || "Новая" }; // Assign unique ID and default status
          }
          return submission;
        });
      } else {
        // If it's not an array, re-initialize to an empty array
        dataWithIds[sheetName] = defaultStructure[sheetName];
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      await writeSubmissionsToJson(dataWithIds); // Persist the new IDs
    }

    return dataWithIds;
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, return empty data structure
      return {
        "Обратная связь": [],
        "Участники": [],
        "Спикеры": [],
        "Спонсоры": []
      };
    }
    throw error;
  }
}

async function writeSubmissionsToJson(data) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function saveSubmission(formData, type) {
  try {
    const allData = await readSubmissionsFromJson();
    const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    let newSubmission;
    const uniqueId = Date.now().toString() + Math.random().toString(36).substring(2, 8); // Generate a unique ID

    switch (type) {
      case "contact":
        newSubmission = {
          id: uniqueId,
          timestamp,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          company: formData.company || "",
          message: formData.message || "",
          status: "Новая", // Default status
        };
        allData["Обратная связь"].push(newSubmission);
        break;
      case "participant":
        newSubmission = {
          id: uniqueId,
          timestamp,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.position,
          specialization: formData.specialization || "",
          experience: formData.experience || "",
          status: "Новая", // Default status
        };
        allData["Участники"].push(newSubmission);
        break;
      case "speaker":
        newSubmission = {
          id: uniqueId,
          timestamp,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          company: formData.company,
          position: formData.position,
          expertise: formData.expertise,
          bio: formData.bio || "",
          topicTitle: formData.topicTitle,
          topicDescription: formData.topicDescription,
          status: "Новая", // Default status
        };
        allData["Спикеры"].push(newSubmission);
        break;
      case "sponsor":
        newSubmission = {
          id: uniqueId,
          timestamp,
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          website: formData.website || "",
          sponsorLevel: formData.sponsorLevel,
          industry: formData.industry,
          message: formData.message || "",
          status: "Новая", // Default status
        };
        allData["Спонсоры"].push(newSubmission);
        break;
      default:
        throw new Error("Неизвестный тип формы");
    }

    await writeSubmissionsToJson(allData);
    return { success: true, message: "Ваша заявка успешно отправлена." };
  } catch (error) {
    console.error("Error saving submission:", error);
    return { success: false, message: error instanceof Error ? error.message : "Произошла ошибка при сохранении заявки." };
  }
}

export async function getAllSubmissions(username, password) {
  try {
    // Basic authentication for demonstration purposes (e.g., check process.env.ADMIN_TOKEN)
    // In a real application, implement robust authentication.
    // This server action is directly callable, so authentication needs to be handled here.
    if (username !== 'admin' || password !== 'admin123') {
      return { success: false, message: 'Invalid credentials', submissions: [] };
    }

    const allData = await readSubmissionsFromJson();
    let allProcessedSubmissions = [];

    for (const sheetName in allData) {
      if (allData.hasOwnProperty(sheetName)) {
        const submissions = allData[sheetName].map((submission) => {
          let processedSubmission = { id: submission.id, type: sheetName, status: submission.status || "Новая" }; // Use stored ID and status

          switch (sheetName) {
            case "Обратная связь":
              processedSubmission.date = submission.timestamp;
              processedSubmission.name = submission.name;
              processedSubmission.email = submission.email;
              processedSubmission.phone = submission.phone;
              processedSubmission.company = submission.company;
              break;
            case "Участники":
              processedSubmission.date = submission.timestamp;
              processedSubmission.name = submission.fullName;
              processedSubmission.email = submission.email;
              processedSubmission.phone = submission.phone;
              processedSubmission.company = submission.company;
              break;
            case "Спикеры":
              processedSubmission.date = submission.timestamp;
              processedSubmission.name = submission.fullName;
              processedSubmission.email = submission.email;
              processedSubmission.phone = submission.phone;
              processedSubmission.company = submission.company;
              break;
            case "Спонсоры":
              processedSubmission.date = submission.timestamp;
              processedSubmission.name = submission.contactPerson;
              processedSubmission.company = submission.companyName;
              processedSubmission.email = submission.email;
              processedSubmission.phone = submission.phone;
              break;
          }
          return processedSubmission;
        });
        allProcessedSubmissions = allProcessedSubmissions.concat(submissions);
      }
    }
    return { success: true, submissions: allProcessedSubmissions };
  } catch (error) {
    console.error("Error getting all submissions:", error);
    return { success: false, message: error instanceof Error ? error.message : "Произошла ошибка при получении данных." };
  }
}

export async function updateSubmissionStatus(id, type, newStatus, username, password) {
  try {
    if (username !== 'admin' || password !== 'admin123') {
      return { success: false, message: 'Invalid credentials' };
    }

    const allData = await readSubmissionsFromJson();
    let found = false;

    // Find the correct sheet
    if (allData[type]) {
      const submissionsInSheet = allData[type];
      for (let i = 0; i < submissionsInSheet.length; i++) {
        if (submissionsInSheet[i].id === id) {
          submissionsInSheet[i].status = newStatus;
          found = true;
          break;
        }
      }
    }

    if (found) {
      await writeSubmissionsToJson(allData);
      return { success: true, message: "Статус успешно обновлен." };
    } else {
      return { success: false, message: "Заявка не найдена." };
    }

  } catch (error) {
    console.error("Error updating submission status:", error);
    return { success: false, message: error instanceof Error ? error.message : "Произошла ошибка при обновлении статуса." };
  }
}