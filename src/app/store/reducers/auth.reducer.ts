import { User } from "src/app/models/user";
import { AuthActionTypes, All } from "../actions/auth.actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

// export interface StoreState {
//   courses: UsersState;
// }

// export interface UsersState {
//   // isAuthenticated: boolean;
//   ids: number[];
//   entities: { [key: number]: User };
//   //  errorMessage: string | null;
// }

// const initialUsersState: UsersState = {
//   ids: [],
//   entities: {}
//   // isAuthenticated: false,
//   // errorMessage: null
// };

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

// //Entity adapter
// export const studentAdapter = createEntityAdapter<User>();
// export interface State extends EntityState<User> {}
// export const initialState: State = studentAdapter.getInitialState(
//   initialUsersState
// );

export function authReducer(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      console.log("Usao sam u reducer");
      return {
        ...state,
        errorMessage: "Incorrect email and/or password."
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUPSTUD_SUCCESS: {
      return state;
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: "That email is already in use."
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

// export const getUserState = createFeatureSelector<State>("user");

// export const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal
// } = studentAdapter.getSelectors(getUserState);
