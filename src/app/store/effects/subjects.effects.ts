import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of, Subscriber } from "rxjs";
import { switchMap, mergeMap, map, tap, catchError } from "rxjs/operators";

import {} from "../../services/auth.service";
import {
  FetchSubjects,
  SubjectActionTypes,
  FetchSubjectsSuccess,
  FetchSubjectsFailure
} from "../actions/subjects.actions";
import { User } from "src/app/models/user";
import { HttpClient } from "@angular/common/http";
import { Grades } from "src/app/models/grades";
import { SubjectService } from "src/app/services/subject.service";

@Injectable()
export class AuthEffects {
  public grades: Grades = new Grades();
  constructor(
    private actions: Actions,
    private subService: SubjectService,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect()
  FetchSubjects: Observable<any> = this.actions.pipe(
    ofType(SubjectActionTypes.FETCH_SUBJECTS),
    map((action: FetchSubjects) => action.payload),
    switchMap(payload => {
      return this.subService.fetchSubjects(payload.id).pipe(
        map(response => {
          console.log(response);
          if (response == "There isn't in the base table with grades.") {
            return new FetchSubjectsFailure(
              "There isn't in the base table with grades."
            );
          } else return new FetchSubjectsSuccess(response);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  FetchSubjectsSuccess: Observable<any> = this.actions.pipe(
    ofType(SubjectActionTypes.FETCH_SUBJECTS_SUCCESS),
    tap(grades => {
      this.router.navigateByUrl("/editing");
    })
  );

  @Effect({ dispatch: false })
  FetchSubjectsFailure: Observable<any> = this.actions.pipe(
    ofType(SubjectActionTypes.FETCH_SUBJECTS_FAILURE)
  );
}