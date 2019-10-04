import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "./reducers/auth.reducer";
import { studentsReducer } from "./reducers/students.reducer";
import { subjectReducer } from "./reducers/subjects.reducer";

export const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  students: studentsReducer,
  grades: subjectReducer
};
