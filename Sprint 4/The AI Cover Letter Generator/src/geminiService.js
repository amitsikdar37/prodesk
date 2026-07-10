import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apikey);

export const generateCoverLetter = async (candidateName, jobRole, targetCompany, keySkills) => {

    const prompt = `Generate a professional cover letter using the following details:
    - Candidate Name: ${candidateName}
    - Job Role: ${jobRole}
    - Target Company: ${targetCompany}
    - Key Skills: ${keySkills}

    - Begin the cover letter directly with the salutation (e.g. "Dear Hiring Team at ${targetCompany || 'your company'}," or similar).
    - Do NOT include any header placeholders, contact information sections, or dates at the top (such as "[Your Name]", "[Your Address]", "[Your Phone Number]", "[Your Email Address]", or "[Date]").
    - Do NOT use markdown bold tags or any markdown notation (specifically, do NOT use double asterisks "**" anywhere). The output should be plain text.
    - Do NOT include bracketed placeholders in the body of the letter (e.g., do not output things like "[Platform where you saw the advertisement]"). If information is missing, write a natural, complete sentence without placeholders.
    - Highlight the candidate's key skills (${keySkills}) naturally within the body.
    - End with a formal closing and the candidate's name (${candidateName}) directly, without placeholder text like "[Your Name]".`

    try{
      const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});
      const result = await model.generateContent(prompt);
      const textResponse = result.response.text();

      return textResponse;
    } catch(error) {
      console.log(error);
    }
};