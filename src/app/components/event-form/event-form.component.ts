import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CalendarEvent } from '../../models/calendar-event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  @Input() date!: Date; 
  @Input() event?: CalendarEvent;
  @Output() save = new EventEmitter<CalendarEvent>();
  @Output() delete = new EventEmitter<CalendarEvent>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  ngOnChanges() {
    this.form = new FormGroup({
      title: new FormControl(this.event?.title || '', Validators.required),
      categoryId: new FormControl(this.event?.categoryId || 'work')
    });
  }

  onSave() {
  if (this.form.valid) {
    this.save.emit({
      id: this.event?.id || '',
      date: this.date.toISOString().split('T')[0],
      ...this.form.value
    });
  }
}


  onDelete() {
    if (this.event) {
      const confirmed = confirm(`Are you sure you want to delete "${this.event.title}"?`);
    if (confirmed) {
    this.delete.emit(this.event);
    }
    }
  }
}
