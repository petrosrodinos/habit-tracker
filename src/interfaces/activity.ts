export interface Activity {
  id: string;
  name: string;
  description?: string;
  days: Day[];
  counter: number;
  created: string;
}

export interface Day {
  id: number;
  name: string;
  enabled: boolean;
  time: string;
}
