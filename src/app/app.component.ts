import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntryItemComponent } from './journal/entry-item.component';
import { ListEntriesComponent } from './journal/list-entries.component';
import { ExerciseSet, ExerciseSetList } from './interfaces/exercise-set';
import { NewItemButtonComponent } from './journal/new-item-button.component';
import { ExerciseSetsService } from './services/exercise-sets.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EntryItemComponent, ListEntriesComponent, NewItemButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-200">
        <header class="bg-blue-500 py-4 text-white">
            <div class="mx-auto max-w-6xl px-4">
                <h1 class="text-2xl font-bold">Sport Workout</h1>
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
  private exerciseSetsService = inject(ExerciseSetsService);
  exerciseList!: ExerciseSetList;

  ngOnInit(): void {
    this.exerciseSetsService
      .getInitialList()
      .subscribe((dataApi) => (this.exerciseList = dataApi.items));
  }

  newList() {
    this.exerciseSetsService
      .refreshList()
      .subscribe((dataApi) => (this.exerciseList = dataApi.items));
  }

  addExercise(newSet: ExerciseSet) {
    this.exerciseSetsService.addNewItem(newSet).subscribe((exerciseSet) => {
      this.exerciseList = [...this.exerciseList, exerciseSet];
    });
  }

  deleteItem(id: string) {
    this.exerciseSetsService.deleteItem(id).subscribe(() => {
      this.exerciseList = this.exerciseList.filter(
        (exerciseSet) => exerciseSet.id !== id
      );
    });
  }

  newRep(updateSet: ExerciseSet) {
    const id = updateSet.id ?? '';
    this.exerciseSetsService.updateItem(id, updateSet).subscribe();
  }
}
