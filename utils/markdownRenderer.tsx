// Simple markdown renderer for chatbot responses
export const renderMarkdown = (text: string): JSX.Element => {
  // Split text into lines for processing
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  
  lines.forEach((line, index) => {
    if (!line.trim()) {
      // Empty line - add spacing
      elements.push(<br key={`br-${index}`} />);
      return;
    }
    
    // Process bullet points
    if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
      const content = line.replace(/^[\s]*[\*\-][\s]*/, '');
      const processedContent = processBoldText(content);
      elements.push(
        <div key={index} className="flex items-start gap-2 my-1">
          <span className="text-indigo-600 font-bold mt-0.5">•</span>
          <span>{processedContent}</span>
        </div>
      );
      return;
    }
    
    // Process numbered lists
    if (/^\d+\./.test(line.trim())) {
      const processedContent = processBoldText(line);
      elements.push(
        <div key={index} className="my-1 ml-2">
          {processedContent}
        </div>
      );
      return;
    }
    
    // Regular line with bold text processing
    const processedContent = processBoldText(line);
    elements.push(
      <div key={index} className="my-1">
        {processedContent}
      </div>
    );
  });
  
  return <div>{elements}</div>;
};

// Process bold text (**text** or *text*)
const processBoldText = (text: string): JSX.Element => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Bold text with **
          return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          // Bold text with single *
          return <strong key={index} className="font-bold text-slate-900">{part.slice(1, -1)}</strong>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};