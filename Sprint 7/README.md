# The Registration Wizard (Sprint 7)

A modern, multi-step enterprise onboarding wizard built with React. This project demonstrates advanced state management across localized views, real-time validation, and a premium "glassmorphism" aesthetic.

## 🚀 Features

- **Multi-Step Architecture**: A clean 3-step wizard (Personal Info ➔ Account Details ➔ Review & Submit).
- **Enterprise Form State**: Utilizes `react-hook-form` to lift and manage form payloads efficiently without unnecessary re-renders.
- **Robust Type-Safe Validation**: Integrates `zod` schema validation for real-time `onChange` feedback (e.g., dynamic regex matching, minimum lengths, matching passwords).
- **Conditional Progression**: "Next" actions remain conditionally disabled until the local fields of the current view clear schema validation.
- **Rich Aesthetics**: Premium styling using Vanilla CSS with interactive micro-animations, glassmorphism effects, and dynamic progress indicators.
- **UX Polish**: Seamless show/hide password toggles (using `lucide-react`) and responsive review panels.

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite (Build Tool)
- React Hook Form (State Management)
- Zod (Schema Validation)
- Lucide React (Icons)
- Vanilla CSS (Styling)

## 📦 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📋 Module Breakdown

- `src/App.tsx`: The parent orchestrator handling the step progression, progress bar, and the unified `FormProvider`.
- `src/schema.ts`: The unified `zod` schema validating the payload at every step.
- `src/components/PersonalInfo.tsx`: Captures First Name, Last Name, and Date of Birth.
- `src/components/AccountDetails.tsx`: Captures Email, Password, and Confirm Password with masking toggles.
- `src/components/ReviewSubmit.tsx`: Renders a localized summary of the captured unified payload for final review.
- `src/index.css`: Contains the overarching design system variables and glassmorphism styling.
