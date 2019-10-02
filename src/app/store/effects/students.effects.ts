import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { StudentsService } from "src/app/services/students.service";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {
  FetchSuccess,
  FetchFailure,
  StudActionTypes,
  Remove,
  RemoveSuccess,
  RemoveFailure,
  FindBestSuccess,
  FindBestFailure
} from "../actions/students.actions";
import { SubjectService } from "src/app/services/subject.service";
import { Delete } from "../actions/subjects.actions";

@Injectable()
export class StudentsEffects {
  public id: number;
  constructor(
    private router: Router,
    private actions: Actions,
    private studService: StudentsService,
    private subService: SubjectService
  ) {}

  @Effect()
  Fetch: Observable<FetchSuccess | FetchFailure> = this.actions.pipe(
    ofType(StudActionTypes.FETCH),
    switchMap(() => {
      return this.studService.get().pipe(
        map(users => {
          if (users) {
            console.log(users);
            return new FetchSuccess(users);
          } else {
            return new FetchFailure("No users found in database.");
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  FetchSuccess: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.FETCH_SUCCESS)
  );

  @Effect({ dispatch: false })
  FetchFailure: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.FETCH_FAILURE)
  );

  @Effect()
  Remove: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.REMOVE),
    map((action: Remove) => action.payload),
    switchMap(payload => {
      this.id = payload;
      return this.studService.remove(payload).pipe(
        map(user => {
          if (user) {
            console.log("Uspesno brisanje user-a: " + this.id);
            return new RemoveSuccess(this.id);
          } else {
            return new RemoveFailure("No user found in database.");
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  RemoveSuccess: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.REMOVE_SUCCESS)
  );

  @Effect({ dispatch: false })
  RemoveFailure: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.REMOVE_FAILURE)
  );

  @Effect()
  FindBestStudents: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.FIND_BEST_STUDENTS),
    switchMap(() => {
      return this.studService.getBestStudents().pipe(
        map(students => {
          if (students) {
            console.log(students);
            return new FindBestSuccess(students);
          } else {
            return new FindBestFailure(
              "No students with that average grade found in database."
            );
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  FindBestSuccess: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.REMOVE_SUCCESS)
  );

  @Effect({ dispatch: false })
  FindBestFailure: Observable<any> = this.actions.pipe(
    ofType(StudActionTypes.REMOVE_FAILURE)
  );
}
