import { AuthState } from "../reducers/auth.reducer";
import { StudentState } from "../reducers/students.reducer";

export interface AppState {
  readonly authState: AuthState;
  readonly studState: StudentState;
}
