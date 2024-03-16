import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntryItemComponent } from './journal/entry-item.component';
import { ListEntriesComponent } from './journal/list-entries.component';
import { ExerciseSetList, ExerciseSet } from './interfaces/exercise-set';
import { NewItemButtonComponent } from './journal/new-item-button.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EntryItemComponent, ListEntriesComponent, NewItemButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-200">
        <header class="bg-blue-500 py-4 text-white">
            <div class="mx-auto max-w-6xl px-4">
                <h1 class="text-2xl font-bold">Exercises de sport</h1>
            </div>
        </header>
        <main class="mx-auto mt-8 max-w-6xl px-4">
          <app-list-entries
            [exerciseList]="exerciseList"
            (deleteEvent)="deleteItem($event)"
            (newRepEvent)="newRep($event)"
          />
          <app-new-item-button (newExerciseEvent)="addExercise($event)" />
          <br />
          <br />
          <button
            class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            (click)="newList()"
          >
            Server Sync
          </button>
        </main>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sport-journal';
  exerciseList: ExerciseSetList = [
    { id: '1', date: new Date(), exercise: 'Deadlift', reps: 15, sets: 3 },
    { id: '2', date: new Date(), exercise: 'Squat', reps: 15, sets: 3 },
    { id: '3', date: new Date(), exercise: 'Barbell row', reps: 15, sets: 3 },
    ];
  newList() {
    this.exerciseList = [
    { id: '1', date: new Date(), exercise: 'Deadlift', reps: 15, sets: 3 },
    { id: '2', date: new Date(), exercise: 'Squat', reps: 15, sets: 3 },
    { id: '3', date: new Date(), exercise: 'Barbell row', reps: 15, sets: 3 },
    { id: '4', date: new Date(), exercise: 'Leg Press', reps: 15, sets: 3 },
    ];
  }

  addExercise(newSet: ExerciseSet) {
    this.exerciseList.push(newSet);
  }

  deleteItem(id: string) {
    this.exerciseList = this.exerciseList.filter((item) => item.id !== id);
  }

  newRep(exerciseSet: ExerciseSet) {
    const id = exerciseSet.id;
    const i = this.exerciseList.findIndex((item) => item.id === id);
    if (i >= 0) {
      this.exerciseList[i] = { ...exerciseSet };
    }
  }
}
