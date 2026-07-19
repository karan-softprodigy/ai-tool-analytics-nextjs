'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  status: Status;
}

/**
 * Fetches JSON from a same-origin API route and tracks status/data/error.
 * Re-runs when `deps` changes; a request-id ref discards stale responses
 * from superseded requests (relevant when filters change quickly).
 */
export function useApiData<T>(url: string, deps: unknown[] = []): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, status: 'idle' });
  const requestId = useRef(0);

  const run = useCallback(() => {
    const currentRequestId = ++requestId.current;
    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    fetch(url)
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? 'Request failed.');
        return body as T;
      })
      .then((data) => {
        if (currentRequestId === requestId.current) {
          setState({ data, error: null, status: 'success' });
        }
      })
      .catch((error: Error) => {
        if (currentRequestId === requestId.current) {
          setState({ data: null, error: error.message, status: 'error' });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run };
}
