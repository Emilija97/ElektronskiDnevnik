import { Action } from "@ngrx/store";
import { User } from "src/app/models/user";

export enum StudActionTypes {
  FETCH = "[User] Fetch",
  FETCH_SUCCESS = "[User] Fetch success",
  FETCH_FAILURE = "[User] Fetch failure",
  REMOVE = "[User] Remove",
  REMOVE_SUCCESS = "[User] Remove success",
  REMOVE_FAILURE = "[User] Remove failure"
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

export type Actions =
  | Fetch
  | FetchSuccess
  | FetchFailure
  | Remove
  | RemoveSuccess
  | RemoveFailure;
