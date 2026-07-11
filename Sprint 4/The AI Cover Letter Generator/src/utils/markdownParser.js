export const parseMarkdownToHTML = (markdownText) => {
  if (!markdownText) return [];
  
  const paragraphs = markdownText.split(/\n\s*\n/).filter(p => p.trim() !== '');
  
  return paragraphs.map(p => {
    let html = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\n/g, '<br />');
    return html;
  });
};
