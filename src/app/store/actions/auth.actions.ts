import { Action } from "@ngrx/store";
import { User } from "src/app/models/user";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  SIGNUP = "[Auth] Signup",
  SIGNUPSTUDENT = "[Auth] SignupStudent",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  SIGNUPSTUD_SUCCESS = "[Auth] SignupStud Success",
  SIGNUP_FAILURE = "[Auth] Signup Failure",
  LOGOUT = "[Auth] Logout",
  GET_STATUS = "[Auth] Get Status",
  CHECK_USER = "[AUTH] Check user",
  CHECK_USER_SUCCESS = "[AUTH] Check user success",
  CHECK_USER_FAILURE = "[AUTH] Check user failure",
  SHOW_INVALID = "[AUTH] Show invalid",
  RESET_ERROR_MESSAGE = "[AUTH] Reset error message"
}

export class CheckUser implements Action {
  readonly type = AuthActionTypes.CHECK_USER;

  constructor(public payload: string) {}
}

export class CheckUserSuccess implements Action {
  readonly type = AuthActionTypes.CHECK_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class CheckUserFailure implements Action {
  readonly type = AuthActionTypes.CHECK_USER_FAILURE;

  constructor(public payload: string) {}
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}
export class SignUpStudent implements Action {
  readonly type = AuthActionTypes.SIGNUPSTUDENT;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpStudSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUPSTUD_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export class ShowInvalid implements Action {
  readonly type = AuthActionTypes.SHOW_INVALID;
}

export class ResetErrorMessage implements Action {
  readonly type = AuthActionTypes.RESET_ERROR_MESSAGE;
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpStudent
  | SignUpSuccess
  | SignUpStudSuccess
  | SignUpFailure
  | LogOut
  | GetStatus
  | CheckUser
  | CheckUserSuccess
  | CheckUserFailure
  | ShowInvalid
  | ResetErrorMessage;
