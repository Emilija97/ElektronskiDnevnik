import { Action } from "@ngrx/store";
import { User } from "src/app/models/user";

export enum StudActionTypes {
  FETCH = "[User] Fetch",
  FETCH_SUCCESS = "[User] Fetch success",
  FETCH_FAILURE = "[User] Fetch failure"
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

export type Actions = Fetch | FetchSuccess | FetchFailure;
