export interface Activity {
  id: string;
  name: string;
  description?: string;
  days: Day[];
  counter: number;
  created: string;
  completed?: boolean;
}

export interface Day {
  id: number;
  name: string;
  enabled: boolean;
  time: string;
}
