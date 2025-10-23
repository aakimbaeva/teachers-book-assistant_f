
import { GoogleGenAI, Type } from "@google/genai";
import { type AnalysisData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "Название книги" },
        chapters: {
            type: Type.ARRAY,
            description: "Массив анализов по каждой главе.",
            items: {
                type: Type.OBJECT,
                properties: {
                    chapter: { type: Type.INTEGER, description: "Номер главы" },
                    summary: { type: Type.STRING, description: "Краткий пересказ главы (3-5 предложений)." },
                    keywords: {
                        type: Type.ARRAY,
                        description: "Список из 5-7 ключевых слов или фраз из главы.",
                        items: { type: Type.STRING }
                    },
                    discussionQuestions: {
                        type: Type.ARRAY,
                        description: "Список из 3-4 вопросов для обсуждения по главе.",
                        items: { type: Type.STRING }
                    },
                },
                required: ["chapter", "summary", "keywords", "discussionQuestions"],
            },
        },
        quiz: {
            type: Type.ARRAY,
            description: "Викторина из 10 вопросов с пропущенным словом по всему тексту.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "Предложение с пропущенным словом, обозначенным как '_____'" },
                    answer: { type: Type.STRING, description: "Пропущенное слово" },
                },
                required: ["question", "answer"],
            },
        },
        entities: {
            type: Type.ARRAY,
            description: "Список ключевых персонажей и мест действия.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Имя персонажа или название места" },
                    type: { type: Type.STRING, enum: ["PERSON", "LOCATION"], description: "Тип сущности: PERSON или LOCATION" },
                    description: { type: Type.STRING, description: "Краткое описание (1-2 предложения)" },
                },
                required: ["name", "type", "description"],
            },
        },
    },
    required: ["title", "chapters", "quiz", "entities"],
};

export const generateEducationalMaterials = async (bookText: string): Promise<AnalysisData> => {
    const prompt = `
Проанализируй следующий текст художественного произведения на русском языке. 
Раздели его на главы (если возможно, по смыслу или формальным разделителям) и для каждой главы создай учебные материалы.
Также создай общие материалы по всей книге (викторину, список персонажей).
Строго следуй предоставленной JSON схеме для вывода.

ТЕКСТ ПРОИЗВЕДЕНИЯ:
---
${bookText}
---
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.5,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedData: AnalysisData = JSON.parse(jsonText);
        return parsedData;
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text);
        throw new Error("Could not parse the response from the AI model.");
    }
};
