import { Component, Renderer2, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CalendarEvent } from '../../models/calendar-event.model';
import { EventService } from '../../services/event.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MapGetPipe } from './map-get.pipe';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EventFormComponent, DragDropModule, MapGetPipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit  {
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  allDropLists: string[] = [];
  currentMonth = new Date();
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: (Date | null)[][] = [];

  showForm = false;
  selectedDateIso: Date = new Date();
  editingEvent?: CalendarEvent;
  isDragging = false;
  suppressClick = false;

  searchControl = new FormControl('');
  eventsByDate$ = new BehaviorSubject<Map<string, CalendarEvent[]>>(new Map());

  isDarkMode = false; // ✅ Dark mode flag

  constructor(public evService: EventService, private renderer: Renderer2) {
    this.generateCalendar();

    // Proper search + filter
    combineLatest([
      this.evService.events$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ])
      .pipe(
        map(([events, search]) => {
          const s = (search || '').toLowerCase();
          const map = new Map<string, CalendarEvent[]>();
          events
            .filter(e =>
              !s ||
              e.title.toLowerCase().includes(s) ||
              (e.categoryId || '').toLowerCase().includes(s)
            )
            .forEach(e => {
              const key = e.date;
              if (!map.has(key)) map.set(key, []);
              map.get(key)!.push(e);
            });
          return map;
        })
      )
      .subscribe(this.eventsByDate$);
  }
 ngAfterViewInit() {
    // Collect all dropList ids after view init
    this.allDropLists = this.dropLists.map(dl => dl.id);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  // ---------------- Calendar logic unchanged ----------------
  generateCalendar() {
    const start = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const end = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const dates: Date[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }

    this.weeks = [];
    let week: (Date | null)[] = new Array(start.getDay()).fill(null);
    dates.forEach(d => {
      week.push(d);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    });
    if (week.length) {
      while (week.length < 7) week.push(null);
      this.weeks.push(week);
    }
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }
  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }
  goToMonthYear(month: number | string, year: number | string) {
    this.currentMonth = new Date(+year, +month, 1);
    this.generateCalendar();
  }

  // ---------------- CRUD logic unchanged ----------------
  openCreate(date: Date) {
    this.selectedDateIso = new Date(date);
    this.editingEvent = undefined;
    this.showForm = true;
  }
  onDayClick(day: Date | null) {
    if (!day) return;
    this.openCreate(day);
  }

  onDragStarted() { this.isDragging = true; }
  onDragEnded() {
    this.isDragging = false;
    this.suppressClick = true;
    setTimeout(() => (this.suppressClick = false), 0);
  }

  onEventClick(e: CalendarEvent, event: MouseEvent) {
    if (this.suppressClick) {
      event.stopPropagation();
      return;
    }
    this.openEdit(e);
    event.stopPropagation();
  }
isToday(day: Date): boolean {
  if (!day) return false;
  const today = new Date();
  return day.getFullYear() === today.getFullYear() &&
         day.getMonth() === today.getMonth() &&
         day.getDate() === today.getDate();
}

  openEdit(ev: CalendarEvent) {
    this.editingEvent = ev;
    this.selectedDateIso = new Date(ev.date);
    this.showForm = true;
  }
  onSave(ev: CalendarEvent) {
    if (ev.id) this.evService.updateEvent(ev);
    else this.evService.addEvent(ev);
    this.showForm = false;
  }
  onDelete(ev: CalendarEvent) {
    const confirmed = confirm(`Are you sure you want to delete "${ev.title}"?`);
    if (confirmed && ev?.id) {
      this.evService.deleteEvent(ev.id);
    }
    this.showForm = false;
    this.editingEvent = undefined;
  }

  getDateKey(date: Date | null) {
    return date ? date.toISOString().split('T')[0] : '';
  }

  getCategoryColor(categoryId?: string) {
    switch (categoryId) {
      case 'work': return '#007bff';
      case 'personal': return '#28a745';
      case 'others': return '#ffc107';
      default: return '#6c757d';
    }
  }

  drop(event: CdkDragDrop<CalendarEvent[]>, date: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const moved = event.previousContainer.data[event.previousIndex];
      moved.date = date;
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.evService.updateEvent(moved);
    }
  }
}
