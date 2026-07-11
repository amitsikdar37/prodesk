import './App.css'

import { useCoverLetter } from './hooks/useCoverLetter'

import { parseMarkdownToHTML } from './utils/markdownParser'

function App() {

  const {
    formData,
    coverLetter,
    isCopied,
    isLoading,
    resumeFileName,
    isExtracting,
    isDragActive,
    handleInputChange,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleRemoveResume,
    handleSubmit,
    copyCoverLetter
  } = useCoverLetter();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AI Cover Letter Generator</h1>
        <p className="app-subtitle">
          Generate premium, customized cover letters in seconds. Fill in the details below to view and copy your template.
        </p>
      </header>

      <main className="app-content-grid">

        <section className="glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
              </svg>
              Details Form
            </h2>
            <p className="card-subtitle">Provide details to construct your personalized cover letter</p>
          </div>

          <form className="cover-letter-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="candidateName" className="form-label">
                Candidate Name
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  required
                  id="candidateName"
                  name="candidateName"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Upload Resume (PDF)
              </label>
              
              <input
                type="file"
                id="resume-upload"
                accept="application/pdf"
                className="file-input-hidden"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {resumeFileName ? (
                <div className="resume-file-badge">
                  <div className="resume-file-info">
                    <svg className="file-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="file-name" title={resumeFileName}>
                      {resumeFileName}
                    </span>
                    {isExtracting && <span className="extracting-indicator">Parsing...</span>}
                    {!isExtracting && <span className="extracted-badge">Extracted</span>}
                  </div>
                  <button 
                    type="button" 
                    className="btn-remove-file" 
                    onClick={handleRemoveResume}
                    aria-label="Remove uploaded resume"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label 
                  htmlFor="resume-upload" 
                  className={`resume-dropzone ${isDragActive ? 'dropzone-active' : ''} ${isExtracting ? 'extracting' : ''}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  {isExtracting ? (
                    <div className="dropzone-loading">
                      <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Extracting resume text...</span>
                    </div>
                  ) : (
                    <div className="dropzone-content">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="dropzone-title">Drag & drop your resume PDF here</span>
                      <span className="dropzone-subtitle">or click to browse files</span>
                    </div>
                  )}
                </label>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="jobRole" className="form-label">
                Job Role
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <input
                  type="text"
                  required
                  id="jobRole"
                  name="jobRole"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="e.g. Frontend Engineer"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="targetCompany" className="form-label">
                Target Company
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="9" y1="22" x2="9" y2="16" />
                  <line x1="15" y1="22" x2="15" y2="16" />
                  <line x1="9" y1="16" x2="15" y2="16" />
                  <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01" />
                </svg>
                <input
                  type="text"
                  required
                  id="targetCompany"
                  name="targetCompany"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="e.g. Google"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="keySkills" className="form-label">
                Key Skills
              </label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" style={{ alignSelf: 'flex-start', marginTop: '0.85rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <textarea
                  id="keySkills"
                  required
                  name="keySkills"
                  className="form-input"
                  onChange={handleInputChange}
                  placeholder="e.g. React, JavaScript, Responsive Design, CSS"
                />
              </div>
            </div>

            {isLoading ? (
              <button type="submit" className="btn-submit" disabled={true}>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '0.5rem' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                Generate Cover Letter
              </button>
            )}
          </form>
        </section>

        <section className="glass-card preview-card">
          <div className="card-header">
            <div className="preview-header-actions">
              <div>
                <h2 className="card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Letter Template
                </h2>
                <p className="card-subtitle">Visual representation of your cover letter</p>
              </div>

              {isCopied ? (
                <button type="button" className="btn-copy copied" aria-label="Copied to Clipboard">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </button>
              ) : (
                <button type="button" className="btn-copy" aria-label="Copy to Clipboard" onClick={copyCoverLetter}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </button>
              )}

          </div>
        </div>

        {coverLetter ? (
          <div className="document-canvas">
            <div className="cover-letter-html">
              {parseMarkdownToHTML(coverLetter).map((paragraph, index) => (
                <p 
                  key={index} 
                  className="cover-letter-paragraph" 
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-preview-container">
            <div className="empty-preview-icon-wrapper">
              <svg className="empty-preview-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <h3 className="empty-preview-title">Your Cover Letter Awaits</h3>
            <p className="empty-preview-message">
              Complete the details form on the left and click the generate button to preview your custom letter.
            </p>
            <div className="empty-preview-hint">
              <span className="hint-dot"></span> Ready for generation
            </div>
          </div>
        )}

      </section>

    </main>

  <footer className="app-footer">
    <p className="footer-text">
      Double-check variables inside the <code>document-canvas</code> template before exporting.
    </p>
  </footer>
    </div>
  )
}

export default App
