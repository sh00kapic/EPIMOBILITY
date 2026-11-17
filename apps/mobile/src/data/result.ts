export type MobilityResult = {
  university: string;
  choiceRank: number;
  totalChoices: number;
  score: number;
  comparison: {
    university: string;
    places: number;
    lastAcceptedScore: number;
    note: string;
  } | null;
};

// Example data until a result is supplied by the backend.
export const exampleResult: MobilityResult = {
  university: 'University of Toronto',
  choiceRank: 2,
  totalChoices: 5,
  score: 79.5,
  comparison: {
    university: 'ETH Zurich',
    places: 6,
    lastAcceptedScore: 84.2,
    note: 'Your English is also under its 7.0 minimum.',
  },
};
