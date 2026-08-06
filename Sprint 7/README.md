# Multi-Step Onboarding Wizard

A modern, responsive multi-step onboarding wizard built with React. This project demonstrates enterprise-grade form architecture, featuring robust state management, client-side validation, and a polished user experience.

## Features

- **Multi-Step Flow:** Segments data collection into distinct, localized views (Personal Info, Account Details, Review & Submit) to prevent user overwhelm.
- **State Persistence:** Uses a unified state object lifted to the parent shell, ensuring user data is preserved flawlessly during view transitions (Back/Next).
- **Robust Validation:** Integrated with `react-hook-form` and `zod` for type-safe, schema-driven validation.
  - Live character counting.
  - Custom complex date validation (e.g., minimum age, no future dates).
  - Cross-field validation (e.g., matching passwords).
- **UX Enhancements:**
  - Dynamic password strength meter (Weak, Fair, Good, Strong).
  - Cosmetic show/hide password toggles using inline SVGs.
  - "Touched" state logic prevents hostile premature validation errors.
- **Simulated API Submission:** Demonstrates network latency and failure handling with loading spinners and inline error banners.
- **Clean Architecture:** Flat component tree respecting YAGNI principles. No complex context providers or custom hooks unless strictly necessary.

## Tech Stack

- **Framework:** React + Vite
- **Form Management:** React Hook Form
- **Schema Validation:** Zod (@hookform/resolvers/zod)
- **Styling:** Vanilla CSS (no heavy utility frameworks)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/` (or the port specified in your terminal).

## Project Structure

- `src/components/WizardShell.jsx`: The parent container managing the overall form state and step orchestration.
- `src/components/StepPersonal.jsx`: Step 1 - Captures and validates personal information.
- `src/components/StepAccount.jsx`: Step 2 - Captures credentials, includes password strength and visibility toggles.
- `src/components/StepReview.jsx`: Step 3 - Displays a summary and handles final submission state.
- `src/components/ProgressBar.jsx`: Visual indicator of current progress.
- `src/components/ErrorBoundary.jsx`: React class component for graceful crash handling.
- `src/schema.js`: The single source of truth for all Zod validation schemas.
- `src/index.css`: Global styles and custom UI components (buttons, inputs, banners).

## Architecture Notes

- **Validation:** Moved from manual pure functions to a centralized `zod` schema in Phase 3. This ensures that the `WizardShell` only ever receives clean, valid data.
- **Form State:** `react-hook-form` handles isolated field re-renders internally. The parent `formData` acts as a seed for `defaultValues` to enable back-navigation pre-filling.
- **Styling:** The design prioritizes visual excellence with curated colors, smooth transitions, and distinct error states without relying on external UI libraries.
