import { AuthState } from "../reducers/auth.reducer";
import { StudentState } from "../reducers/students.reducer";
import { SubjectState } from "../reducers/subjects.reducer";

export interface AppState {
  readonly authState: AuthState;
  readonly studState: StudentState;
  readonly grades: SubjectState;
}
