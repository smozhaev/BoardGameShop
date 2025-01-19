export interface Tournament {
  id: string;
  title: string;
  date: string;
  game: string;
  place?: string;
  status: 'upcoming' | 'finished';
  result?: string;
}

export interface Profile {
  id: string;
  name: string;
  points: number;
  tournaments: Tournament[];
}
