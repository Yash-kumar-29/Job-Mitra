import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Gemini client with error handling for missing API key
let genAI;
try {
  if (!process.env.GEMINI_API_KEY) {
    console.error("[GEMINI_ERROR] GEMINI_API_KEY is not set in environment variables");
  }
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error("[GEMINI_INIT_ERROR]", error);
}

async function generateJobDescription(jobDetails) {
  // Check if Gemini is initialized
  if (!genAI) {
    throw new Error("Gemini API key is not configured. Please check your environment variables.");
  }

  const prompt = `Generate a detailed job description for the following role using the provided data. The response should be in HTML format (Do not use any other tag except h2, p, ul, li, strong, b, em, i, and u. No need to generate doctype or html tag or body tag).

Job Details:
${JSON.stringify(jobDetails, null, 2)}

---

**Job Title:** [Enter a specific and engaging job title within 50-60 characters]

**Company Overview:**
[Provide a comprehensive introduction to your company's culture, values, and mission. Highlight key achievements and goals.]

**Job Summary:**
[Clearly articulate the role's purpose and its significance within the organization. Outline key responsibilities and how they contribute to company success.]

**Responsibilities and Duties:**
- [List main tasks and responsibilities using bullet points. Provide detailed explanations for each.]

**Qualifications and Skills:**
[Specify the required skills, experience, and educational background in detail. Highlight any certifications or specific competencies.]

**Compensation and Benefits:**
[Mention the salary range, bonus structures, and any additional benefits such as health insurance, retirement plans, etc. Provide a comprehensive overview.]

---

*Additional Information:*

**Company Culture Description:**
[Delve into the unique aspects of your company culture. Discuss values, work environment, team collaboration, and any employee engagement initiatives.]

**Growth and Development Opportunities:**
[Detail professional development paths within the role. Mention training programs, mentorship opportunities, and career advancement possibilities.]

---

*Important Notes:(This is instruction for you, don't provide this in the response)*

- Focus on clarity and conciseness; use simple language and avoid jargon.
- Incorporate relevant keywords for search engines and applicant tracking systems.
- Ensure scannability by using bullet points, headings, and white space.
- Be inclusive; use gender-neutral language and avoid discriminatory terms.
- Proofread carefully to eliminate typos or grammatical errors.

`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("[GEMINI_API_ERROR]", error);
    
    // Provide more specific error messages
    if (error.message?.includes("API key")) {
      throw new Error("Invalid Gemini API key. Please check your environment configuration.");
    } else if (error.message?.includes("quota") || error.message?.includes("billing")) {
      throw new Error("Gemini API quota exceeded. Please check your billing and quota limits.");
    } else if (error.statusCode === 429) {
      throw new Error("Gemini API rate limit exceeded. Please try again later.");
    } else {
      throw new Error(`Failed to generate job description: ${error.message || "Unknown error occurred"}`);
    }
  }
}

export { generateJobDescription };


