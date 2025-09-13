import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private _events$ = new BehaviorSubject<CalendarEvent[]>([]);
  events$ = this._events$.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('calendar-events');
      if (data) this._events$.next(JSON.parse(data));
    }
  }

  private saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('calendar-events', JSON.stringify(this._events$.value));
    }
  }

  addEvent(ev: CalendarEvent) {
    const events = [...this._events$.value, { ...ev, id: this.generateId() }];
    this._events$.next(events);
    this.saveToStorage();
  }

  updateEvent(ev: CalendarEvent) {
    const events = this._events$.value.map(e => e.id === ev.id ? ev : e);
    this._events$.next(events);
    this.saveToStorage();
  }

  deleteEvent(id: string) {
    const events = this._events$.value.filter(e => e.id !== id);
    this._events$.next(events);
    this.saveToStorage();
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
