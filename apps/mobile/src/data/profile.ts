export type StudentProfile = {
  name: string;
  initials: string;
  email: string;
  year: string;
  role: string;
  academic: { label: string; value: string }[];
};

// Example data until the student profile is provided by the backend.
export const exampleProfile: StudentProfile = {
  name: 'Alex Martin',
  initials: 'AM',
  email: 'alex.martin@epimobility.com',
  year: 'Year 4',
  role: 'Student',
  academic: [
    { label: 'GPA', value: '3.6 / 4' },
    { label: 'English level', value: 'TOEIC 950' },
    { label: 'Associative life', value: '14 / 20' },
    { label: 'Personal project', value: 'Yes' },
  ],
};
