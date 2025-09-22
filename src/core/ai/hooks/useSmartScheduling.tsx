import { useState, useEffect, useCallback, useRef } from 'react';
import type { SmartSuggestion, ConflictWarning } from '../SmartSuggestionsPanel';

interface UseSmartSchedulingOptions {
  enableCaching?: boolean;
  debounceMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}

interface UseSmartSchedulingReturn {
  suggestions: SmartSuggestion[];
  conflicts: ConflictWarning[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  analyzeTimes: (patientId: string, doctorId: string, departmentId?: string) => Promise<void>;
  checkConflicts: (date: string, time: string, doctorId: string) => Promise<void>;
  clearCache: () => void;
  retry: () => void;
}

const useSmartScheduling = (options: UseSmartSchedulingOptions = {}): UseSmartSchedulingReturn => {
  const {
    enableCaching = true,
    debounceMs = 300,
    maxRetries = 3,
    retryDelayMs = 1000
  } = options;

  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [conflicts, setConflicts] = useState<ConflictWarning[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Cache and request management
  const cacheRef = useRef(new Map<string, { data: SmartSuggestion[]; timestamp: number }>());
  const conflictCacheRef = useRef(new Map<string, { data: ConflictWarning[]; timestamp: number }>());
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  const lastRequestRef = useRef<{ fn: () => Promise<void>; args: any[] } | null>(null);

  // Debounced function refs
  const analyzeTimesDebounced = useRef<NodeJS.Timeout>();
  const checkConflictsDebounced = useRef<NodeJS.Timeout>();

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Clear cache utility
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    conflictCacheRef.current.clear();
  }, []);

  // Create cache key
  const createCacheKey = useCallback((prefix: string, ...args: any[]) => {
    return `${prefix}-${args.join('-')}`;
  }, []);

  // Get cached data
  const getCachedData = useCallback(<T,>(
    cache: Map<string, { data: T; timestamp: number }>,
    key: string
  ): T | null => {
    if (!enableCaching) return null;
    
    const cached = cache.get(key);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    if (isExpired) {
      cache.delete(key);
      return null;
    }
    
    return cached.data;
  }, [enableCaching]);

  // Set cached data
  const setCachedData = useCallback(<T,>(
    cache: Map<string, { data: T; timestamp: number }>,
    key: string,
    data: T
  ) => {
    if (!enableCaching) return;
    cache.set(key, { data, timestamp: Date.now() });
  }, [enableCaching]);

  // Retry mechanism
  const retry = useCallback(async () => {
    if (lastRequestRef.current && retryCountRef.current < maxRetries) {
      retryCountRef.current++;
      setError(null);
      
      setTimeout(async () => {
        try {
          await lastRequestRef.current!.fn();
        } catch (err) {
          console.error('Retry failed:', err);
        }
      }, retryDelayMs);
    }
  }, [maxRetries, retryDelayMs]);

  // Error handling utility
  const handleError = useCallback((err: any, context: string) => {
    console.error(`Smart Scheduling Error (${context}):`, err);
    
    if (err.name === 'AbortError') {
      return; // Don't show error for cancelled requests
    }
    
    const errorMessage = err.message || `Failed to ${context}. Please try again.`;
    setError(errorMessage);
    setLoading(false);
  }, []);

  // Mock API call with error handling and caching
  const mockApiCall = useCallback(async <T,>(
    fn: () => Promise<T>,
    cacheKey: string,
    cache: Map<string, { data: T; timestamp: number }>,
    context: string
  ): Promise<T> => {
    // Check cache first
    const cached = getCachedData(cache, cacheKey);
    if (cached) {
      return cached;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      const result = await fn();
      setCachedData(cache, cacheKey, result);
      retryCountRef.current = 0; // Reset retry count on success
      return result;
    } catch (err: any) {
      if (!abortControllerRef.current.signal.aborted) {
        handleError(err, context);
      }
      throw err;
    }
  }, [getCachedData, setCachedData, handleError]);

