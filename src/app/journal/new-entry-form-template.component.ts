import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ExerciseSet } from '../interfaces/exercise-set';
import { ExerciseSetsService } from '../services/exercise-sets.service';


@Component({
  selector: 'app-new-entry-form-template',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  template: `
<div class="flex h-screen items-center justify-center bg-gray-200">
  <form
    (ngSubmit)="newEntry()"
    class="mx-auto max-w-sm rounded bg-gray-200 p-4"
  >
    <div class="mb-4">
      <label for="date" class="mb-2 block font-bold text-gray-700">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        [(ngModel)]="entry.date"
      />
    </div>
    <div class="mb-4">
      <label for="exercise" class="mb-2 block font-bold text-gray-700"
        >Exercise:</label
      >
      <input
        type="text"
        id="exercise"
        name="exercise"
        class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        [(ngModel)]="entry.exercise"
      />
    </div>
    <div class="mb-4">
      <label for="sets" class="mb-2 block font-bold text-gray-700">Sets:</label>
      <input
        type="number"
        id="sets"
        name="sets"
        class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        [(ngModel)]="entry.sets"
      />
    </div>
    <div class="mb-4">
      <label for="reps" class="mb-2 block font-bold text-gray-700">Reps:</label>
      <input
        type="number"
        id="reps"
        name="reps"
        class="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow"
        [(ngModel)]="entry.reps"
      />
    </div>
    <div class="flex items-center justify-center">
      <button
        type="submit"
        class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Add Entry
      </button>
    </div>
  </form>
</div>
{{ entry | json }}

  `,
  styleUrl: './new-entry-form-template.component.css'
})
export class NewEntryFormTemplateComponent {
  private exerciseSetsService = inject(ExerciseSetsService);
  private router = inject(Router);

  entry: ExerciseSet = { date: new Date(), exercise: '', reps: 0, sets: 0 };

  newEntry() {
    const newEntry = { ...this.entry };
    this.exerciseSetsService
      .addNewItem(newEntry)
      .subscribe((entry) => this.router.navigate(['/home']));
  }

}




