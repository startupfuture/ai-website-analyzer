
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. Please ensure it is configured.");
  // Potentially throw an error or handle this state in the UI
  // For this example, we'll let calls fail and be caught by the calling function.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion, assuming API_KEY will be set in deployment

const MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const analyzeWebsite = async (url: string): Promise<AnalysisResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }
  const prompt = `
    Analyze the website with the URL: ${url}. Act as an expert web consultant.
    Provide a detailed analysis and recommendations for improvement across the following categories:
    1. User Experience (UX): Focus on usability, navigation, accessibility, and overall user satisfaction.
    2. Web Design: Evaluate aesthetics, visual hierarchy, branding consistency, and modern design principles.
    3. SEO Optimization: Suggest improvements for search engine visibility, including on-page and technical SEO aspects.
    4. Product/Service Attractiveness: If the site appears to offer products or services, assess how well they are presented to attract visitors and convert them. Consider clarity of value proposition, calls to action, and presentation.

    Please format your response strictly as a JSON object with the following structure:
    {
      "ux_recommendations": [{"title": "Recommendation Title", "description": "Detailed description of the recommendation."}],
      "design_recommendations": [{"title": "Recommendation Title", "description": "Detailed description of the recommendation."}],
      "seo_recommendations": [{"title": "Recommendation Title", "description": "Detailed description of the recommendation."}],
      "product_attractiveness_recommendations": [{"title": "Recommendation Title", "description": "Detailed description of the recommendation."}]
    }

    If the website URL seems invalid or inaccessible from your perspective, or if a category is not applicable (e.g., no clear products/services for the 'product_attractiveness_recommendations'), provide an empty array for that category or a brief note within a recommendation's description field.
    Ensure each category has at least one recommendation, even if it's a general best practice or a note about non-applicability.
    Focus on actionable and specific advice.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, // Adjust for creativity vs. factualness
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }
    
    const parsedData = JSON.parse(jsonStr) as AnalysisResult;

    // Basic validation of the parsed data structure
    if (
      !parsedData.ux_recommendations || !Array.isArray(parsedData.ux_recommendations) ||
      !parsedData.design_recommendations || !Array.isArray(parsedData.design_recommendations) ||
      !parsedData.seo_recommendations || !Array.isArray(parsedData.seo_recommendations) ||
      !parsedData.product_attractiveness_recommendations || !Array.isArray(parsedData.product_attractiveness_recommendations)
    ) {
      throw new Error("Parsed JSON data does not match the expected AnalysisResult structure.");
    }
    
    return parsedData;

  } catch (error) {
    console.error("Error analyzing website with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze website: ${error.message}`);
    }
    throw new Error("An unknown error occurred during website analysis.");
  }
};
