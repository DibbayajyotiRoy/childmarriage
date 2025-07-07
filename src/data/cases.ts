// Define a formal type for our Case object for better code intelligence.
export interface Case {
  id: string;
  status: 'Reported' | 'Under Investigation' | 'Resolved';
  location: {
    village: string;
    district: string;
    state: string;
  };
  issueDate: string;
  // NEW: The date of the impending marriage.
  marriageDate: string; 
  reporterName: string;
  details: string;
}

// Updated dummy data with the new marriageDate field.
export const dummyCases: Case[] = [
  {
    id: 'CM-RJ-2024-001',
    status: 'Under Investigation', // This case is already active.
    location: { village: 'Alipur', district: 'Jaipur', state: 'Rajasthan' },
    issueDate: '2024-05-10T10:00:00.000Z',
    marriageDate: '2024-05-20T00:00:00.000Z', // In the past
    reporterName: 'Asha Singh',
    details: 'A 15-year-old girl is being forced into marriage...',
  },
  {
    id: 'CM-AP-2024-002',
    status: 'Resolved', // This case is finished.
    location: { village: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh' },
    issueDate: '2024-04-22T10:00:00.000Z',
    marriageDate: '2024-05-01T00:00:00.000Z', // In the past
    reporterName: 'Anonymous',
    details: 'The wedding was successfully stopped...',
  },
  {
    id: 'CM-UP-2024-003',
    status: 'Reported', // NEW CASE: Marriage date is in the future.
    location: { village: 'Bari', district: 'Agra', state: 'Uttar Pradesh' },
    issueDate: '2024-05-20T10:00:00.000Z',
    // This will result in a "Pending Investigation" status until this date.
    marriageDate: '2024-12-15T00:00:00.000Z', 
    reporterName: 'Local NGO',
    details: 'Report of a planned child marriage for a 16-year-old...',
  },
  {
    id: 'CM-MP-2024-004',
    status: 'Reported', // NEW CASE: Marriage date is in the past.
    location: { village: 'Rewa', district: 'Rewa', state: 'Madhya Pradesh' },
    issueDate: '2024-05-18T10:00:00.000Z',
    // This will automatically become "Under Investigation".
    marriageDate: '2024-05-25T00:00:00.000Z',
    reporterName: 'School Teacher',
    details: 'A student has been absent, and we suspect an arranged marriage...',
  },
];