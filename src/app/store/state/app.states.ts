import { AuthState } from "../reducers/auth.reducer";

export interface AppState {
  readonly authState: AuthState;
}
