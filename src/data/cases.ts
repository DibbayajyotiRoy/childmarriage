// The interface defines the shape of our case data
export interface Case {
    id: string;
    reporterName: string;
    location: {
      village: string;
      district: string;
      state: string;
    };
    issueDate: string;
    details: string;
    status: 'Reported' | 'Under Investigation' | 'Resolved';
  }
  
  // The dummy data we will use across the app
  export const dummyCases: Case[] = [
    {
      id: 'case-001',
      reporterName: 'Asha Sharma',
      location: {
        village: 'Rampur',
        district: 'Jaipur',
        state: 'Rajasthan',
      },
      issueDate: '2023-10-26T10:00:00Z',
      details: 'A report was received about a potential child marriage ceremony being planned for a 15-year-old girl in the Rampur village. The family is being pressured by community elders. Immediate intervention is required.',
      status: 'Under Investigation',
    },
    {
      id: 'case-002',
      reporterName: 'Vijay Singh',
      location: {
        village: 'Belur',
        district: 'Howrah',
        state: 'West Bengal',
      },
      issueDate: '2023-10-22T15:30:00Z',
      details: 'A teacher from the local school reported that one of his students, a 16-year-old boy, has not been attending classes for a week and has been engaged to be married.',
      status: 'Reported',
    },
    {
      id: 'case-003',
      reporterName: 'Anonymous',
      location: {
        village: 'Anantapur',
        district: 'Anantapur',
        state: 'Andhra Pradesh',
      },
      issueDate: '2023-09-15T09:00:00Z',
      details: 'The marriage of a 14-year-old girl was successfully stopped by local authorities after an anonymous tip-off. The girl is now in a state-run shelter and receiving counseling.',
      status: 'Resolved',
    },
  ];