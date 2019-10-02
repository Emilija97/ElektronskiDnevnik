import { Action } from "@ngrx/store";

export enum SubjectActionTypes {
  FETCH_SUBJECTS = "[Subject] Fetch subjects",
  FETCH_SUBJECT = "[Subject] Fetch subject",
  FETCH_SUBJECTS_SUCCESS = "[Subject] Fetch subjects success",
  FETCH_SUBJECTS_FAILURE = "[Subject] Fetch subjects failure",
  DELETE = "[Subject] Delete",
  DELETE_SUCCESS = "[Subject] Delete success",
  DELETE_FAILURE = "[Subject] Delete failure",
  DeleteSuccess = "DeleteSuccess"
}

export class FetchSubjects implements Action {
  readonly type = SubjectActionTypes.FETCH_SUBJECTS;
  constructor(public payload: any) {}
}

export class FetchSubject implements Action {
  readonly type = SubjectActionTypes.FETCH_SUBJECT;
  constructor(public payload: any) {}
}

export class FetchSubjectsSuccess implements Action {
  readonly type = SubjectActionTypes.FETCH_SUBJECTS_SUCCESS;
  constructor(public payload: any) {}
}

export class FetchSubjectsFailure implements Action {
  readonly type = SubjectActionTypes.FETCH_SUBJECTS_FAILURE;
  constructor(public payload: any) {}
}

export class Delete implements Action {
  readonly type = SubjectActionTypes.DELETE;

  constructor(public payload: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = SubjectActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteFailure implements Action {
  readonly type = SubjectActionTypes.DELETE_FAILURE;

  constructor(public payload: string) {}
}

export type All =
  | FetchSubject
  | FetchSubjects
  | FetchSubjectsSuccess
  | FetchSubjectsFailure
  | Delete
  | DeleteSuccess
  | DeleteFailure;
