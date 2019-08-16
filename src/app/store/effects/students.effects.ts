import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { StudentsService } from "src/app/services/students.service";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {
  FetchSuccess,
  FetchFailure,
  StudActionTypes
} from "../actions/students.actions";

@Injectable()
export class StudentsEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private studService: StudentsService
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
}
