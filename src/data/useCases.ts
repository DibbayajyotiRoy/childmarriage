import { useState, useEffect } from 'react';
import { caseApi, Case } from '../services/cases';

export const useCases = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await caseApi.getAllCases();
        setCases(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cases');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { cases, loading, error };
};