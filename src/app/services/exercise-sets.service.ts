import { Injectable } from '@angular/core';
import { ExerciseSet, ExerciseSetList } from '../interfaces/exercise-set';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSetsService {
  private setList?: ExerciseSetList;
  getInitialList(): ExerciseSetList {
    this.setList = [
    { id: "1", date: new Date(), exercise: 'Deadlift', reps: 15, sets: 3 },
    { id: "2", date: new Date(), exercise: 'Squat', reps: 15, sets: 3 },
    { id: "3", date: new Date(), exercise: 'Barbell row', reps: 15, sets: 3 },
    ];
    return this.setList;
  }
  refreshList(): ExerciseSetList {
    this.setList = [
    { id: "1", date: new Date(), exercise: 'Deadlift', reps: 15, sets: 3 },
    { id: "2", date: new Date(), exercise: 'Squat', reps: 15, sets: 3 },
    { id: "3", date: new Date(), exercise: 'Barbell row', reps: 15, sets: 3 },
    { id: "4", date: new Date(), exercise: 'Leg Press', reps: 15, sets: 3 },
    ];
    return this.setList;
  }
  constructor() { }

  addNewItem(item: ExerciseSet): ExerciseSetList {
    if (this.setList) {
    this.setList = [...this.setList, item];
    } else {
    this.setList = [item];
    }
    return this.setList;
  }
}
