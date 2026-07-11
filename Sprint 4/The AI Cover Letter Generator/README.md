# AI Cover Letter Generator

Generate highly personalized, premium cover letters in seconds using the power of AI. Simply provide your details and a PDF version of your resume, and let our intelligent engine craft the perfect pitch for your next job application.

### 🌐 [Live Demo](https://prodesk-rqor-lylnzjd1c-amitsikdar37s-projects.vercel.app/)

---

## 📸 Preview

![App Screenshot](./public/Screenshot%202026-07-11%20103921.png)

---

## ✨ Features

- **Automated Personalization**: Input your target role, company, and skills to generate a tailored cover letter.
- **PDF Resume Parsing**: Upload your existing resume (PDF) via drag-and-drop. The app automatically extracts the text and incorporates your real experience into the cover letter.
- **Premium Glassmorphism UI**: A beautiful, modern, and highly responsive interface designed for excellent user experience.
- **Gemini AI Integration**: Uses Google's advanced Generative AI to structure and write professional cover letters.
- **Instant Copy-to-Clipboard**: Easily preview and copy your generated HTML/Markdown cover letter template directly from the built-in document canvas.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System with Glassmorphism aesthetics)
- **AI Engine**: `@google/generative-ai` (Gemini API)
- **PDF Extraction**: `react-pdftotext` (Client-side native parsing)
- **Hosting**: [Vercel](https://vercel.com)

---

## 🚀 Local Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd "The AI Cover Letter Generator"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
