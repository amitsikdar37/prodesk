import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apikey);

export const generateCoverLetter = async (candidateName, jobRole, targetCompany, keySkills, resumeText = "") => {

    let prompt = `Generate a professional cover letter using the following details:
    - Candidate Name: ${candidateName}
    - Job Role: ${jobRole}
    - Target Company: ${targetCompany}
    - Key Skills: ${keySkills}`;

    if (resumeText) {
      prompt += `\n    - Extracted Resume Context:\n${resumeText}\n`;
    }

    prompt += `\n    Strict Instructions:
    - Begin the cover letter directly with the salutation (e.g. "Dear Hiring Team at ${targetCompany || 'your company'}," or similar).
    - Do NOT include any header placeholders, contact information blocks, or dates at the top (such as "[Your Name]", "[Your Address]", "[Your Phone Number]", "[Your Email Address]", or "[Date]").
    - Do NOT include bracketed placeholders in the body of the letter (e.g., do not output things like "[Platform where you saw the advertisement]" or "[Insert dynamic details]"). If information is missing, write a natural, complete sentence without placeholders.
    - Highlight the candidate's key skills (${keySkills}) and draw relevant experiences/accomplishments from their resume context if provided to make it highly tailored.
    - Separate paragraphs with double newlines (\\n\\n) so that it can be parsed into separate HTML paragraphs.
    - You may use standard markdown bold (**term**) to emphasize key qualifications or technical skills, but keep it professional.
    - End with a formal closing and the candidate's name (${candidateName}) directly, without placeholder text like "[Your Name]".`;

    try{
      const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});
      const result = await model.generateContent(prompt);
      const textResponse = result.response.text();

      return textResponse;
    } catch(error) {
      console.log(error);
    }
};