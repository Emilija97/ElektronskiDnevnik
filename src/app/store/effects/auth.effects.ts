import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
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
  LogOut
} from "../actions/auth.actions";
import { User } from "src/app/models/user";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthEffects {
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
      return this.authService.login(payload.email, payload.password).pipe(
        map(response => {
          console.log(response);
          if (response == "Username or password incorrect.") {
            return new LogInFailure("Username or password incorrect.");
          } else return new LogInSuccess(response);
        }),
        catchError(error => of(new LogInFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigate(["/administrator"]);
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      localStorage.removeItem("token");
    })
  );
}
