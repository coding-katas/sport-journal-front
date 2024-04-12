import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { JournalComponent } from './journal.component';
import { ExerciseSetsService } from '../services/exercise-sets.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { NewEntryFormReactiveComponent } from './new-entry-form-reactive.component';

describe('DiaryComponent', () => {
  let component: JournalComponent;
  let fixture: ComponentFixture<JournalComponent>;
  let exerciseSetsService: ExerciseSetsService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'new-reactive',
            component: NewEntryFormReactiveComponent,
          },
        ]),
      ],
      providers: [
        ExerciseSetsService,
        {
          provide: ExerciseSetsService,
          useValue: jasmine.createSpyObj('ExerciseSetsService', ['deleteItem']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JournalComponent);
    exerciseSetsService = TestBed.inject(ExerciseSetsService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call delete method when the button delete is clicked', fakeAsync(() => {
    exerciseSetsService.deleteItem = jasmine.createSpy().and.returnValue(of());

    component.deleteItem('1');

    tick();

    expect(exerciseSetsService.deleteItem).toHaveBeenCalledOnceWith('1');
  }));

});
