import React from 'react'
import WizardShell from './components/WizardShell.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

export default function App() {
  return (
    <ErrorBoundary>
      <WizardShell />
    </ErrorBoundary>
  )
}
