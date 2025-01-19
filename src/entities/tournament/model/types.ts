export interface Tournament {
  id: string;
  title: string;
  gameTitle: string;
  imageUrl: string;
  date: string;
  time: string;
  maxParticipants: number;
  currentParticipants: number;
  entryFee: number;
  prizePool: number;
  description: string;
  location: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}
