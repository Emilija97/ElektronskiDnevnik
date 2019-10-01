import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of, Subscriber } from "rxjs";
import { switchMap, mergeMap, map, tap, catchError } from "rxjs/operators";

import { AuthService } from "../../services/auth.service";
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  LogOut,
  SignUpStudent,
  SignUpStudSuccess
} from "../actions/auth.actions";
import { User } from "src/app/models/user";
import { HttpClient } from "@angular/common/http";
import { Grades } from "src/app/models/grades";

@Injectable()
export class AuthEffects {
  public grades: Grades = new Grades();
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map(response => {
          console.log(response);
          if (response == "Username or password incorrect.") {
            return new LogInFailure("Username or password incorrect.");
          } else return new LogInSuccess(response);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.id);
      if (user.payload.role == "administrator") this.router.navigate(["/administrator"]);
      else this.router.navigate(["/student"]);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      localStorage.removeItem("token");
    })
  );

  @Effect()
  SignUpStudent: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUPSTUDENT),
    map((action: SignUpStudent) => action.payload),
    switchMap(payload => {
      console.log("Effects");
      console.log(payload.name);
      return this.authService.signUp(payload).pipe(
        map(user => {
          if (user != "Username already taken.") {
            this.grades.math = "";
            this.grades.biology = "";
            this.grades.englishLanguage = "";
            this.grades.serbianLanguage = "";
            this.grades.studentId = user.id;

            this.authService.addSubjectField(this.grades);
            return new SignUpStudSuccess({});
          } else {
            return new SignUpFailure("Username already taken.");
          }
        })
      );
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      console.log("Effects");
      console.log(payload.name);
      return this.authService.signUp(payload).pipe(
        map(user => {
          if (user != "Username already taken.") {
            console.log(user);
            return new SignUpSuccess({ user });
          } else {
            return new SignUpFailure(user);
          }
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap(action => {
      console.log(action);
      localStorage.setItem("token", action.payload.id);
      this.router.navigate(["/administrator"]);
    })
  );

  @Effect({ dispatch: false })
  SignUpStudSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUPSTUD_SUCCESS),
    tap(user => {
      this.router.navigateByUrl("/administrator");
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap(user => {
      alert("Email is already taken, try another.");
    })
  );
}
