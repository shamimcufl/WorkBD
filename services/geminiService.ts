
import { GoogleGenAI, Type } from "@google/genai";
import type { Job } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API features will not be available.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateJobDescription = async (jobTitle: string): Promise<string> => {
    if (!API_KEY) return Promise.resolve("AI service is unavailable. Please write a description manually.");
  try {
    const prompt = `Generate a compelling and professional job description for a "${jobTitle}" position. Include sections for Responsibilities, Qualifications, and Benefits. The tone should be inviting and clear.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating job description:", error);
    return "Failed to generate job description. Please try again or write one manually.";
  }
};

export const generateSampleJobs = async (): Promise<Job[]> => {
    if (!API_KEY) return Promise.resolve([]);
    try {
        const prompt = `Generate a list of 5 diverse and realistic job openings in the tech and business sectors in Dhaka, Bangladesh.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            company: { type: Type.STRING },
                            location: { type: Type.STRING },
                            description: { type: Type.STRING },
                            experience: { type: Type.STRING, description: "e.g., '2-3 years'" },
                            ageRequirement: { type: Type.STRING, description: "e.g., '25-35 years'" }
                        }
                    }
                }
            }
        });

        const jobData = JSON.parse(response.text);
        
        return jobData.map((job: any, index: number) => ({
            ...job,
            id: `job-${Date.now()}-${index}`,
            deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
            postedDate: new Date().toISOString().split('T')[0],
        }));

    } catch (error) {
        console.error("Error generating sample jobs:", error);
        return [];
    }
};
