// Optimized utility for back/forward cache (bfcache) compatibility
export function optimizeBfcache() {
  if (typeof window === 'undefined') return;
  
  // Track and cleanup WebSockets and other resources
  const cleanup = () => {
    // Close any WebSocket connections
    try {
      // @ts-ignore - Check for Next.js dev WebSocket
      if (window._nextWebsocket) {
        // @ts-ignore
        window._nextWebsocket.close();
        // @ts-ignore
        delete window._nextWebsocket;
      }
      
      // Cleanup any active fetch requests
      // @ts-ignore
      if (window._activeRequests) {
        // @ts-ignore
        window._activeRequests.forEach((controller: AbortController) => {
          controller.abort();
        });
        // @ts-ignore
        window._activeRequests.clear();
      }
      
      // Cleanup any timers or intervals
      // @ts-ignore
      if (window._activeTimers) {
        // @ts-ignore
        window._activeTimers.forEach(clearTimeout);
        // @ts-ignore
        window._activeTimers.clear();
      }
    } catch (e) {
      // Silently ignore cleanup errors
    }
  };
  
  // Initialize cleanup tracking
  // @ts-ignore
  window._activeRequests = window._activeRequests || new Set();
  // @ts-ignore
  window._activeTimers = window._activeTimers || new Set();
  
  // Setup bfcache-friendly event listeners
  window.addEventListener('pagehide', cleanup, { passive: true, once: true });
  window.addEventListener('beforeunload', cleanup, { passive: true, once: true });
}

// Track AbortController instances for cleanup
export function createBfcacheFriendlyRequest(url: string, options?: RequestInit) {
  const controller = new AbortController();
  
  // @ts-ignore
  if (!window._activeRequests) {
    // @ts-ignore
    window._activeRequests = new Set();
  }
  
  // @ts-ignore
  window._activeRequests.add(controller);
  
  const requestOptions = {
    ...options,
    signal: controller.signal,
    headers: {
      ...options?.headers,
      'Cache-Control': 'public, max-age=300', // Avoid no-store
    },
  };
  
  return fetch(url, requestOptions).finally(() => {
    // @ts-ignore
    window._activeRequests?.delete(controller);
  });
}