  // Analyze optimal times with performance optimizations
  const analyzeTimes = useCallback(async (
    patientId: string, 
    doctorId: string, 
    departmentId?: string
  ) => {
    if (!patientId || !doctorId) return;

    // Clear existing debounce
    if (analyzeTimesDebounced.current) {
      clearTimeout(analyzeTimesDebounced.current);
    }

    // Store request for retry
    lastRequestRef.current = {
      fn: () => analyzeTimes(patientId, doctorId, departmentId),
      args: [patientId, doctorId, departmentId]
    };

    analyzeTimesDebounced.current = setTimeout(async () => {
      const cacheKey = createCacheKey('suggestions', patientId, doctorId, departmentId);
      
      setLoading(true);
      setError(null);

      try {
        const result = await mockApiCall(
          async () => {
            // Simulate network delay and potential error
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // Simulate occasional API errors for testing
            if (Math.random() < 0.1) {
              throw new Error('Service temporarily unavailable');
            }

            const mockSuggestions: SmartSuggestion[] = [
              {
                id: 'sugg-1',
                date: new Date().toISOString().split('T')[0],
                time: '10:30 AM',
                score: 95,
                confidence: 92,
                doctorMatch: 98,
                patientPreference: 85,
                departmentLoad: 30,
                waitTimeMinutes: 5,
                reasons: [
                  'Doctor peak performance time',
                  'Low no-show risk for this patient',
                  'Optimal department capacity'
                ]
              },
              {
                id: 'sugg-2',
                date: new Date().toISOString().split('T')[0],
                time: '2:00 PM',
                score: 87,
                confidence: 88,
                doctorMatch: 90,
                patientPreference: 92,
                departmentLoad: 45,
                waitTimeMinutes: 12,
                reasons: [
                  'Patient historical preference',
                  'Good doctor availability',
                  'Moderate waiting time'
                ]
              },
              {
                id: 'sugg-3',
                date: new Date().toISOString().split('T')[0],
                time: '11:15 AM',
                score: 82,
                confidence: 78,
                doctorMatch: 85,
                patientPreference: 75,
                departmentLoad: 60,
                waitTimeMinutes: 18,
                reasons: [
                  'Available slot',
                  'Acceptable wait time'
                ],
                warnings: ['Higher than usual department load']
              }
            ];

            return mockSuggestions;
          },
          cacheKey,
          cacheRef.current,
          'analyze optimal times'
        );

        setSuggestions(result);
        setLastUpdated(new Date());
      } catch (err) {
        // Error already handled in mockApiCall
      } finally {
        setLoading(false);
      }
    }, debounceMs);
  }, [debounceMs, createCacheKey, mockApiCall]);

  // Check conflicts with performance optimizations
  const checkConflicts = useCallback(async (
    date: string, 
    time: string, 
    doctorId: string
  ) => {
    if (!date || !time || !doctorId) {
      setConflicts([]);
      return;
    }

    // Clear existing debounce
    if (checkConflictsDebounced.current) {
      clearTimeout(checkConflictsDebounced.current);
    }

    checkConflictsDebounced.current = setTimeout(async () => {
      const cacheKey = createCacheKey('conflicts', date, time, doctorId);

      try {
        const result = await mockApiCall(
          async () => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Simulate occasional API errors
            if (Math.random() < 0.05) {
              throw new Error('Conflict check service unavailable');
            }

            const mockConflicts: ConflictWarning[] = [];
            
            if (time === '12:00 PM' || time === '1:00 PM') {
              mockConflicts.push({
                type: 'warning',
                message: 'Doctor lunch break (12:00 PM - 1:00 PM)',
                suggestions: ['Try 11:30 AM', 'Try 1:30 PM']
              });
            }
            
            if (date === new Date().toISOString().split('T')[0] && time.includes('AM')) {
              mockConflicts.push({
                type: 'info',
                message: 'Same-day morning appointments have higher no-show rates',
                suggestions: ['Consider afternoon slot', 'Send reminder SMS']
              });
            }

            return mockConflicts;
          },
          cacheKey,
          conflictCacheRef.current,
          'check conflicts'
        );

        setConflicts(result);
      } catch (err) {
        // Error already handled in mockApiCall
        setConflicts([]);
      }
    }, debounceMs);
  }, [debounceMs, createCacheKey, mockApiCall]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (analyzeTimesDebounced.current) {
        clearTimeout(analyzeTimesDebounced.current);
      }
      if (checkConflictsDebounced.current) {
        clearTimeout(checkConflictsDebounced.current);
      }
    };
  }, []);

  return {
    suggestions,
    conflicts,
    loading,
    error,
    lastUpdated,
    analyzeTimes,
    checkConflicts,
    clearCache,
    retry
  };
};

export default useSmartScheduling;
