import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { ExerciseSet } from '../interfaces/exercise-set';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-entry-item',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <div class="mb-4 flex items-center justify-between border-b bg-white p-4">
      <div>
        <span class="font-bold">Date:</span> {{ exerciseSet.date | date }}<br />
        <span class="font-bold">Exercise:</span> {{ exerciseSet.exercise }}<br />
        <span class="font-bold">Sets:</span> {{ exerciseSet.sets }}<br />
        <span class="font-bold">Reps:</span> {{ exerciseSet.reps }}
      </div>
      <div class="flex items-center">
        <button
          class="mr-2 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
          (click)="delete()"
        >
          Delete
        </button>
        <button
          class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          (click)="newRep()"
        >
          New Rep
        </button>
      </div>
    </div>
  `,
  styleUrl: './entry-item.component.css'
})
export class EntryItemComponent {
    @Input('exercise-set') exerciseSet!: ExerciseSet;
    @Output() newRepEvent = new EventEmitter<ExerciseSet>();
    @Output() deleteEvent = new EventEmitter<string>();

    delete() {
      this.deleteEvent.emit(this.exerciseSet.id);
    }

    newRep() {
      const reps = ++this.exerciseSet.reps;
      const newItem: ExerciseSet = {
        ...this.exerciseSet,
        reps,
      };
      this.newRepEvent.emit(newItem);
    }
}



