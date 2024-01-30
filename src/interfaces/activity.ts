export interface NewActivity {
  name: string;
  description?: string;
  days: Day[];
}

export interface Day {
  id: number;
  name: string;
  enabled: boolean;
  time: string;
}
