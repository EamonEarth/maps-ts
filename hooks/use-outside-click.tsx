import { useEffect, useRef } from 'react';

function useOutsideClick(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // If the clicked element is not inside the referenced element, call the handler
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    // Bind the event listeners to the document
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
