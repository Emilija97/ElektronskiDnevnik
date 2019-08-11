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

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
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

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: "Incorrect email and/or password."
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: "Incorrect email and/or password."
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
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
