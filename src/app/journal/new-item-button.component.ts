import { Component, Output, EventEmitter } from '@angular/core';
import { ExerciseSet } from '../interfaces/exercise-set';

@Component({
  selector: 'app-new-item-button',
  standalone: true,
  imports: [],
  template: `
    <button
       class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
       (click)="addNewExercise()">
       Add new entry
    </button>
  `,
  styleUrl: './new-item-button.component.css'
})
export class NewItemButtonComponent {
  @Output() newExerciseEvent = new EventEmitter<ExerciseSet>();
  addNewExercise() {
    const id = Date.now().toString();
    const date = new Date();
    const reps = 10;
    const sets = 4;
    const exercise = 'Leg Press';
    const newExerciseSet: ExerciseSet = { id, date, reps, sets, exercise };
    this.newExerciseEvent.emit(newExerciseSet);
  }

}

