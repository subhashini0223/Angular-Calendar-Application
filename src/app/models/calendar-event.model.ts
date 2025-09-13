export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO string
  categoryId?: 'work' | 'personal' | 'others';
}
