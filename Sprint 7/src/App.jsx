import React from 'react'
import WizardShell from './components/WizardShell.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

/**
 * App — Root of the tree.
 * ErrorBoundary wraps the wizard so any uncaught render crash
 * surfaces a graceful fallback instead of a blank screen.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <WizardShell />
    </ErrorBoundary>
  )
}
