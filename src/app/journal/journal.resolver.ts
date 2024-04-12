import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ExerciseSetList } from '../interfaces/exercise-set';
import { ExerciseSetsService } from '../services/exercise-sets.service';

export const journalResolver: ResolveFn<ExerciseSetList> = (route, state) => {
  const exerciseSetsService = inject(ExerciseSetsService);
  return exerciseSetsService.getInitialList();
};

