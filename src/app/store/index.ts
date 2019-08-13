import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "./reducers/auth.reducer";

export const reducers: ActionReducerMap<any> = {
  auth: authReducer
};
