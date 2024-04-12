import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntryItemComponent } from './entry-item.component';
import { ListEntriesComponent } from './list-entries.component';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';
import { NewItemButtonComponent } from './new-item-button.component';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, EntryItemComponent, ListEntriesComponent, NewItemButtonComponent],
  template: `
    <div class="min-h-screen bg-gray-200">
        <header class="bg-blue-500 py-4 text-white">
            <div class="mx-auto max-w-6xl px-4">
              <h1 class="text-2xl font-bold">sport workout</h1>
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

          <br />
          <br />
          <button
            class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            (click)="logout()"
            data-cy="logout-menu"
          >
            Logout
          </button>

          <button
            class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            (click)="changeLanguage('en')"
          >
            English
          </button>
          <button
            class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            (click)="changeLanguage('fr')"
          >
            Français
          </button>

        </main>
    </div>


  `,
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {
  title = 'sport-journal';
  private exerciseSetsService = inject(ExerciseSetsService);
  exerciseList!: ExerciseSetList;

  private router = inject(Router);

//   private translateService = inject(TranslateService);

  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }


  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.exerciseSetsService
      .getInitialList()
      .subscribe((exerciseList) => (this.exerciseList = exerciseList));

    this.route.data.subscribe(({ exerciseList }) => {
        this.exerciseList = exerciseList;
      });
  }

  newList() {
    this.exerciseSetsService
    .refreshList()
    .subscribe((exerciseList) => (this.exerciseList = exerciseList));
    /*this.exerciseSetsService
      .refreshList()
      .subscribe((dataApi) => (this.exerciseList = dataApi.items));*/
  }

  addExercise(newSet: ExerciseSet) {
    this.router.navigate(['new-reactive'])
    /*this.exerciseSetsService.addNewItem(newSet).subscribe((exerciseSet) => {
      this.exerciseList = [...this.exerciseList, exerciseSet];
    });*/
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

  changeLanguage(language: string) {
//   this.translateService.use(language);
  }
}
