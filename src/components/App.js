import React, { useRef, useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  // Create a large array of 1000 items
  const totalItems = 1000;
  const items = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  
  // useRef for the scroll container
  const scrollContainerRef = useRef(null);
  
  // State to track visible items
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  
  // Configuration for virtual scrolling
  const itemHeight = 50; // Height of each item in pixels
  const containerHeight = 500; // Height of scroll container
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2; // Items visible + buffer
  
  // Calculate which items should be visible based on scroll position
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      setStartIndex(newStartIndex);
      
      // Calculate visible items
      const endIndex = Math.min(newStartIndex + visibleCount, totalItems);
      const visible = items.slice(newStartIndex, endIndex);
      setVisibleItems(visible);
    }
  };
  
  // Initialize visible items on mount
  useEffect(() => {
    const endIndex = Math.min(visibleCount, totalItems);
    setVisibleItems(items.slice(0, endIndex));
  }, []);
  
  return (
    <div 
      ref={scrollContainerRef}
      className="scroll-container"
      style={{
        height: '500px',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #ccc'
      }}
      onScroll={handleScroll}
    >
      {/* Spacer to maintain scroll height */}
      <div style={{ height: `${totalItems * itemHeight}px`, position: 'relative' }}>
        {/* Render only visible items */}
        <div style={{ position: 'absolute', top: `${startIndex * itemHeight}px`, width: '100%' }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: `${itemHeight}px`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                borderBottom: '1px solid #eee'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
