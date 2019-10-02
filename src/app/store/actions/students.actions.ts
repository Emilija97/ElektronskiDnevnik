import { Action } from "@ngrx/store";
import { User } from "src/app/models/user";

export enum StudActionTypes {
  FETCH = "[User] Fetch",
  FETCH_SUCCESS = "[User] Fetch success",
  FETCH_FAILURE = "[User] Fetch failure",
  REMOVE = "[User] Remove",
  REMOVE_SUCCESS = "[User] Remove success",
  REMOVE_FAILURE = "[User] Remove failure",
  FIND_BEST_STUDENTS = "[User] Find best students",
  FIND_BEST_SUCCESS = "[User] Find best success",
  FIND_BEST_FAILURE = "[User] Find best failure"
}
export class Fetch implements Action {
  readonly type = StudActionTypes.FETCH;
}

export class FetchSuccess implements Action {
  readonly type = StudActionTypes.FETCH_SUCCESS;

  constructor(public payload: User[]) {}
}

export class FetchFailure implements Action {
  readonly type = StudActionTypes.FETCH_FAILURE;

  constructor(public payload: string) {}
}

export class Remove implements Action {
  readonly type = StudActionTypes.REMOVE;

  constructor(public payload: number) {}
}

export class RemoveSuccess implements Action {
  readonly type = StudActionTypes.REMOVE_SUCCESS;

  constructor(public payload: number) {}
}

export class RemoveFailure implements Action {
  readonly type = StudActionTypes.REMOVE_FAILURE;

  constructor(public payload: string) {}
}
export class FindBestStudents implements Action {
  readonly type = StudActionTypes.FIND_BEST_STUDENTS;
}
export class FindBestSuccess implements Action {
  readonly type = StudActionTypes.FIND_BEST_SUCCESS;

  constructor(public payload: any) {}
}
export class FindBestFailure implements Action {
  readonly type = StudActionTypes.FIND_BEST_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =
  | Fetch
  | FetchSuccess
  | FetchFailure
  | Remove
  | RemoveSuccess
  | RemoveFailure
  | FindBestStudents
  | FindBestSuccess
  | FindBestFailure;
