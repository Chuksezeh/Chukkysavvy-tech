
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-5X8H5VLJTQ', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}

export default usePageTracking;
