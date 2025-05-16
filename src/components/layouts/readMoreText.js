import { useState } from 'react';


const ReadMoreText = ({ text, maxWords = 50 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Split text into words
  const words = text.split(/\s+/);
  
  // Check if text needs to be truncated
  const needsTruncation = words.length > maxWords;
  
  // Get truncated text
  const truncatedText = needsTruncation 
    ? words.slice(0, maxWords).join(' ') + '...'
    : text;
  
  return (
    <div>
      <p>{isExpanded ? text : truncatedText}</p>
      {needsTruncation && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            color: '#011B58',
            background: 'none',
            border: 'none',
            fontWeight:"bold",
            cursor: 'pointer',
            padding: 0,
            // textDecoration: 'underline'
          }}
        >
          {isExpanded ? 'Read less' : 'Read more...'}
        </button>
      )}
    </div>
  );
};

// Example usage:
// <ReadMoreText text="Your long text goes here..." />

export default ReadMoreText