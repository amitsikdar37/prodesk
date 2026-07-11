import { useState } from 'react';
import { generateCoverLetter } from '../geminiService';
import pdfToText from 'react-pdftotext';

export const useCoverLetter = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    jobRole: '',
    targetCompany: '',
    keySkills: ''
  });

  const [coverLetter, setCoverLetter] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [resumeText, setResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResumeUpload = async (file) => {
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    try {
      setIsExtracting(true);
      setResumeFileName(file.name);
      const text = await pdfToText(file);
      setResumeText(text);
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      alert('Failed to parse PDF file. Please try again.');
      setResumeFileName('');
      setResumeText('');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleResumeUpload(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResumeUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveResume = () => {
    setResumeText('');
    setResumeFileName('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const generatedLetter = await generateCoverLetter(
        formData.candidateName, 
        formData.jobRole,
        formData.targetCompany, 
        formData.keySkills,
        resumeText
      );
      
      setCoverLetter(generatedLetter);
    } catch (error) {
      console.error('Error generating cover letter: ', error)
    } finally {
      setLoading(false);
    }
  }; 

  const copyCoverLetter = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      console.log('Failed to copy cover letter')
    }
  };

  return {
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
  };
};
