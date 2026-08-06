import React from 'react'

/**
 * ProgressBar — shows "Step X of Y" + a filled bar.
 * Receives current step and total as plain numbers; no internal state.
 */
export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)

  const stepLabels = ['Personal Info', 'Account Details', 'Review & Submit']

  return (
    <div className="progress-wrap" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      <div className="progress-meta">
        <span className="progress-label">
          Step {current} of {total}
        </span>
        <span className="progress-step-name">
          {stepLabels[current - 1] || ''}
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="progress-dots">
        {Array.from({ length: total }, (_, i) => {
          const num = i + 1
          let dotClass = 'progress-dot'

          if (num < current) dotClass += ' dot-done'
          if (num === current) dotClass += ' dot-active'

          return (
            <span key={num} className={dotClass} aria-hidden="true">
              {num < current ? '✓' : num}
            </span>
          )
        })}
      </div>
    </div>
  )
}
