import { useState, useEffect } from 'react';
import { caseApi, Case } from '../services/cases';

export const useCaseDetail = (caseId?: string) => {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) {
      setLoading(false);
      return;
    }
    const fetchOne = async () => {
      try {
        setLoading(true);
        const data = await caseApi.getCaseById(caseId);
        setCaseData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch case details');
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [caseId]);

  return { caseData, loading, error };
};