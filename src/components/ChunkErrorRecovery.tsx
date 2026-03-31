'use client';

import { useEffect } from 'react';

export default function ChunkErrorRecovery() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message || '';
      if (
        msg.includes('module factory is not available') ||
        msg.includes('Loading chunk') ||
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('was instantiated because it was required')
      ) {
        const key = '__chunk_reload';
        const lastReload = sessionStorage.getItem(key);
        const now = Date.now();
        // Only auto-reload once per 30 seconds to avoid infinite loops
        if (!lastReload || now - Number(lastReload) > 30000) {
          sessionStorage.setItem(key, String(now));
          window.location.reload();
        }
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return null;
}
